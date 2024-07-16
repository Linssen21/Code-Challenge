## 1. Docker commands

The following are the commands use for starting up the containers

Building the containers

```shell
docker-compose -f docker-compose.local.yml build
```

Starting up the containers

```shell
docker-compose -f docker-compose.local.yml up -d
```

## 2. Laravel Backend command

Running the migrations and seeder

```shell
docker exec -it backend-exam bash migrate_and_seed.sh
```
