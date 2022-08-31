#!/bin/bash

set -e

npm run start &
cd syncServer && pm2 start ecosystem.config.js && node app.js
