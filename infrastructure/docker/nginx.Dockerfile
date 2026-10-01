FROM nginx:1.27-alpine
COPY infrastructure/nginx/api.conf /etc/nginx/conf.d/default.conf
COPY backend/public /app/backend/public
EXPOSE 80
