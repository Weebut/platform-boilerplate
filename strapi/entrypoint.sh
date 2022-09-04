#!/bin/bash

set -e

<<<<<<< HEAD
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
=======
npm run start &
cd syncServer && pm2 start ecosystem.config.js && node app.js
>>>>>>> 54ebda8a7d2ee9bd03ecc5ebcde16994e2612d7e
