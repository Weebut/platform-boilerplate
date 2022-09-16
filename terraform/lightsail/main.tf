terraform {
  backend "s3" {
    bucket               = "init-tf-state-bucket"
    workspace_key_prefix = "environments"
    key                  = "lightsail"
    region               = "ap-northeast-2"
    encrypt              = true
    dynamodb_table       = "terraform-lock"
    profile              = "init-infra"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.27.0"
    }
    awslightsail = {
      source = "deyoungtech/awslightsail"
    }
  }
}

provider "aws" {
  region  = var.region
  profile = var.profile
}

provider "awslightsail" {
  region  = var.region
}

provider "awslightsail" {
  alias = "global"
  region = "us-east-1"
}

locals {
  name = "init-${var.environment}-lightsail"
  tags = {
    Name        = "init-lightsail"
    Environment = var.environment
  }
}

# create a new Lightsail container service
resource "awslightsail_container_service" "services" {
  for_each = { for service in var.container_services : service.name => service }
  name        = "${local.name}-${each.value.name}"
  power       = each.value.power
  scale       = each.value.scale
  is_disabled = false
  tags = local.tags
}

resource "awslightsail_certificate" "cert" {
  provider = awslightsail.global
  for_each = { for service in var.container_services : service.name => service }
  name        = each.value.certificate_name
  domain_name = each.value.domain_name
  subject_alternative_names = each.value.alt_names
}

data "aws_route53_zone" "main" {
  name         = var.root_domain
}

resource "aws_route53_record" "target" {
  for_each = {for domain_map in flatten([for service in var.container_services: [for domain in service.domain_names: {domain= domain, service=service}]]) : domain_map.domain => domain_map.service}
  zone_id = data.aws_route53_zone.main.zone_id
  name    = trim(replace(each.key,var.root_domain,""),".")
  type    = "A"
  alias {
    name                   = trim(awslightsail_container_service.services[each.value.name].url,"https://")
    zone_id                = var.lightsail_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = {for validation in flatten([for cert in awslightsail_certificate.cert: cert.domain_validation_options]) : validation.domain_name => validation}
  zone_id = data.aws_route53_zone.main.zone_id
  name    = replace(each.value.resource_record_name,".${var.root_domain}","")
  type    = each.value.resource_record_type
  ttl     = 300
  records = [each.value.resource_record_value]
}

resource "awslightsail_container_public_domain_names" "domains" {
  provider = awslightsail.global
  for_each = { for service in var.container_services : service.name => service }
  container_service_name = "${local.name}-${each.key}"
  public_domain_names {
    certificate {
      certificate_name = each.value.certificate_name
      domain_names = each.value.domain_names
    }
  }
  depends_on = [
    aws_route53_record.cert_validation,
    awslightsail_certificate.cert,
    awslightsail_container_service.services
  ]
}

resource "aws_lightsail_database" "db" {
  availability_zone    = var.database_config.azs
  master_database_name = var.database_config.name
  relational_database_name = var.database_config.rdb_name
  master_password      = var.database_config.password
  master_username      = var.database_config.username
  blueprint_id         = "${var.database_config.type}_${join("_",split(".",var.database_config.version))}"
  bundle_id            = var.database_config.bundle_id
  skip_final_snapshot  = true
  tags = local.tags
}
