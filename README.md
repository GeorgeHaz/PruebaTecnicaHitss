# Prueba Técnica Fullstack - Sistema de Gestión de Pedidos

Solución implementada con arquitectura de Microservicios, Dockerizada y separada en Backend y Frontend.

## 📂 Estructura del Proyecto
* **Backend-microservicios/**: Contiene la orquestación de Docker, la API de .NET (Auth) y la API de PHP (Negocio).
* **Front/**: Contiene el código fuente de la aplicación Angular 17.

## 🚀 Tecnologías
* **Frontend:** Angular 17 (Standalone Components, Material UI, SWEET ALERT).
* **Backend Auth:** .NET 8 (Identity, JWT, SWAGGER).
* **Backend Core:** PHP 8.2 (Laravel, SWAGGER).
* **Base de Datos:** SQL Server 2022 (Dockerizado).
* **Infraestructura:** Docker & Docker Compose.
* **Control de versiones:** Git, GitHub.

## 🛠️ Instrucciones de Ejecución

Para el entorno de .Net
1. **Se uso identity, en caso de algun fallo, se debe instalar el nugget.**
2. **Adicional debemos instalar nugget como Core, JwtBearer, Design, SQLSERVER Y TOOLS.**

Para el entorno de PHP.
1. **Se debe validar descargar los driver para sql server, y habilitar el mismo en el archivo init de php.**
2. **Se debe tener instalado el composer, laravel, php.**

Para el front Angular:
1. **Se uso el 17, se deben instalar los modulos.**
2. **Adicionalmente instalar el modulo de ng2-charts, en caso de que no se instale por defecto.**

Todo el entorno se levanta con Docker Compose.

1. **Para la ejecucion.**
2. **Clonar el repositorio.**
3. **Navegar a la carpeta del backend:**
   Debes entrar a la carpeta donde está el archivo `docker-compose.yml`:
4. **Tener en cuenta las conexiones IP de los microservicios, en caso de ejecutarlos localmente, elilminar la ip y colocar `localhost`, tambien la autenticacion en caso de no usar, esto se debe hacer para los 2 microservicios creados.**
5. **Para construir en el docker debemos usar el siguiente comando `docker-compose up --build -d`**
6. **Una vez construido las imagenes y container de docker debemos ejecutar la base de datos**
7. **Para PHP con el siguiente comando `docker exec -it php_app_container php artisan migrate`**
8. **Para .Net con el siguiente comando `docker exec -it dotnet_api_container dotnet POS.Api.dll --migrate`**
    En caso de que .Net presente error, se debe realizar el update-Migrate desde .Net directamente con el siguiente comando:
   `$env:ConnectionStrings__DefaultConnection = "Server=localhost,1444;Database=PruebaPos;User Id=sa;Password=ESPIrilo897;TrustServerCertificate=True;"`
   Luego ya ejecutar el siguiente comando:
   `Update-Database`.
9. **Tambien se realizaron pruebas en postman o parte de ellas, se lo puede descargar del archivo en la raiz del respositorio llamado PruebasPostman.json.**
10. **Tener en consideracion las versiones del pdf entregado a mi, ya que se usan exactamente lo mismo.**
   
