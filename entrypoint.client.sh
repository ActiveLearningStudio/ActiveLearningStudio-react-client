#!/bin/bash

# npm run build && mkdir -p /app/html && cp -rf /app/build/* /app/html &
# npm run start:prod

if [ ! -e /app/health.ok ]; then touch /app/health.ok && npm run build && mkdir -p /app/html && cp -rf /app/build/* /app/html; fi

npm run start:prod
