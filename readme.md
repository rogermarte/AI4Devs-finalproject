## Índice

0. [Ficha del proyecto](#0-ficha-del-proyecto)
1. [Descripción general del producto](#1-descripción-general-del-producto)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Modelo de datos](#3-modelo-de-datos)
4. [Especificación de la API](#4-especificación-de-la-api)
5. [Historias de usuario](#5-historias-de-usuario)
6. [Tickets de trabajo](#6-tickets-de-trabajo)
7. [Pull requests](#7-pull-requests)

---

## 0. Ficha del proyecto

### **0.1. Tu nombre completo: Roger Martínez Terés**

### **0.2. Nombre del proyecto: InvestHome Pro**

### **0.3. Descripción breve del proyecto:**

Una plataforma que conecta Personal Shoppers Inmobiliarios con inversores, facilitando la gestión y presentación de oportunidades de inversión inmobiliaria previamente analizadas. La plataforma permite crear redes profesionales entre ambos perfiles, agilizando el proceso de inversión y mejorando la toma de decisiones.

### **0.4. URL del proyecto:**

TBD

### 0.5. URL o archivo comprimido del repositorio

TDD

---

## 1. Descripción general del producto

### **1.1. Objetivo:**

InvestHome Pro tiene como objetivo principal revolucionar y optimizar el proceso de inversión inmobiliaria mediante la creación de un ecosistema digital que conecta a Personal Shoppers Inmobiliarios (PSI) con inversores de manera eficiente y profesional.

El producto resuelve tres problemas fundamentales del sector:

1. **Fragmentación del mercado:** Centraliza la conexión entre PSIs cualificados e inversores activos, eliminando intermediarios innecesarios y reduciendo el tiempo de búsqueda de oportunidades.

2. **Ineficiencia operativa:** Automatiza y digitaliza procesos que tradicionalmente son manuales y repetitivos, permitiendo a los PSIs dedicar más tiempo al análisis de oportunidades y menos a tareas administrativas.

3. **Falta de estandarización:** Establece un formato profesional y estructurado para la presentación de oportunidades de inversión, facilitando la toma de decisiones y mejorando la transparencia del proceso.

Los usuarios objetivo son:
- Personal Shoppers Inmobiliarios que buscan expandir su red de inversores y gestionar eficientemente sus operaciones
- Inversores inmobiliarios que buscan acceso a oportunidades pre-analizadas y una red de profesionales verificados
- Agencias inmobiliarias que quieren digitalizar y profesionalizar sus servicios de inversión

### **1.2. Características y funcionalidades principales:**

1. **Sistema de Usuarios y Perfiles**
   - Registro y autenticación diferenciada para PSIs e inversores
   - Verificación de identidad y credenciales profesionales
   - Perfiles profesionales personalizables
   - Sistema de reputación y testimonios verificados
   - Gestión de preferencias y criterios de inversión

2. **Gestión de Red Profesional**
   - Sistema de conexiones PSI-Inversor
   - Búsqueda avanzada de contactos con filtros específicos
   - Gestión de solicitudes de conexión
   - Visualización de red profesional y conexiones en común
   - Sistema de recomendaciones basado en perfil

3. **Gestión de Oportunidades de Inversión**
   - Publicación estructurada de propiedades
   - Sistema estandarizado de análisis financiero
   - Calculadora de rentabilidad integrada
   - Gestión de documentación y due diligence
   - Sistema de estados y seguimiento de oportunidades

4. **Comunicación y Seguimiento**
   - Chat profesional integrado
   - Sistema de notificaciones personalizable
   - Agenda de visitas y reuniones
   - Historial de interacciones
   - Compartición segura de documentos

5. **Analytics y Reporting**
   - Dashboard personalizado por tipo de usuario
   - Métricas de rendimiento de oportunidades
   - Análisis de mercado y tendencias
   - Informes de actividad y conversión
   - Exportación de datos y reportes

6. **Herramientas de Productividad**
   - Templates de análisis financiero
   - Generación automática de informes
   - Comparador de oportunidades
   - Sistema de etiquetado y organización
   - Integración con herramientas externas (CRM, calendarios)

7. **Seguridad y Cumplimiento**
   - Encriptación de datos sensibles
   - Gestión de permisos y accesos
   - Trazabilidad de operaciones
   - Cumplimiento GDPR/LOPD
   - Backup automático de información

### **1.3. Diseño y experiencia de usuario:**

#### 1.3.1. Flujos principales de usuario

**1. Flujo del Personal Shopper Inmobiliario (PSI)**
- Registro y verificación profesional
- Configuración del perfil profesional
- Publicación de oportunidades de inversión
- Gestión de red de inversores
- Seguimiento de propuestas

**2. Flujo del Inversor**
- Registro y verificación
- Configuración de preferencias de inversión
- Exploración de oportunidades
- Conexión con PSIs
- Seguimiento de inversiones

#### 1.3.2. Wireframes principales

**Landing Page**

TBD

#### 1.3.3. Paleta de colores y diseño

**Colores principales:**
- Primary: #2B4C7E (Azul corporativo - Transmite profesionalidad y confianza)
- Secondary: #1EA896 (Verde-azulado - Representa crecimiento y estabilidad)
- Accent: #FF6B6B (Coral - Para llamadas a la acción)
- Neutral: #F8F9FA (Fondo claro para mejor legibilidad)

**Tipografía:**
- Títulos: Poppins (Sans-serif moderna y profesional)
- Cuerpo: Inter (Excelente legibilidad en pantalla)

#### 1.3.4. Principios de diseño

1. **Simplicidad y claridad**
   - Interfaces limpias y organizadas
   - Jerarquía visual clara
   - Información relevante a primera vista

2. **Profesionalidad**
   - Diseño sobrio y corporativo
   - Énfasis en datos y análisis
   - Presentación estructurada de información

3. **Usabilidad**
   - Navegación intuitiva
   - Acciones principales siempre visibles
   - Feedback claro al usuario

4. **Responsive y adaptativo**
   - Diseño mobile-first
   - Adaptación a diferentes dispositivos
   - Mantenimiento de funcionalidad en todas las pantallas

### **1.4. Instrucciones de instalación:**

TBD

---

## 2. Arquitectura del Sistema

### **2.1. Diagrama de arquitectura:**

La arquitectura sigue un diseño hexagonal (ports & adapters) con Domain-Driven Design, estructurada en las siguientes capas:

1. **UI Layer (Adapters primarios)**
   - Aplicación Web (React + TypeScript)
   - Aplicación Móvil (React Native)

2. **Application Layer**
   - API Gateway (Node.js/Express)
   - Servicios de dominio independientes
   - Implementación de casos de uso

3. **Domain Layer**
   - Entidades y agregados
   - Reglas de negocio
   - Value Objects
   - Domain Events

4. **Infrastructure Layer (Adapters secundarios)**
   - Persistencia (PostgreSQL)
   - Cache (Redis)
   - Message Queue (RabbitMQ)
   - File Storage (S3)

**Beneficios de esta arquitectura:**
- Separación clara de responsabilidades
- Testabilidad mejorada
- Escalabilidad independiente de servicios
- Mantenibilidad a largo plazo

**Sacrificios/Compromisos:**
- Mayor complejidad inicial
- Overhead en comunicación entre servicios
- Necesidad de gestionar consistencia eventual

```mermaid
graph TD
    subgraph "UI Layer (Primary Adapters)"
        Web["Web App<br/>(React + TypeScript)"]
        Mobile["Mobile App<br/>(React Native)"]
    end

    subgraph "Application Layer"
        API["API Gateway<br/>(Node.js/Express)"]
        subgraph "Domain Services"
            UserS["User Service"]
            PropS["Property Service"]
            InvS["Investment Service"]
            ChatS["Chat Service"]
        end
    end

    subgraph "Domain Layer"
        Entities["Entities & Aggregates"]
        ValueObj["Value Objects"]
        DomainEvents["Domain Events"]
    end

    subgraph "Infrastructure Layer (Secondary Adapters)"
        DB[(PostgreSQL)]
        Cache[(Redis)]
        Queue[(RabbitMQ)]
        Storage[(AWS S3)]
    end

    Web --> API
    Mobile --> API
    API --> UserS & PropS & InvS & ChatS
    UserS & PropS & InvS & ChatS --> Entities
    Entities --> ValueObj
    Entities --> DomainEvents
    UserS & PropS & InvS & ChatS --> DB
    UserS & PropS & InvS & ChatS --> Cache
    UserS & PropS & InvS & ChatS --> Queue
    UserS & PropS & InvS & ChatS --> Storage

    classDef primary fill:#2B4C7E,stroke:#333,stroke-width:2px,color:white;
    classDef application fill:#1EA896,stroke:#333,stroke-width:2px,color:white;
    classDef domain fill:#FF6B6B,stroke:#333,stroke-width:2px,color:white;
    classDef infrastructure fill:#6C757D,stroke:#333,stroke-width:2px,color:white;

    class Web,Mobile primary;
    class API,UserS,PropS,InvS,ChatS application;
    class Entities,ValueObj,DomainEvents domain;
    class DB,Cache,Queue,Storage infrastructure;
```

### **2.2. Descripción de componentes principales:**

#### Capa de UI (Adaptadores Primarios)

1. **Aplicación Web (React + TypeScript)**
   - Framework: React 18
   - Gestión de Estado: Redux Toolkit
   - Componentes UI: Material-UI v5
   - Gestión de Formularios: React Hook Form
   - Cliente API: Axios
   - Pruebas: Jest + React Testing Library
   - Herramienta de Construcción: Vite

2. **Aplicación Móvil (React Native)**
   - Framework: React Native
   - Navegación: React Navigation 6
   - Gestión de Estado: Redux Toolkit
   - Componentes UI: React Native Paper
   - Pruebas: Jest + React Native Testing Library

#### Capa de Aplicación

1. **Puerta de Enlace API (Node.js/Express)**
   - Entorno de Ejecución: Node.js 20.x
   - Framework: Express.js
   - Documentación API: OpenAPI/Swagger
   - Autenticación: JWT + OAuth2
   - Validación: Joi/Zod
   - Pruebas: Jest + Supertest

2. **Servicios de Dominio**
   - **Servicio de Usuarios**
     - Gestión de usuarios y perfiles
     - Sistema de autenticación y autorización
     - Gestión de preferencias
     
   - **Servicio de Propiedades**
     - Gestión de propiedades
     - Sistema de búsqueda y filtrado
     - Análisis financiero
     
   - **Servicio de Inversiones**
     - Gestión de oportunidades de inversión
     - Sistema de seguimiento
     - Análisis de rentabilidad
     
   - **Servicio de Chat**
     - Comunicación en tiempo real
     - Gestión de mensajes y notificaciones
     - WebSocket con Socket.io

#### Capa de Dominio

1. **Entidades y Agregados**
   - Implementación de lógica de negocio
   - Invariantes y reglas de dominio
   - Patrones DDD (Entidad, Raíz de Agregado, Objeto de Valor)

2. **Eventos de Dominio**
   - Origen de Eventos
   - Almacén de Eventos
   - Manejadores de Eventos

#### Capa de Infraestructura (Adaptadores Secundarios)

1. **Base de Datos PostgreSQL**
   - ORM: Prisma
   - Migraciones automáticas
   - Índices y optimizaciones
   - Copias de seguridad y recuperación

2. **Caché Redis**
   - Caché de sesión
   - Limitación de tasa
   - Colas de trabajo
   - Publicación/Suscripción para tiempo real

3. **Cola de Mensajes RabbitMQ**
   - Gestión de eventos de dominio
   - Comunicación asíncrona entre servicios
   - Patrones de mensajería (Publicador/Suscriptor, Solicitud/Respuesta)

4. **Almacenamiento AWS S3**
   - Almacenamiento de documentos
   - Red de distribución de contenidos para imágenes
   - Copias de seguridad de datos
   - Gestión de versiones

#### Herramientas de Desarrollo y Despliegue

1. **Control de Versiones**
   - Git + GitHub
   - Commits Convencionales
   - Acciones de GitHub para CI/CD

2. **Monitorización y Registro**
   - Pila ELK
   - Prometheus + Grafana
   - Sentry para seguimiento de errores

3. **Pruebas**
   - TDD con Jest
   - Pruebas E2E con Cypress
   - Pruebas de carga con k6
   - SonarQube para calidad de código

### **2.3. Descripción de alto nivel del proyecto y estructura de ficheros**

La estructura del proyecto sigue una arquitectura hexagonal (ports & adapters) con DDD, organizada de la siguiente manera:

```
src/
├── application/                # Casos de uso y servicios de aplicación
│   ├── services/              # Servicios de aplicación
│   │   ├── user/             # Servicios relacionados con usuarios
│   │   ├── property/         # Servicios de gestión de propiedades
│   │   ├── investment/       # Servicios de inversión
│   │   └── chat/            # Servicios de comunicación
│   ├── ports/                 # Puertos (interfaces) de entrada y salida
│   │   ├── input/           # Puertos de entrada (API, UI)
│   │   └── output/          # Puertos de salida (DB, servicios externos)
│   └── use-cases/             # Casos de uso específicos
│       ├── user/
│       ├── property/
│       └── investment/
│
├── domain/                    # Núcleo de dominio
│   ├── entities/              # Entidades de dominio
│   │   ├── user/
│   │   ├── property/
│   │   └── investment/
│   ├── value-objects/         # Objetos de valor
│   ├── aggregates/            # Agregados
│   ├── events/                # Eventos de dominio
│   └── repositories/          # Interfaces de repositorio
│
├── infrastructure/            # Adaptadores e implementaciones
│   ├── persistence/           # Implementaciones de persistencia
│   │   ├── postgresql/        # Adaptador PostgreSQL
│   │   │   ├── repositories/
│   │   │   ├── models/
│   │   │   └── migrations/
│   │   └── redis/            # Adaptador Redis
│   │       ├── cache/
│   │       └── session/
│   ├── messaging/             # Implementación de mensajería
│   │   └── rabbitmq/         # Adaptador RabbitMQ
│   │       ├── publishers/
│   │       └── consumers/
│   ├── storage/              # Implementación de almacenamiento
│   │   └── s3/               # Adaptador AWS S3
│   └── api/                  # Implementación de API
│       └── express/          # Adaptador Express
│           ├── routes/
│           ├── middlewares/
│           └── controllers/
│
├── ui/                       # Interfaces de usuario
│   ├── web/                  # Aplicación web React
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── store/
│   └── mobile/               # Aplicación móvil React Native
│       ├── components/
│       ├── screens/
│       ├── navigation/
│       └── store/
│
└── shared/                   # Código compartido
    ├── types/                # Tipos y interfaces
    ├── utils/                # Utilidades comunes
    └── constants/            # Constantes globales
```

#### Principios de Organización:

1. **Separación de Capas**
   - Cada capa tiene su propia responsabilidad bien definida
   - Las dependencias fluyen unidireccionalmente hacia el dominio
   - Se aplica inversión de dependencias mediante interfaces
   - Clara separación entre lógica de negocio y detalles técnicos

2. **Modularidad**
   - Módulos independientes y cohesivos
   - Bajo acoplamiento entre módulos
   - Reutilización de código mediante carpeta shared
   - Cada módulo puede evolucionar de forma independiente

3. **Escalabilidad**
   - Estructura preparada para el crecimiento del proyecto
   - Fácil adición de nuevos adaptadores y funcionalidades
   - Separación clara de responsabilidades
   - Posibilidad de escalar servicios de forma independiente

4. **Mantenibilidad**
   - Organización intuitiva y consistente
   - Fácil localización de componentes y funcionalidades
   - Estructura preparada para pruebas unitarias por capa
   - Documentación integrada en la estructura

#### Convenciones de Nombrado:

1. **Archivos**
   - Entidades: `[nombre].entity.ts`
   - Repositorios: `[nombre].repository.ts`
   - Servicios: `[nombre].service.ts`
   - Controladores: `[nombre].controller.ts`
   - Tests: `[nombre].spec.ts`

2. **Directorios**
   - Módulos en singular: `user/` en lugar de `users/`
   - Descriptivos y específicos: `persistence/` en lugar de `data/`
   - Agrupación

### **2.4. Infraestructura y despliegue**

#### 2.4.1 Diagrama de Infraestructura

```mermaid
graph TD
    subgraph "Producción AWS"
        LB[Load Balancer]
        
        subgraph "Frontend"
            WEB[React Web App]
            MOB[React Native App]
        end
        
        subgraph "Backend"
            API[API Gateway]
            US[User Service]
            PS[Property Service]
            IS[Investment Service]
            CS[Chat Service]
        end
        
        subgraph "Datos"
            DB[(PostgreSQL)]
            CACHE[(Redis)]
            MQ[(RabbitMQ)]
            S3[(AWS S3)]
        end
        
        subgraph "Monitorización"
            PROM[Prometheus]
            GRAF[Grafana]
            LOG[ELK Stack]
        end
    end

    Cliente --> LB
    LB --> WEB
    LB --> MOB
    WEB & MOB --> API
    API --> US & PS & IS & CS
    US & PS & IS & CS --> DB
    US & PS & IS & CS --> CACHE
    US & PS & IS & CS --> MQ
    US & PS & IS & CS --> S3
    
    US & PS & IS & CS --> PROM
    PROM --> GRAF
    US & PS & IS & CS --> LOG
```

#### 2.4.2 Componentes Principales

1. **Frontend**
   - Web App: Desplegada en AWS S3 + CloudFront
   - Mobile App: Distribuida vía App Stores

2. **Backend**
   - API Gateway: AWS ECS en contenedores
   - Microservicios: AWS ECS Fargate
   - Base de Datos: AWS RDS PostgreSQL
   - Caché: AWS ElastiCache Redis
   - Cola de Mensajes: Amazon MQ (RabbitMQ)
   - Almacenamiento: AWS S3

3. **Monitorización**
   - Métricas: Prometheus + Grafana
   - Logs: ELK Stack
   - Alertas: AWS CloudWatch

#### 2.4.3 Proceso de Despliegue

1. **Pipeline de CI/CD**
```mermaid
graph LR
    A[Git Push] --> B[GitHub Actions]
    B --> C[Tests]
    C --> D[Build]
    D --> E[Deploy Test]
    E --> F[Tests E2E]
    F --> G[Deploy Prod]
```

2. **Fases del Despliegue**
   - **Desarrollo**
     1. Pruebas locales con Docker Compose
     2. Commit y push a GitHub
     3. Ejecución de pipeline CI/CD

   - **Pruebas**
     1. Despliegue automático en entorno de pruebas
     2. Ejecución de tests E2E
     3. Validación de rendimiento

   - **Producción**
     1. Aprobación manual requerida
     2. Despliegue Blue-Green
     3. Verificación de salud
     4. Rollback automático si es necesario

3. **Estrategias de Despliegue**
   - Zero-downtime deployments
   - Canary releases para cambios críticos
   - Rollback automatizado
   - Monitorización post-despliegue

#### 2.4.4 Seguridad y Backup

1. **Seguridad**
   - WAF en frontal
   - VPC con subredes privadas
   - Certificados SSL/TLS
   - Secrets en AWS Secrets Manager

2. **Backup**
   - Snapshots diarios de RDS
   - Replicación cross-region
   - Retención de 30 días
   - Pruebas de recuperación mensuales

#### 2.4.5 Escalabilidad

1. **Horizontal**
   - Auto-scaling para servicios
   - Múltiples zonas de disponibilidad
   - Balanceo de carga automático

2. **Vertical**
   - Monitorización de recursos
   - Ajuste automático de capacidad
   - Alertas de rendimiento

---

## 3. Modelo de Datos

### **3.1. Diagrama del modelo de datos:**

> Recomendamos usar mermaid para el modelo de datos, y utilizar todos los parámetros que permite la sintaxis para dar el máximo detalle, por ejemplo las claves primarias y foráneas.


### **3.2. Descripción de entidades principales:**

> Recuerda incluir el máximo detalle de cada entidad, como el nombre y tipo de cada atributo, descripción breve si procede, claves primarias y foráneas, relaciones y tipo de relación, restricciones (unique, not null…), etc.

---

## 4. Especificación de la API

> Si tu backend se comunica a través de API, describe los endpoints principales (máximo 3) en formato OpenAPI. Opcionalmente puedes añadir un ejemplo de petición y de respuesta para mayor claridad

---

## 5. Historias de Usuario

> Documenta 3 de las historias de usuario principales utilizadas durante el desarrollo, teniendo en cuenta las buenas prácticas de producto al respecto.

**Historia de Usuario 1**

**Historia de Usuario 2**

**Historia de Usuario 3**

---

## 6. Tickets de Trabajo

> Documenta 3 de los tickets de trabajo principales del desarrollo, uno de backend, uno de frontend, y uno de bases de datos. Da todo el detalle requerido para desarrollar la tarea de inicio a fin teniendo en cuenta las buenas prácticas al respecto. 

**Ticket 1**

**Ticket 2**

**Ticket 3**

---

## 7. Pull Requests

> Documenta 3 de las Pull Requests realizadas durante la ejecución del proyecto

**Pull Request 1**

**Pull Request 2**

**Pull Request 3**

