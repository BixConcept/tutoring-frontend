#!/bin/bash

cd /var/www/tutoring-frontend

if [[ $(git pull) != "Already up to date." ]]
then
	git pull &&
	npm install &&
	npm run build
fi
