#FROM phpdockerio/php73-fpm:latest
FROM php:7.3-fpm
WORKDIR "/application"
#
## Fix debconf warnings upon build
#ARG DEBIAN_FRONTEND=noninteractive
#
## Install selected extensions and other stuff
#RUN apt-get update \
#    && apt-get -y --no-install-recommends install  php7.3-mysql php-redis php7.3-imap php7.3-intl php7.3-xsl \
#    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*
#
## Install git
#RUN apt-get update \
#    && apt-get -y install git \
#    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*
#

RUN apt-get update && apt-get install -y libmcrypt-dev \
    libzip-dev \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libpq-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    git \
    unzip \
    curl

# Install extensions
RUN docker-php-ext-install pgsql pdo_pgsql zip exif pcntl
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
RUN docker-php-ext-install gd

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
