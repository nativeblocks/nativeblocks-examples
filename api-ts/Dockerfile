FROM node:20.18.0-alpine3.19
ENV NODE_ENV=PRODUCTION

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

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
CMD ["yarn", "prod"]