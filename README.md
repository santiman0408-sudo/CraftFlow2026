🎨 CraftFlow

Aplicación móvil para la gestión de pedidos de un emprendimiento artesanal, desarrollada con React Native, Expo SDK 54, TypeScript, SQLite y una estructura basada en Clean Architecture.

CraftFlow centraliza la gestión de clientes, productos, categorías y pedidos en una aplicación móvil, incorporando un dashboard de indicadores, persistencia local y un módulo de autenticación con inicio y cierre de sesión.

📱 Descripción del proyecto

CraftFlow nace como solución para un emprendimiento artesanal que gestiona sus ventas y pedidos de manera manual. La aplicación permite organizar la información comercial desde un único entorno móvil.

El sistema permite:

Gestionar clientes.

Gestionar productos.

Gestionar categorías.

Registrar y administrar pedidos.

Consultar indicadores del negocio.

Visualizar los últimos pedidos registrados.

Iniciar sesión mediante credenciales.

Cerrar sesión desde el Dashboard.

Mantener la información de negocio almacenada localmente mediante SQLite.

Trabajar sin depender de un servidor remoto para las operaciones principales.

🔐 Autenticación

CraftFlow incorpora un flujo de autenticación controlado mediante AuthContext.

Inicio de sesión

El usuario debe ingresar:

Usuario.

Contraseña.

Las credenciales configuradas actualmente en el proyecto son:

Usuario: admin
Contraseña: CraftFlow2026

Validaciones

El formulario valida:

Usuario obligatorio.

Contraseña obligatoria.

Credenciales correctas.

Si las credenciales no son válidas, se muestra una notificación mediante AppSnackbar.

Cierre de sesión

Una vez autenticado, el usuario accede al Dashboard.

En el encabezado se dispone de la opción:

Salir

Al seleccionarla se ejecuta logout() y la aplicación retorna a la pantalla de inicio de sesión.

El flujo principal es:

Inicio de sesión
       │
       ▼
Validación de credenciales
       │
       ├── Incorrectas ──► Mensaje de error
       │
       └── Correctas
              │
              ▼
          Dashboard
              │
              ▼
        Cerrar sesión
              │
              ▼
      Pantalla de Login

📊 Dashboard

El Dashboard constituye la pantalla principal después de la autenticación.

Presenta:

Total de pedidos.

Pedidos pendientes.

Ventas totales.

Productos vendidos.

Pedidos entregados.

Pedidos pendientes.

Últimos pedidos registrados.

Acciones rápidas.

Acciones rápidas

Desde el Dashboard se puede acceder directamente a:

Nuevo Pedido.

Ver Pedidos.

Clientes.

Productos.

Categorías.

Los indicadores se actualizan mediante DashboardContext y los casos de uso correspondientes.

👥 Gestión de clientes

El módulo de clientes permite administrar la información de los clientes.

Operaciones

Crear cliente.

Consultar clientes.

Consultar detalle.

Editar cliente.

Eliminar cliente.

La información contempla los datos definidos por la entidad Cliente.

📦 Gestión de productos

El módulo de productos permite administrar el catálogo comercial.

Operaciones

Crear producto.

Consultar productos.

Consultar detalle.

Editar producto.

Eliminar producto.

Los productos manejan información como:

Nombre.

Precio.

Categoría.

Los productos se relacionan con las categorías mediante categoriaId.

🗂️ Gestión de categorías

El módulo de categorías permite organizar los productos del emprendimiento.

Operaciones

Crear categoría.

Consultar categorías.

Consultar detalle.

Editar categoría.

Eliminar categoría.

🛒 Gestión de pedidos

El módulo de pedidos permite registrar y administrar las ventas realizadas.

Cada pedido maneja:

Cliente.

Producto.

Cantidad.

Precio unitario.

Total.

Estado.

Fecha.

Estados disponibles

