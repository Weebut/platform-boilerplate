terraform {
  backend "s3" {
    bucket               = "init-tf-state-bucket"
    workspace_key_prefix = "environments"
    key                  = "s3"
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
  name = "init-${var.environment}-s3"
  tags = {
    Name        = "init-s3"
    Environment = var.environment
  }
}

resource "aws_s3_bucket" "b" {
  bucket = "${var.environment}-init-strapi-bucket"

  tags = local.tags
}

resource "aws_s3_bucket_acl" "b" {
  bucket = aws_s3_bucket.b.id
  acl    = "private"
}
<<<<<<< HEAD

resource "aws_s3_bucket" "c" {
  bucket = "${var.environment}-init-strapi-upload-bucket"

  tags = local.tags
}

resource "aws_s3_bucket_acl" "c" {
  bucket = aws_s3_bucket.c.id
  acl    = "private"
}
=======
>>>>>>> 54ebda8a7d2ee9bd03ecc5ebcde16994e2612d7e
