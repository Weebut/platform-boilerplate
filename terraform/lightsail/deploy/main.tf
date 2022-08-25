terraform {
  backend "s3" {
    bucket               = "init-tf-state-bucket"
    workspace_key_prefix = "environments"
    region               = "ap-northeast-2"
    encrypt              = true
    dynamodb_table       = "terraform-lock"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.27.0"
    }
  }
}

provider "aws" {
  region  = var.region
}

locals {
  name = "init-${var.environment}-lightsail"
  tags = {
    Name        = "init-lightsail"
    Environment = var.environment
  }
}

data "terraform_remote_state" "lightsail" {
  backend = "s3"
  config = {
    bucket               = "init-tf-state-bucket"
    key                  = "environments/${var.environment}/lightsail"
    region = "ap-northeast-2"
  }
}

resource "aws_lightsail_container_service_deployment_version" "deployments" {
  for_each = { for container_deployment in var.container_deployments : container_deployment.name => container_deployment }

  dynamic "container" {
    for_each = each.value.containers
    content {
      container_name = container.value.name
      image = container.value.image
      command = container.value.command
      environment = merge(container.value.environment,{DATABASE_HOST=data.terraform_remote_state.lightsail.outputs.db_host})
      ports = container.value.ports
    }
  }

  dynamic "public_endpoint" {
    # TRUE is_public flag item should be unique
    for_each = toset([ for container in each.value.containers: container if container.is_public])
    content {
      container_name = public_endpoint.value.name
      container_port = public_endpoint.value.endpoint_port
      health_check {
        healthy_threshold   = public_endpoint.value.health_check.healthy_threshold
        unhealthy_threshold = public_endpoint.value.health_check.unhealthy_threshold
        timeout_seconds     = public_endpoint.value.health_check.timeout_seconds
        interval_seconds    = public_endpoint.value.health_check.interval_seconds
        path                = public_endpoint.value.health_check.path
        success_codes       = public_endpoint.value.health_check.success_codes
      }
    }
  }
  service_name = data.terraform_remote_state.lightsail.outputs.services[each.value.name].name
}
