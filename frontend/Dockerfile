FROM --platform=linux/amd64 node:18-alpine AS builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar código fuente
COPY . .

# Asegurar que las variables de entorno están disponibles durante el build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Construir la aplicación
RUN npm run build

# Imagen final
FROM --platform=linux/amd64 node:18-alpine

WORKDIR /app

# Copiar archivos necesarios
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public

# Asegurar que las variables de entorno están disponibles en runtime
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

EXPOSE 3000

CMD ["npm", "start"] 