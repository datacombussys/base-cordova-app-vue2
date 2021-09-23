#!/bin/bash

python3 ./backend/manage.py makemigrations users
python3 ./backend/manage.py migrate users
python3 ./backend/manage.py makemigrations
python3 ./backend/manage.py migrate
