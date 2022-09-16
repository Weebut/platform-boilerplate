# nestjs-boilerplate/terraform

Author: Jaemin Kim

<br/>

## Prerequisites

- Terraform CLI
- AWS CLI

<br/>

## Quick Start

```bash
# setup
/path/to/nestjs-boilerplate/terraform % aws configure --profile init-infra

# infrastructure setup (dev environment)
## initialization
/path/to/nestjs-boilerplate/terraform % terraform init
/path/to/nestjs-boilerplate/terraform % terraform workspace new dev
/path/to/nestjs-boilerplate/terraform % terraform workspace select dev
/path/to/nestjs-boilerplate/terraform % terraform plan -var-file="./vars/dev.tfvars"
/path/to/nestjs-boilerplate/terraform % terraform apply -var-file="./vars/dev.tfvars"

## Each components setup
/path/to/nestjs-boilerplate/terraform/lightsail % terraform init
/path/to/nestjs-boilerplate/terraform/lightsail % terraform workspace new dev
/path/to/nestjs-boilerplate/terraform/lightsail % terraform workspace select dev
/path/to/nestjs-boilerplate/terraform/lightsail % AWS_PROFILE=init-infra terraform apply -var-file="../vars/dev.tfvars" -target="awslightsail_certificate.cert"
/path/to/nestjs-boilerplate/terraform/lightsail % AWS_PROFILE=init-infra terraform apply -var-file="../vars/dev.tfvars"

```

각 terraform module 별 배포 순서는 ecr -> lightsail (외부 API를 사용해 리소스를 만드는 것이므로 여러번 시도해야함, certificate 설정을 기다리지 않음) -> (직접 lightsail 콘솔에서 이미지 설정, DB에 strapi database 설정) -> lightsail/deploy 이다
