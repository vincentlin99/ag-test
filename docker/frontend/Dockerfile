FROM nginx:1.11.10-alpine

COPY docker/frontend/nginx.conf /etc/nginx/nginx.conf
COPY docker/frontend/nginx.vh.default.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /usr/app/html

COPY dist/static /usr/app/html

RUN apk add --no-cache dnsmasq supervisor
RUN mkdir -p /etc/supervisor.d
COPY docker/frontend/supervisord.ini /etc/supervisor.d/supervisord.ini

EXPOSE 80 443

CMD ["/usr/bin/supervisord"]
