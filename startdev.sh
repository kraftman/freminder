docker-compose -f dc.yml -f dc-dev.yml stop
docker-compose -f dc.yml -f dc-dev.yml rm -f
docker-compose -f dc.yml -f dc-dev.yml up
