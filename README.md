# Libros Lee

App mobile-web para leer libros (PDF y EPUB) con autenticación JWT, biblioteca y lector integrado.

## Estructura

- `/api` — Backend Node.js + Express + PostgreSQL (Neon) + JWT + bcrypt + helmet + rate-limit
- `/web` — Frontend React + Vite (PWA) con lector EPUB (epub.js) y PDF (pdf.js)

## Setup Backend

```bash
cd api
npm install
cp .env.example .env
# editar .env con tus credenciales Neon y JWT_SECRET
npm run dev
```

## Setup Frontend

```bash
cd web
npm install
npm run dev
```

## Base de datos

Ejecuta `api/schema.sql` en tu base de datos Neon para crear las tablas `users`, `books` y `reading_progress`.

## Seguridad

- Contraseñas con bcrypt
- JWT en Authorization header
- helmet, cors restringido, express-rate-limit
- Roles: admin (gestiona libros) y user (lee)
