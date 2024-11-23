FROM alpine:latest

RUN apk add --no-cache curl bash unzip

RUN ARCH=$(uname -m) && \
    if [ "$ARCH" = "x86_64" ]; then \
        FILE="nativeblocks_Linux_x86_64.tar.gz"; \
    elif [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then \
        FILE="nativeblocks_Linux_arm64.tar.gz"; \
    else \
        echo "Unsupported architecture: $ARCH" && exit 1; \
    fi && \
    mkdir -p /usr/local/nativeblocks/bin && \
    curl -L "https://github.com/nativeblocks/nativeblocks-cli/releases/latest/download/$FILE" -o /tmp/nativeblocks.tar.gz && \
    tar -xzf /tmp/nativeblocks.tar.gz -C /usr/local/nativeblocks/bin && \
    mv /usr/local/nativeblocks/bin/nativeblocks-cli /usr/local/nativeblocks/bin/nativeblocks && \
    chmod +x /usr/local/nativeblocks/bin/nativeblocks && \
    ln -s /usr/local/nativeblocks/bin/nativeblocks /usr/local/bin/nativeblocks && \
    rm /tmp/nativeblocks.tar.gz

RUN nativeblocks --help

RUN apk --no-cache add ca-certificates
WORKDIR /root/
# BEFORE COPY MAKE SURE THE BINARY IS BUILT
# GOARCH=amd64 GOOS=linux go build -o release .
COPY ./release .
EXPOSE 8080
CMD ["./release"]
