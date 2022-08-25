#!/bin/bash
set -e

if [ "$DATABASE_MIGRATION" -eq "1" ]; then
	echo "migration start!"
	npm run migration
fi
node dist/main.js
