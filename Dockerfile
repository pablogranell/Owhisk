FROM debian:latest

# Instala cron y curl
RUN apt-get update && apt-get install -y cron rsyslog curl

# Copia el archivo cron al contenedor
COPY my-cron /etc/cron.d/my-cron

# Da permisos de ejecución al archivo cron
RUN chmod 0644 /etc/cron.d/my-cron

# Create required directories and log file
RUN mkdir -p /var/run /var/log && \
    touch /var/log/cron_output.log && \
    chmod 0666 /var/log/cron_output.log

# Registra el cron job
RUN crontab /etc/cron.d/my-cron

# Configurar rsyslog para cron
RUN echo "cron.*                          /var/log/cron.log" >> /etc/rsyslog.d/50-default.conf

# Crear archivo de log
RUN touch /var/log/cron.log

# Modificar el CMD para iniciar rsyslog y cron
CMD rsyslogd && cron && tail -f /var/log/cron.log
