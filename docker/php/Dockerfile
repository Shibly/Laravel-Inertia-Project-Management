# docker/php/Dockerfile
FROM node:22.3 as node-builder

# Set working directory
WORKDIR /var/www

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build assets
RUN npm run build

FROM php:8.3-fpm

ENV PHP_EXTRA_CONFIGURE_ARGS \
  --enable-fpm \
  --with-fpm-user=www-data \
  --with-fpm-group=www-data \
  --enable-intl \
  --enable-opcache \
  --enable-zip \
  --enable-calendar

# Install dependencies and PHP extensions
RUN apt-get update && \
    apt-get install -y \
    vim \
    wget \
    sendmail \
    git \
    zlib1g-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libfreetype6-dev \
    libcurl4-openssl-dev \
    libldap2-dev \
    libbz2-dev \
    libsodium-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip

RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install -j$(nproc) \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    curl \
    intl \
    opcache \
    pdo \
    soap \
    xml \
    zip \
    bz2 \
    sodium && \
    docker-php-ext-enable gd

# Install xdebug
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /var/www

# Copy application code
COPY . /var/www

# Set permissions
RUN chown -R www-data:www-data /var/www

# Expose ports
EXPOSE 9000

CMD ["php-fpm", "-F", "-O"]
