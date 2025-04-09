# 使用 PHP-FPM Alpine 镜像
FROM php:7.4-fpm-alpine

# 安装依赖和扩展
RUN apk add --no-cache \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libzip-dev \
    mysql-client \
    && docker-php-ext-install -j$(nproc) pdo_mysql mysqli gd \
    && docker-php-ext-enable pdo_mysql mysqli gd

# 设置工作目录
WORKDIR /var/www/html

# 复制 PHP 配置文件
COPY ./php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

# 设置权限（关键修改部分）
RUN chmod -R 777 /var/www/html

    
