#!/bin/bash

set -e

npm run start &
cd syncServer && pm2 start ecosystem.config.js && pm2 startup systemd && pm2 save
