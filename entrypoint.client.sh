#!/bin/bash

npm run build && mkdir -p /app/html && cp -rf /app/build/* /app/html &
npm run start:prod

