# Sistema Partidas LoL

Aplicacion fullstack para gestionar informacion de **jugadores**, **campeones** y **partidas** de League of Legends, conectada a base de datos PostgreSQL.

## Nota sobre el frontend

El frontend fue desarrollado con enfoque **Vibe Coding** (React + Vite), priorizando velocidad de iteracion, UI moderna y conexion directa con el backend.

## Stack

- Backend: Java 17, Spring Boot 3, Spring Web, Spring Data JPA
- Base de datos: PostgreSQL
- Frontend: React 19, Vite, React Router, Axios

## Estructura del proyecto

SistemaPartidasLoL/
  src/                     # Backend (Spring Boot)
  frontend/                # Frontend (React + Vite)
  pom.xml
  README.md


## Requisitos

- Java 17+
- Maven 3.9+
- Node.js 20+
- PostgreSQL levantado localmente

## Endpoints principales

### Player

- `GET /player/get`
- `POST /player/add`
- `PATCH /player/update`
- `DELETE /player/delete`

### Champion

- `GET /champion/all`
- `POST /champion/add`
- `DELETE /champion/delete`

### Match

- `GET /match/get`
- `POST /match/add`

## Estado actual

- Frontend conectado al backend via Axios (`http://localhost:8080`)
- Busqueda de players y champions desde la interfaz
- UI responsive con estilo visual inspirado en League of Legends
