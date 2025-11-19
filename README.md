# Prueba Técnica Fullstack - Sistema de Gestión de Pedidos

Solución implementada con arquitectura de Microservicios, Dockerizada y separada en Backend y Frontend.

## 📂 Estructura del Proyecto
* **Backend-microservicios/**: Contiene la orquestación de Docker, la API de .NET (Auth) y la API de PHP (Negocio).
* **Front/**: Contiene el código fuente de la aplicación Angular 17.

## 🚀 Tecnologías
* **Frontend:** Angular 17 (Standalone Components, Material UI).
* **Backend Auth:** .NET 8 (Identity, JWT).
* **Backend Core:** PHP 8.2 (Laravel).
* **Base de Datos:** SQL Server 2022 (Dockerizado).
* **Infraestructura:** Docker & Docker Compose.

## 🛠️ Instrucciones de Ejecución

Todo el entorno se levanta con Docker Compose.

1. **Clonar el repositorio.**
2. **Navegar a la carpeta del backend:**
   Debes entrar a la carpeta donde está el archivo `docker-compose.yml`:
   ```bash
   cd Backend-microservicios
