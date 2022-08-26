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

variable "container_deployments" {
  type    = list(object({
    name = string
    containers = set(object({
      name = string
      image = string
      command = list(string)
      environment = map(string)
      ports = map(string)
      endpoint_port = number
      health_check = object({
        healthy_threshold = number
        unhealthy_threshold = number
        timeout_seconds = number
        interval_seconds = number
        path = string
        success_codes = string
      })
      is_public = bool
    }))
  }))
}
