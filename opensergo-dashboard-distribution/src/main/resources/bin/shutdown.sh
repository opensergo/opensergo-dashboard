#!/bin/sh

cd `dirname $0`/../lib
target_dir=`pwd`

pid=`ps ax | grep -i 'opensergo-dashboard' | grep ${target_dir} | grep java | grep -v grep | awk '{print $1}'`
if [ -z "$pid" ] ; then
        echo "No opensergo-dashboard server running."
        exit -1;
fi

echo "The opensergo-dashboard server(${pid}) is running..."

kill ${pid}

echo "Send shutdown request to opensergo-dashboard server(${pid}) OK!"
