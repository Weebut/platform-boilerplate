#!/bin/bash

set -e

pm2 start ecosystem.config.js
until [ "$(curl -X HEAD -o /dev/null -s -w "%{http_code}\n" http://localhost:1338/_health)" = 204 ]; do
	echo "Waiting for strapi server to start..."
	sleep 1
done

cd syncServer && node app.js &
until [ "$(curl -o /dev/null -s -w "%{http_code}\n" http://localhost:1339/health)" = 200 ]; do
	echo "Waiting for sync server to start..."
	sleep 1
done

pm2 logs
