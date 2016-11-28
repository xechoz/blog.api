#!/bin/sh

# NODE_ENV='development' 
NODE_ENV='production' 
APP_VERSION='1.0.0' 
pm2 start $(pwd)/bin/www


