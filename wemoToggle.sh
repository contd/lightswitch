#!/usr/bin/env bash

WEMOSTATE=$(curl -s -X GET http://192.168.200.15:3000/wemostat | jq -r '.lightState')

if [[ "$WEMOSTATE" == "0" ]];then
	curl -s -X GET http://192.168.200.15:3000/wemon | jq .
else
	curl -s -X GET http://192.168.200.15:3000/wemoff | jq .
fi

exit 0
