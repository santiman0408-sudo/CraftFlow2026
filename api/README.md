# CraftFlow API REST

API REST complementaria para CraftFlow. Se mantiene independiente de la aplicación móvil y de su SQLite local.

## Ejecución

Requiere Node.js 18+.

```bash
cd api
npm start
```

Servidor: `http://localhost:3000`

## Endpoints

- GET `/api/health`
- POST `/api/auth/login`
- GET `/api/dashboard`
- POST `/api/sync`
- GET/POST `/api/clientes`
- GET/PUT/DELETE `/api/clientes/:id`
- GET/POST `/api/categorias`
- GET/PUT/DELETE `/api/categorias/:id`
- GET/POST `/api/productos`
- GET/PUT/DELETE `/api/productos/:id`
- GET/POST `/api/pedidos`
- GET/PUT/DELETE `/api/pedidos/:id`

La API usa `api/data/craftflow.json` para su persistencia independiente, evitando alterar `craftflow.db`.

Credenciales del endpoint de autenticación, alineadas con la app existente:

- Usuario: `admin`
- Contraseña: `CraftFlow2026`


## Sincronización con SQLite

La aplicación móvil mantiene SQLite como persistencia principal y envía una copia de sus datos mediante `POST /api/sync`. La sincronización es complementaria y no modifica la interfaz. Si la API no está disponible, CraftFlow continúa operando con SQLite.
