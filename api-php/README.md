# API PHP

A Sample app to show, how to bind nativeblocks CLI with PHP app and compile DSL through the nativeblocks-cli

### Run app

```
 php -S localhost:8000 -t public
```

### Build docker image

```
 docker build -t api-ts .
 ```

### Run docker container

```
docker run -it -p 9000:8080 api-ts
```