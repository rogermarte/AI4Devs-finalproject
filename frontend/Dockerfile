FROM --platform=linux/amd64 node:18-alpine AS builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar código fuente
COPY . .

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

ENV NEXT_PUBLIC_API_URL=http://investhome-alb-1088488104.eu-west-1.elb.amazonaws.com:4000

EXPOSE 3000

CMD ["npm", "start"] 