PENDIENTE
EN_PROCESO
ENTREGADO
CANCELADO

Cálculo del pedido

El total se calcula mediante:

Total = Cantidad × Precio Unitario

El precio unitario se obtiene a partir del producto seleccionado.

Operaciones

Crear pedido.

Consultar pedidos.

Consultar detalle.

Editar pedido.

Eliminar pedido.

🗄️ Persistencia de datos

CraftFlow utiliza SQLite mediante expo-sqlite.

La base de datos se abre mediante:

craftflow.db

Las principales tablas son:

clientes
categorias
productos
pedidos

Relaciones principales

CATEGORÍAS
     │
     │ 1:N
     ▼
PRODUCTOS
     │
     │ 1:N
     ▼
PEDIDOS
     ▲
     │ N:1
     │
CLIENTES

Los pedidos relacionan:

clienteId → clientes.id

productoId → productos.id

Los productos relacionan:

categoriaId → categorias.id

🔄 Migraciones de base de datos

El proyecto incluye lógica de inicialización y actualización incremental de SQLite en:

src/database/migrations.ts

La aplicación:

Crea las tablas si no existen.

Comprueba las columnas existentes.

Agrega columnas faltantes.

Mantiene los datos existentes cuando corresponde.

Muestra en consola la estructura final de la tabla de pedidos.

Esto permite evolucionar la estructura de la base de datos sin depender exclusivamente de una recreación completa.

🏗️ Arquitectura

El proyecto utiliza una organización basada en Clean Architecture, separando responsabilidades entre dominio, infraestructura, presentación y servicios.

src/
│
├── core/
│   ├── utils/
│   └── validators/
│
├── database/
│   ├── database.ts
│   ├── migrations.ts
│   └── tables.ts
│
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
│
├── infrastructure/
│   └── database/
│       ├── ClienteSQLiteRepository.ts
│       ├── CategoriaSQLiteRepository.ts
│       ├── ProductoSQLiteRepository.ts
│       └── PedidoSQLiteRepository.ts
│
├── presentation/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── navigation/
│   ├── screens/
│   └── theme/
│
└── services/

🧠 Capa Domain

La capa domain contiene las reglas principales del negocio.

Incluye:

Entidades.

Interfaces de repositorios.

Casos de uso.

Entre los casos de uso implementados se encuentran:

Clientes

CreateCliente
GetCliente
GetClientes
UpdateCliente
DeleteCliente

Productos

CreateProducto
GetProducto
GetProductos
UpdateProducto
DeleteProducto

Categorías

CreateCategoria
GetCategoria
GetCategorias
UpdateCategoria
DeleteCategoria

Pedidos

CreatePedido
GetPedido
GetPedidos
UpdatePedido
DeletePedido
GetDashboardSummary
GetLatestPedidos
GetBusinessSummary

🏛️ Capa Infrastructure

La infraestructura implementa los contratos definidos por el dominio.

Para SQLite se encuentran:

ClienteSQLiteRepository
CategoriaSQLiteRepository
ProductoSQLiteRepository
PedidoSQLiteRepository

Estas clases encapsulan las operaciones de persistencia.

🖥️ Capa Presentation

La capa de presentación contiene la interfaz y la interacción con el usuario.

Incluye:

components/
context/
hooks/
navigation/
screens/
theme/

Contextos principales

AuthContext
DashboardContext
PedidoContext
ClienteContext
ProductoContext
CategoriaContext

AuthContext administra:

Usuario autenticado.

Estado de autenticación.

Estado de carga.

Inicio de sesión.

Cierre de sesión.

Los demás contextos gestionan el estado y operaciones de cada módulo.

🧭 Navegación

La navegación utiliza:

@react-navigation/native

@react-navigation/native-stack

