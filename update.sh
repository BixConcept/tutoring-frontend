#!/bin/bash

if [[ $(git pull) != "Already up to date." ]]
then
	git pull &&
	npm install &&
	npm run build
fi
