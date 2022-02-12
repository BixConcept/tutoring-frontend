#!/bin/bash

echo "1"

cd /var/www/tutoring-frontend || exit

echo "2"

if [[ $(git pull) != "Already up to date." ]]
then
	npm install 
	npm run build 
    rm -rf build_production
    mv build build_production # we serve build_production so the user doesn't get a 404 while updating
fi

echo "7"
