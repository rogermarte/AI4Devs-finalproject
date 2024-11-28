#!/bin/sh

# Ejecutar migraciones
npx prisma migrate deploy

# Ejecutar seeds si es necesario
if [ "$NODE_ENV" = "development" ]; then
  npx prisma db seed
fi

# Iniciar la aplicación
npm start 