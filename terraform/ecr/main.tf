terraform {
  backend "s3" {
    bucket               = "init-tf-state-bucket"
    workspace_key_prefix = "environments"
    key                  = "ecr"
    region               = "ap-northeast-2"
    encrypt              = true
    dynamodb_table       = "terraform-lock"
    profile              = "init-infra"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region  = var.region
  profile = var.profile
}

locals {
  name = "init-${var.environment}-ecr"
  tags = {
    Name        = "init-ecr"
    Environment = var.environment
  }
}

resource "aws_ecr_repository" "repos" {
  for_each = { for repo in var.repos : repo => {repo=repo} }
  name                 = each.key
  image_tag_mutability = "MUTABLE"
  force_delete = true

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = local.tags
}
