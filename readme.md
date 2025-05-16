

# PianoWorld E-commerce Platform 🎹

PianoWorld es una plataforma de comercio electrónico full-stack diseñada para la venta de pianos y teclados. Este proyecto demuestra la integración de un frontend moderno construido con React (TypeScript) y un backend robusto desarrollado con Laravel (PHP), junto con una base de datos PostgreSQL.

**Enlaces de la Aplicación Desplegada:**
*   **Frontend (Vercel):** [pianoworld](https://piano-world.vercel.app/) *(Reemplaza con tu URL real)*

## 🌟 Características Principales

*   **Catálogo de Productos:** Visualización de pianos con detalles, imágenes y precios.
*   **Carrito de Compras:** Funcionalidad para agregar, modificar cantidad y eliminar pianos del carrito (persistencia con localStorage).
*   **Autenticación de Usuarios:** Registro e inicio de sesión seguros utilizando Laravel Sanctum (autenticación basada en tokens).
*   **Cuenta de Usuario:** Panel donde los usuarios pueden ver su información y el historial de pedidos realizados.
*   **Proceso de Pedido:** Simulación de la creación de un pedido desde el carrito.
*   **Interfaz Moderna:** Diseño atractivo y responsivo utilizando Material-UI y Tailwind CSS.

## 🛠️ Stack Tecnológico

Este proyecto está dividido en dos componentes principales:

### Frontend (`./frontend/`)
*   **Framework/Librería:** React  con TypeScript
*   **Herramienta de Build:** Vite
*   **Enrutamiento:** React Router
*   **Gestión de Estado:** React Context API
*   **UI:** Material-UI  y Tailwind CSS
*   **Peticiones HTTP:** Axios

### Backend (`./backend/`)
*   **Framework:** Laravel - PHP
*   **Base de Datos:** PostgreSQL
*   **Autenticación:** Laravel Sanctum (para API tokens)
*   **Gestión de Dependencias:** Composer

## 🚀 Configuración y Despliegue

### Prerrequisitos
*   Node.js 
*   npm o yarn
*   PHP 
*   Composer
*   PostgreSQL (para desarrollo local del backend)
*   Git

### Configuración Local

**1. Clonar el Repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/jesus2332-piano-world.git
   cd jesus2332-piano-world
   ```

**2. Configurar el Backend (`./backend/`):**
   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   # Configura tus variables de entorno en .env para la base de datos local PostgreSQL:
   # DB_CONNECTION=pgsql
   # DB_HOST=127.0.0.1
   # DB_PORT=5432
   # DB_DATABASE=piano_world_db_local
   # DB_USERNAME=tu_usuario_pg
   # DB_PASSWORD=tu_contraseña_pg
   php artisan migrate --seed # Crea las tablas y siembra datos iniciales
   php artisan serve # Inicia el servidor de Laravel (generalmente en http://localhost:8000)
   ```
   *Asegúrate de tener un servidor PostgreSQL corriendo localmente y haber creado la base de datos `piano_world_db_local` (o el nombre que elijas).*

**3. Configurar el Frontend (`./frontend/`):**
   ```bash
   cd ../frontend # Vuelve a la raíz y entra a frontend
   npm install # o yarn install
   # Crea un archivo .env en la raíz de frontend/ con la URL de tu API backend local:
   # VITE_API_URL=http://localhost:8000/api
   npm run dev # Inicia el servidor de desarrollo de Vite (generalmente en http://localhost:5173)
   ```

Ahora deberías poder acceder al frontend en `http://localhost:5173` y este se comunicará con el backend en `http://localhost:8000`.

### Despliegue

*   **Frontend:** Desplegado en **Vercel**. Vercel se conecta al repositorio Git y construye/despliega la aplicación desde la carpeta `frontend/` automáticamente en cada push a la rama principal. La variable de entorno `VITE_API_URL` se configura en Vercel para apuntar a la URL de la API desplegada.
*   **Backend & Base de Datos:** Desplegado en **Railway**. Railway se conecta al repositorio Git y despliega la aplicación Laravel desde la carpeta `backend/`. La base de datos PostgreSQL también está alojada en Railway. Las variables de entorno (credenciales de la base de datos, `APP_KEY`, `FRONTEND_URL`, etc.) se configuran en Railway. 

## 🖼️ Estructura del Proyecto

```
.
├── backend/        # Proyecto Laravel (PHP)
│   ├── app/
│   ├── config/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   ├── ...
│   └── composer.json
├── frontend/       # Proyecto React (TypeScript + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── vite.config.ts
│   └── package.json
└── README.md       # Este archivo
```

