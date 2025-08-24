FROM php:8.2-apache

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    git \
    libicu-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Instalar extensiones PHP
RUN docker-php-ext-install \
    mysqli \
    pdo_mysql \
    zip \
    intl

# Habilitar módulos Apache
RUN a2enmod rewrite

# Configurar Apache para procesar PHP
RUN echo '<FilesMatch \\.php$>' > /etc/apache2/conf-available/php.conf && \
    echo '    SetHandler application/x-httpd-php' >> /etc/apache2/conf-available/php.conf && \
    echo '</FilesMatch>' >> /etc/apache2/conf-available/php.conf && \
    a2enconf php

# Configurar DocumentRoot
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Configurar directorio de trabajo
WORKDIR /var/www/html

# Copiar archivos del proyecto
COPY . /var/www/html/

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalar dependencias de CodeIgniter
RUN composer install --no-dev --optimize-autoloader

# Configurar permisos
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html/writable/

# Configurar Apache para el directorio public
RUN echo '<Directory /var/www/html/public/>' > /etc/apache2/conf-available/docker-php.conf && \
    echo '    AllowOverride All' >> /etc/apache2/conf-available/docker-php.conf && \
    echo '    Require all granted' >> /etc/apache2/conf-available/docker-php.conf && \
    echo '</Directory>' >> /etc/apache2/conf-available/docker-php.conf && \
    a2enconf docker-php

# Exponer puerto
EXPOSE 80

# Comando de inicio
CMD ["apache2-foreground"]