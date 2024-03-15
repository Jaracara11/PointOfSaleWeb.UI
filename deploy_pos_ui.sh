#!/bin/bash -x

cd PointOfSaleWeb.UI
git checkout master
git config pull.rebase false
git pull
docker stop pos-web.ui
docker rm pos-web.ui
docker build -t pos.ui .
docker run -d -p 3000:3000 --restart unless-stopped --name pos-web.ui pos.ui
docker image prune -f

echo "List of running Docker containers:"
docker ps