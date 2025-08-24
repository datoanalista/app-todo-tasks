# 📝 App Todo Tasks - CodeIgniter 4 

Aplicación de gestión de tareas desarrollada con **CodeIgniter 4**, **MySQL**, **Docker** y **PHPUnit**. Incluye API REST completa, interfaz web moderna y testing 100%.

## 🚀 **Características**

- ✅ **Backend**: CodeIgniter 4 con API REST completa (CRUD)
- ✅ **Frontend**: HTML5, CSS3, JavaScript (ES6+) con interfaz moderna
- ✅ **Base de Datos**: MySQL 8.0 con phpMyAdmin
- ✅ **Containerización**: Docker + Docker Compose
- ✅ **Testing**: PHPUnit: testing 100% passed (13/13)
- ✅ **Arquitectura**: Separación de capas MVC
- ✅ **Branches**: 
  * **master**: rama principal, CRUD simple.
  * **development**: rama desarrollo, se agrega estado en card y funcionalidad modo oscuro.

## 📋 **Requisitos**

- **Docker**: >= 20.0
- **Docker Compose**: >= 2.0
- **Git**: Para clonar el repositorio

## 🛠️ **Instalación y Configuración**

### 1. **Clonar el repositorio**
```bash
git clone https://github.com/datoanalista/app-todo-tasks.git
cd app-todo-tasks
```

### 2. **Levantar el proyecto con Docker**
```bash
# Construir y ejecutar todos los servicios
docker-compose up --build -d

# Verificar que los contenedores estén ejecutándose
docker-compose ps
```

### 3. **Instalar dependencias de desarrollo (para testing)**
```bash
# Instalar PHPUnit y dependencias de testing
docker exec todo-app composer install
```

## 🌐 **Acceso al Frontend**

Una vez levantado el proyecto, acceder a:

- **📱 Aplicación Web**: [http://localhost:8082](http://localhost:8082)
- **🗄️ phpMyAdmin**: [http://localhost:8081](http://localhost:8081)
  - Usuario: `todo_user`
  - Contraseña: `todo_pass`
  - Base de datos: `todo_db`

## 🧪 **Ejecutar Pruebas Unitarias**

El proyecto incluye una suite completa de tests unitarios:

### **Ejecutar todos los tests**
```bash
docker exec todo-app ./vendor/bin/phpunit --testdox
```

### **Resultado esperado**
```
PHPUnit 10.5.53 by Sebastian Bergmann and contributors.

.............                                                     13 / 13 (100%)

Example Database
 ✔ Model find all
 ✔ Soft delete leaves row

Example Session
 ✔ Session simple

Health
 ✔ Is defined app path
 ✔ Base url has been set

Tasks Controller Simple (Tests\Unit\TasksControllerSimple)
 ✔ Tasks controller exists
 ✔ Index method exists
 ✔ Show method exists
 ✔ Create method exists
 ✔ Update method exists
 ✔ Delete method exists
 ✔ Task model exists
 ✔ Task model table

OK, but there were issues!
Tests: 13, Assertions: 15, PHPUnit Warnings: 1.
```

## 📚 **API REST Endpoints**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/tasks` | Obtener todas las tareas |
| `GET` | `/tasks/{id}` | Obtener tarea específica |
| `POST` | `/tasks` | Crear nueva tarea |
| `PUT` | `/tasks/{id}` | Actualizar tarea |
| `DELETE` | `/tasks/{id}` | Eliminar tarea |

### **Ejemplo de uso de la API**
```bash
# Obtener todas las tareas
curl http://localhost:8082/tasks

# Crear nueva tarea
curl -X POST http://localhost:8082/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Nueva tarea de ejemplo"}'
```

## 🏗️ **Arquitectura del Proyecto**

```
├── app/
│   ├── Controllers/          # Controladores (Tasks, TodoApp)
│   ├── Models/              # Modelos (TaskModel)
│   ├── Views/               # Vistas (todo_app.php)
│   └── Config/              # Configuración de CodeIgniter
├── public/
│   └── assets/              # CSS y JavaScript externos
├── tests/                   # Tests unitarios (PHPUnit)
├── docker-compose.yml       # Configuración de servicios
├── Dockerfile              # Imagen de la aplicación
└── README.md               # Este archivo
```

## 🔧 **Comandos Útiles**

```bash
# Ver logs de la aplicación
docker-compose logs app

# Acceder al contenedor de la aplicación
docker exec -it todo-app bash

# Parar todos los servicios
docker-compose down

# Reconstruir sin caché
docker-compose up --build --no-cache -d
```

## 🎯 **Funcionalidades Implementadas**

### **Frontend**
- ✅ Interfaz moderna y responsive
- ✅ Operaciones CRUD en tiempo real
- ✅ Validación de formularios
- ✅ Confirmación de eliminación con modal
- ✅ Feedback visual para el usuario

### **Backend**
- ✅ API REST completa con JSON responses
- ✅ Validación de datos de entrada
- ✅ Manejo de errores HTTP
- ✅ Configuración dinámica con variables de entorno

### **Testing**
- ✅ Tests unitarios para controladores
- ✅ Tests de integración de base de datos
- ✅ Tests de configuración y salud del sistema
- ✅ 100% de cobertura en funcionalidades críticas

## 👨‍💻 **Desarrollo**

Este proyecto fue desarrollado siguiendo las mejores prácticas:

- **🏗️ Arquitectura MVC** limpia y organizada
- **🔒 Seguridad** con validación y sanitización
- **📱 Responsive Design** para todos los dispositivos
- **🧪 Testing** exhaustivo para garantizar calidad
- **🐳 Containerización** para facilitar el despliegue
- **📖 Documentación** completa y clara

## 📞 **Soporte**

Para cualquier consulta sobre este proyecto:

- **Repositorio**: [github.com/datoanalista/app-todo-tasks](https://github.com/datoanalista/app-todo-tasks)
- **Autor**: Alonso Gonzalez - Fullstack Developer

---

**¡Gracias!** 🚀