# Sistema Partidas LoL

Aplicacion para gestionar informacion de jugadores, campeones y partidas de League of Legends.

## Stack tecnologico

- Backend: Java 17, Spring Boot 3, Spring Web, Spring Data JPA
- Base de datos: PostgreSQL
- Frontend: React 19, Vite, React Router, Axios

## Requisitos

- Java 17+
- Maven 3.9+
- Node.js 20+
- PostgreSQL local (por defecto: `lol_db`)

## Configuracion backend

Archivo: `src/main/resources/application.properties`

- URL DB: `jdbc:postgresql://localhost:5432/lol_db`
- Usuario DB: `postgres`
- Password DB: `admin`
- JPA: `spring.jpa.hibernate.ddl-auto=update`

## Ejecucion

### Backend

```bash
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

## API REST detallada

Base URL: `http://localhost:8080`

### Enums usados por la API

- `Region`: `LAS`, `LAN`, `BR`, `NA`, `EUW`, `EUNE`, `KR`, `JP`
- `Elo`: `IRON`, `BRONZE`, `SILVER`, `GOLD`, `PLATINUM`, `EMERALD`, `DIAMOND`, `MASTER`, `GRANDMASTER`, `CHALLENGER`
- `Role`: `TOP`, `JUNGLE`, `MID`, `ADC`, `SUPPORT`
- `Difficulty`: `HARD`, `MEDIUM`, `EASY`
- `TeamSide`: `Blue_Side`, `Red_Side`
- `TypeDamage`: `TRUE`, `MAGIC`, `PHYSICAL`

### Player (`/player`)

#### `GET /player/get`
Obtiene jugadores con filtros opcionales.

Query params opcionales:
- `id` (Long)
- `nickname` (String)
- `region` (`Region`)
- `level` (Integer)
- `elo` (`Elo`)

Response `200 OK`:
```json
[
  {
    "id": 1,
    "nickname": "Summoner1",
    "region": "LAS",
    "level": 250,
    "elo": "EMERALD"
  }
]
```

#### `GET /player/getStats`
Obtiene estadisticas globales de un jugador.

Query params obligatorios:
- `id` (Long)

Response `200 OK`:
```json
{
  "playerId": 1,
  "totalMatchesPlayed": 20,
  "wins": 12,
  "losses": 8,
  "winrate": 60.0
}
```

#### `GET /player/getChampionsStats`
Obtiene estadisticas del jugador por campeon.

Query params obligatorios:
- `id` (Long)

Response `200 OK`:
```json
[
  {
    "championId": 157,
    "championName": "Yasuo",
    "totalMatches": 10,
    "wins": 6,
    "losses": 4,
    "winrate": 60.0
  }
]
```

#### `POST /player/add`
Crea un jugador.

Body:
```json
{
  "id": 1,
  "nickname": "Summoner1",
  "region": "LAS",
  "level": 250,
  "elo": "EMERALD"
}
```

Response: `200 OK` (sin body)

#### `PATCH /player/update`
Actualiza un jugador por query params.

Query params:
- Obligatorio: `id` (Long)
- Opcionales: `nickname`, `region`, `level`, `elo`

Ejemplo:
`/player/update?id=1&nickname=NuevoNick&elo=DIAMOND`

Response: `200 OK` (sin body)

#### `DELETE /player/delete`
Elimina un jugador.

Query params obligatorios:
- `id` (Long)

Response: `200 OK` (sin body)

### Champion (`/champion`)

#### `GET /champion/all`
Obtiene campeones con filtros opcionales.

Query params opcionales:
- `name` (String)
- `role` (`Role`)
- `difficulty` (`Difficulty`)

Response `200 OK`:
```json
[
  {
    "id": 157,
    "name": "Yasuo",
    "description": "The Unforgiven",
    "roles": ["MID", "TOP"],
    "difficulty": "HARD",
    "typeDamages": ["PHYSICAL"]
  }
]
```

#### `POST /champion/add`
Crea un campeon.

Body:
```json
{
  "id": 157,
  "name": "Yasuo",
  "description": "The Unforgiven",
  "roles": ["MID", "TOP"],
  "difficulty": "HARD",
  "typeDamages": ["PHYSICAL"]
}
```

Response: `200 OK` (sin body)

#### `DELETE /champion/delete`
Elimina un campeon.

Query params obligatorios:
- `id` (Long)

Response: `204 No Content`

### Match (`/match`)

#### `GET /match/get`
Obtiene partidas con filtros opcionales.

Query params opcionales:
- `matchId` (Long)
- `date` (Date; ejemplo `2026-03-02`)

Response `200 OK`:
```json
[
  {
    "date": "2026-03-02",
    "teamWinner": "Blue_Side",
    "participations": [
      {
        "participationId": 1,
        "role": "MID",
        "teamSide": "Blue_Side",
        "playerId": 1,
        "matchId": 100,
        "championId": 157
      }
    ]
  }
]
```

#### `POST /match/add`
Crea una partida con sus participaciones.

Body:
```json
{
  "date": "2026-03-02",
  "teamWinner": "Blue_Side",
  "participations": [
    {
      "participationId": 1,
      "role": "MID",
      "teamSide": "Blue_Side",
      "playerId": 1,
      "matchId": 100,
      "championId": 157
    }
  ]
}
```

Response: `200 OK` (sin body)

## Estructura del proyecto

```text
SistemaPartidasLoL/
|-- src/
|   |-- main/
|   |   |-- java/com/
|   |   |   |-- controller/      # Endpoints REST (Player, Champion, Match)
|   |   |   |-- service/         # Logica de negocio
|   |   |   |-- repository/      # Acceso a datos (Spring Data JPA)
|   |   |   |-- model/           # Entidades y enums de dominio
|   |   |   |-- dto/             # Objetos de transferencia API
|   |   |   |-- mapper/          # Conversion entidad <-> DTO
|   |   |   |-- converter/       # Converters para enums/queries
|   |   |   |-- exceptions/      # Excepciones de dominio
|   |   |   `-- SistemaPartidasLoLApplication.java
|   |   `-- resources/
|   |       `-- application.properties
|   `-- test/
|       `-- java/com/mihistoriallol/sistemaPartidasLoL/
|           `-- SistemaPartidasLoLApplicationTests.java
|-- frontend/
|   |-- src/
|   |   |-- app/                 # Router
|   |   |-- components/          # Componentes reutilizables
|   |   |-- features/players/    # Modulo de players (paginas + servicios)
|   |   |-- pages/               # Paginas principales
|   |   `-- services/            # Cliente Axios y APIs de champion/match
|   |-- package.json
|   `-- vite.config.js
|-- pom.xml
`-- README.md
```

## Notas de CORS

Los controladores exponen CORS para `http://localhost:5173`.
