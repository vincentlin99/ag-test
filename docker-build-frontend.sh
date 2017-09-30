#!/bin/bash
cp ./docker/frontend/docker-compose.yml .
cp ./docker/frontend/Dockerfile .
sudo docker-compose build
