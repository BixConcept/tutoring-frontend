#!/bin/bash

echo "1"

cd /var/www/tutoring-frontend || exit

echo "2"

if [[ $(git pull) != "Already up to date." ]]
then
	echo "3" ;
	git pull ;
	echo "4"
	npm install ;
	echo "5"
	npm run build ;
	echo "6"
fi

echo "7"
