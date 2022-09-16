variable "profile" {
  type    = string
  default = "init-infra"
}

variable "environment" {
  type    = string
  default = "dev"
}

variable "region" {
  type    = string
  default = "ap-northeast-2"
}

variable "repos" {
  type    = list(string)
  default = []
}
