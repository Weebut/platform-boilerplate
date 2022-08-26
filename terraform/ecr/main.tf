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

resource "aws_ecr_repository" "server" {
  name                 = "server"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = local.tags
}

resource "aws_ecr_repository" "server_nginx" {
  name                 = "server-nginx"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = local.tags
}

resource "aws_ecr_repository" "client_nginx" {
  name                 = "client-nginx"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = local.tags
}

resource "aws_ecr_repository" "client" {
  name                 = "client"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = local.tags
}
