FROM node:18-alpine AS builder

WORKDIR /app

# Instalar dependencias de compilación
RUN apk add --no-cache python3 make g++

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Instalar dependencias usando install en lugar de ci
RUN npm install

# Copiar código fuente
COPY . .

# Generar Prisma Client y construir
RUN npx prisma generate
RUN npm run build

# Imagen final
FROM node:18-alpine

WORKDIR /app

# Copiar archivos necesarios
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

EXPOSE 4000

CMD ["npm", "start"]