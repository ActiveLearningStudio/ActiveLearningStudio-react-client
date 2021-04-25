#!/bin/bash

npm run build && mkdir -p /app/html && cp -rf /app/build/* /app/html &
npm run start:prod

# if [ ! -e /app/buildhasrun ]
#     npm run build && mkdir -p /app/html && cp -rf /app/build/* /app/html &
#     touch /app/buildhasrun
# fi

# npm run start:prod