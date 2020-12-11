#!/bin/sh

# cp /var/app/current/env/.env.local /var/app/current/.env.local
#npm run start:dev
npm run build
npm run start:prod
while true; do sleep infinity ; done
