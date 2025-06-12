#!/bin/sh

echo "Waiting for database at $DB_HOST:$DB_PORT..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Waiting..."
  sleep 2
done

echo "Database is up, running migrations..."
npx prisma generate
npx prisma db push

echo "Starting server..."
npm run start
