#!/bin/bash
cp ./docker/backend/docker-compose.yml .
cp ./docker/backend/Dockerfile .
sudo docker-compose build