El RootNavigator controla el acceso principal:

                    RootNavigator
                         │
                ¿Autenticado?
                   /          \
                 NO            SÍ
                 │              │
                 ▼              ▼
             LoginScreen    AppNavigator
                                │
                                ▼
                              Home
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
           Pedidos           Clientes          Productos
              │                                   │
              ▼                                   ▼
          Categorías                         Detalles/CRUD

🧩 Componentes reutilizables

El proyecto dispone de componentes comunes para mantener consistencia visual y reducir duplicación.

Entre ellos:

AppButton
AppInput
AppSelect
AppText
AppCard
AppHeader
AppSnackbar
LoadingOverlay
Loader
MoneyCard
ConfirmDialog
EmptyState

También existen componentes específicos para:

ClienteCard
ClienteForm

ProductoCard
ProductoForm

CategoriaCard
CategoriaForm

PedidoCard
PedidoForm

🎨 Sistema de diseño

La interfaz utiliza un Theme centralizado ubicado en:

src/presentation/theme

Se manejan elementos como:

Colors
Spacing
Radius
Typography
Shadows

Esto permite mantener una identidad visual consistente entre las pantallas.

🛠️ Tecnologías utilizadas

Tecnología

Uso

React Native

Desarrollo de la aplicación móvil

Expo SDK 54

Plataforma de desarrollo y ejecución

TypeScript

Tipado estático

SQLite

Persistencia local

expo-sqlite

Integración de SQLite

React Navigation

Navegación

Context API

Gestión de estado

useState / useEffect

Estado y ciclo de vida

Expo Vector Icons

Iconografía

Safe Area Context

Adaptación a áreas seguras

React Native Picker

Selectores

Snackbar

Notificaciones

Clean Architecture

Organización arquitectónica

Versiones principales del proyecto:

Expo: ~54.0.35
React: 19.1.0
React Native: 0.81.5
TypeScript: ~5.9.2

📂 Estructura del proyecto

CraftFlow/
│
├── assets/
│
├── src/
│   ├── core/
│   │   ├── utils/
│   │   └── validators/
│   │
│   ├── database/
│   │   ├── database.ts
│   │   ├── migrations.ts
│   │   └── tables.ts
│   │
│   ├── domain/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── usecases/
│   │
│   ├── infrastructure/
│   │   └── database/
│   │
│   ├── presentation/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── navigation/
│   │   ├── screens/
│   │   └── theme/
│   │
│   └── services/
│
├── App.tsx
├── app.json
├── babel.config.js
├── metro.config.js
├── package.json
├── package-lock.json
└── tsconfig.json

⚙️ Requisitos

Antes de ejecutar el proyecto se requiere tener instalado:

Node.js.

npm.

Expo CLI mediante el proyecto Expo.

Android Studio para ejecutar un emulador Android, o un dispositivo compatible.

Git para gestionar el repositorio.

🚀 Instalación

1. Clonar el repositorio

git clone https://github.com/santiman0408-sudo/CraftFlow.git

Ingresar al proyecto:

cd CraftFlow

2. Instalar dependencias

npm install

3. Ejecutar Expo

npx expo start

Android

npx expo start --android

iOS

npx expo start --ios

Web

npx expo start --web

🧪 Verificación TypeScript

Para comprobar que el proyecto no presenta errores de compilación TypeScript:

npx tsc --noEmit

El proyecto fue verificado durante el desarrollo mediante este comando.

📱 Flujo de uso

1. Abrir CraftFlow
        │
        ▼
2. Iniciar sesión
        │
        ▼
3. Dashboard
        │
        ├── Nuevo Pedido
        ├── Ver Pedidos
        ├── Clientes
        ├── Productos
        └── Categorías
        │
        ▼
4. Gestionar información
        │
        ▼
5. Consultar indicadores
        │
        ▼
6. Cerrar sesión
        │
        ▼
7. Volver al Login

📷 Capturas de pantalla

Nota: el proyecto analizado contiene los recursos principales de la aplicación, pero el ZIP proporcionado no incluye una carpeta assets/screenshots/. Cuando se agreguen las capturas reales al repositorio, utilizar estas rutas.

