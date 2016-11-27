#!/bin/sh

MY_DIR=`pwd`
echo $MY_DIR
forever start -a -l $MY_DIR/log/forever.log -o $MY_DIR/log/out.log -e l$MY_DIR/og/err.log $MY_DIR/bin/www
