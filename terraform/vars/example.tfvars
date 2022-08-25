environment = "dev"

region = "ap-northeast-2"
profile = "init-infra"

root_domain="commit-today.com"

database_config = {
  password =
  username = "admin"
  name =
  rdb_name =
  bundle_id = "micro_1_0"
  version = "8.0"
  type = "mysql"
  azs = "ap-northeast-2a"
}

container_services = [
  {
    name = "server"
    certificate_name =
    scale = 1
    power = "nano"
    domain_names = []
  }
]

container_deployments = [
  {
    name = "server"
    containers = [{
      name = "app"
      image =
      command = []
      environment = {
        MYSQL_DATABASE =
        MYSQL_PASSWORD =
        MYSQL_USER =
        DATABASE_SYNC = "true"
        DATABASE_MIGRATION = "1"
        REDIS_HOST = "localhost"
        API_PORT = 4000
      }
      ports = {
        "4000" = "HTTP"
      }
      endpoint_port = -1
      health_check = {
        healthy_threshold = -1
        unhealthy_threshold = -1
        timeout_seconds = -1
        interval_seconds = -1
        path  = "/health"
        success_codes = "200"
      }
      is_public = false
    },
    {
      name = "nginx"
      image =
      command = []
      environment = {
        API_HOST = "localhost"
        API_DOMAIN =
      }
      ports = {
        "80" = "HTTP"
      }
      endpoint_port = 80
      health_check = {
        healthy_threshold = 2
        unhealthy_threshold = 5
        timeout_seconds = 10
        interval_seconds = 15
        path  = "/health"
        success_codes = "200"
      }
      is_public = true
    },
    {
      name = "redis"
      image = "redis:7.0.4"
      command = []
      environment = {}
      ports = {
        "6379" = "TCP"
      }
      endpoint_port = -1
      health_check = {
        healthy_threshold = -1
        unhealthy_threshold = -1
        timeout_seconds = -1
        interval_seconds = -1
        path  = "/health"
        success_codes = "200"
      }
      is_public = false
    }]
  }
]
