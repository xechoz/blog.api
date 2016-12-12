#!/bin/sh

# NODE_ENV='development' 
NODE_ENV='production' APP_VERSION='1.0.0' forever start $(pwd)/bin/www


