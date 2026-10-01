FROM composer:2 AS composer-deps
WORKDIR /app/backend
COPY backend/composer.json backend/composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --no-progress --no-scripts --optimize-autoloader

FROM php:8.2-fpm-alpine
RUN apk add --no-cache oniguruma-dev sqlite-dev \
    && docker-php-ext-install mbstring pdo_sqlite
WORKDIR /app/backend
COPY backend ./
COPY packages /app/packages
COPY infrastructure/docker/php-fpm-env.conf /usr/local/etc/php-fpm.d/zz-portfolio.conf
COPY --from=composer-deps /app/backend/vendor ./vendor
RUN mkdir -p storage/db bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache
EXPOSE 9000
