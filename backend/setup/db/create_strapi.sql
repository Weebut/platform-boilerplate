create database strapi;
create user 'strapi_admin'@'%' identified by 'strapi_admin';
grant all privileges on strapi.* to 'strapi_admin'@'%';
flush privileges;
