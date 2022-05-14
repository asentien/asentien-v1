#!/bin/sh
if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."
    
    while ! nc -z $DB_HOST $DB_PORT; do
      sleep 0.1
    done
    
    echo "PostgreSQL started"
fi

python manage.py collectstatic --noinput
python manage.py makemigrations --noinput
python manage.py migrate --noinput
python manage.py createcachetable
if [ "$DJANGO_SUPERUSER_USERNAME" ]
then
    python manage.py createsuperuser \
        --noinput \
        --first_name $DJANGO_SUPERUSER_FIST_NAME \
        --last_name $DJANGO_SUPERUSER_LAST_NAME \
        --email $DJANGO_SUPERUSER_EMAIL \
        --date_of_birth $DJANGO_SUPERUSER_DATE_OF_BIRTH    
fi

$@

exec "$@"