FROM php:8.3-rc-apache

RUN apt-get update
RUN apt-get install --yes --force-yes cron g++ gettext libicu-dev openssl libc-client-dev libkrb5-dev libxml2-dev libfreetype6-dev libgd-dev libmcrypt-dev bzip2 libbz2-dev libtidy-dev libcurl4-openssl-dev libz-dev libmemcached-dev libxslt-dev

RUN a2enmod rewrite

RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli

RUN docker-php-ext-configure gd --with-freetype=/usr --with-jpeg=/usr
RUN docker-php-ext-install gd

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

COPY ./ /var/www/html/