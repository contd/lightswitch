#!/usr/bin/env bash

TPSTATE=$(curl -s -X GET http://192.168.200.15:3000/tpstate | jq -r '.lightState')

if [[ "$TPSTATE" == 0 ]];then
	curl -s -X GET http://192.168.200.15:3000/tpon | jq .
else
	curl -s -X GET http://192.168.200.15:3000/tpoff | jq .
fi

exit 0
