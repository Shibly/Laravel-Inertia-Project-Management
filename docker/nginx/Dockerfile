FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf


# Copy application code
COPY . /var/www

# Set permissions
#RUN chown -R www-data:www-data /var/www

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
