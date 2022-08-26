output "db_host" {
  value = aws_lightsail_database.db.master_endpoint_address
}

output "services" {
  value = awslightsail_container_service.services
}