🔐 Inicio de sesión



📊 Dashboard



👥 Clientes



📦 Productos



🗂️ Categorías



🛒 Pedidos



📌 Estado del proyecto

Versión: 1.0.0
Estado: Proyecto funcional

Funcionalidades implementadas:

Autenticación

Inicio de sesión

Cierre de sesión

Dashboard

CRUD de clientes

CRUD de productos

CRUD de categorías

CRUD de pedidos

Persistencia SQLite

Indicadores del negocio

Últimos pedidos

Validaciones

Snackbar de notificaciones

Confirmaciones

Componentes reutilizables

Arquitectura organizada por capas

🔒 Consideraciones de seguridad

La autenticación incluida actualmente es de carácter local y académico.

Las credenciales se encuentran definidas directamente en AuthContext.tsx:

Usuario: admin
Contraseña: CraftFlow2026

Para un entorno productivo se recomienda reemplazar este mecanismo por una autenticación segura con backend, almacenamiento seguro de credenciales, gestión de sesiones y políticas de autorización.

🌐 Funcionamiento offline

Las operaciones principales de gestión de clientes, productos, categorías y pedidos utilizan SQLite local.

Por esta razón, el funcionamiento de los módulos de negocio no depende de una API remota.

Aplicación móvil
      │
      ▼
Context API
      │
      ▼
Casos de uso
      │
      ▼
Repositorios SQLite
      │
      ▼
craftflow.db

👨‍💻 Autores

Adrian Daniel Santisteban Manrique

Maria Alejandra Siri Vergara

Jean Paul Villasante Contreras

Instituto IDAT

Carrera: Desarrollo de Sistemas Front-end y Back-end

Curso: Desarrollo de Aplicaciones Móviles 1

📄 Licencia

Proyecto desarrollado con fines académicos.


---

# Extensiones incorporadas: API REST y APK

## API REST

Se incorporó una API REST independiente en `api/`. Su objetivo es añadir una capa backend sin modificar el contenido funcional de la aplicación móvil existente.

Recursos disponibles: autenticación, clientes, productos, categorías, pedidos, dashboard y health check.

La aplicación móvil conserva SQLite como persistencia principal. La API utiliza `api/data/craftflow.json` de forma independiente, por lo que no sobrescribe ni transforma `craftflow.db`.

También se añadió un cliente HTTP reutilizable en `src/services/api/api.client.ts` y su configuración en `src/services/api/api.config.ts`. Estos módulos quedan disponibles para una integración progresiva y no reemplazan el flujo SQLite actual.

## APK Android

Se añadió `eas.json` con un perfil `preview` configurado para generar un APK Android instalable.

Windows:

```bash
build-apk.bat
```

macOS/Linux:

```bash
./build-apk.sh
```

O:

```bash
npx eas-cli@latest build --platform android --profile preview
```

La configuración conserva el package Android `com.craftflow.app`, Expo SDK 54, React Native 0.81.5, SQLite, iconos, splash, orientación y las pantallas originales.

**Nota:** el APK binario no puede generarse dentro de este entorno porque el proyecto no dispone de Android SDK/EAS autenticado. El ZIP queda preparado para producirlo mediante EAS Build sin modificar el contenido de la aplicación.


## API REST complementaria

CraftFlow incorpora una API REST Node.js/HTTP independiente en `api/`. SQLite continúa siendo la persistencia principal de la aplicación móvil. Al iniciar y después de operaciones CRUD, CraftFlow sincroniza una copia de los datos locales mediante `POST /api/sync`, sin modificar las pantallas ni el flujo de usuario.

Para el emulador Android, la configuración actual utiliza `http://10.0.2.2:3000/api`. Para un dispositivo físico, reemplazar `10.0.2.2` por la IP local del equipo que ejecuta la API.
