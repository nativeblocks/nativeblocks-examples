# API GO

A Sample app to show, how to bind nativeblocks CLI with GO app and compile DSL through the nativeblocks-cli

### Run app

```
 go run main.go
```

### Build docker image

```
 docker build -t api-go .
 ```

### Run docker container

```
docker run -it -p 9000:8080 api-go
```