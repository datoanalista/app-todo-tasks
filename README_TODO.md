# 📝 Aplicación de Lista de Tareas - CodeIgniter 4

Una aplicación web completa y monolítica para gestionar una lista de tareas (to-do list) construida con CodeIgniter 4.

## 🚀 Características

- **Backend API completo** con operaciones CRUD para tareas
- **Frontend moderno** con interfaz de usuario intuitiva
- **Base de datos MySQL** para persistencia de datos
- **Arquitectura monolítica** - todo en una sola base de código
- **Responsive design** que funciona en dispositivos móviles y de escritorio

## 🛠️ Tecnologías Utilizadas

- **Backend**: PHP 8.0+, CodeIgniter 4.6.3
- **Base de Datos**: MySQL 5.7+
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: RESTful endpoints con respuestas JSON
- **Estilos**: CSS personalizado con gradientes y animaciones

## 📋 Requisitos del Sistema

- PHP 8.0 o superior
- MySQL 5.7 o superior
- Extensión PHP MySQLi habilitada
- Servidor web (Apache/Nginx) o servidor de desarrollo integrado

## 🚀 Instalación y Configuración

### 1. Clonar o descargar el proyecto
```bash
git clone <url-del-repositorio>
cd todo-app
```

### 2. Instalar dependencias
```bash
composer install
```

### 3. Configurar la base de datos
Editar el archivo `app/Config/Database.php` con tus credenciales de MySQL:

```php
public array $default = [
    'hostname' => 'localhost',
    'username' => 'tu_usuario',
    'password' => 'tu_contraseña',
    'database' => 'ci4',
    'DBDriver' => 'MySQLi',
    // ... otras configuraciones
];
```

### 4. Crear la base de datos y tabla
La aplicación incluye una migración automática que se ejecutará al acceder por primera vez, o puedes ejecutar manualmente:

```bash
php spark migrate
```

### 5. Iniciar el servidor de desarrollo
```bash
php spark serve
```

La aplicación estará disponible en: `http://localhost:8080`

## 🗄️ Estructura de la Base de Datos

### Tabla: `tasks`
```sql
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

### Obtener todas las tareas
```
GET /tasks
```

### Obtener una tarea específica
```
GET /tasks/{id}
```

### Crear una nueva tarea
```
POST /tasks
Content-Type: application/json

{
    "title": "Nueva tarea"
}
```

### Actualizar una tarea
```
PUT /tasks/{id}
Content-Type: application/json

{
    "title": "Título actualizado",
    "completed": true
}
```

### Eliminar una tarea
```
DELETE /tasks/{id}
```

## 🎨 Funcionalidades del Frontend

### ✅ Gestión de Tareas
- **Agregar tareas**: Formulario simple con validación
- **Editar tareas**: Click en editar para modificar el título
- **Marcar como completada**: Checkbox para cambiar el estado
- **Eliminar tareas**: Botón de eliminación con confirmación

### 🎯 Características de UX
- **Interfaz intuitiva**: Diseño limpio y moderno
- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Feedback visual**: Alertas de éxito y error
- **Validación en tiempo real**: Verificación de entrada del usuario
- **Animaciones suaves**: Transiciones y efectos visuales

### 🔄 Interacciones AJAX
- Todas las operaciones se realizan sin recargar la página
- Actualización automática de la lista de tareas
- Manejo de errores con mensajes informativos

## 📁 Estructura del Proyecto

```
todo-app/
├── app/
│   ├── Config/
│   │   ├── Database.php      # Configuración de base de datos
│   │   └── Routes.php        # Definición de rutas
│   ├── Controllers/
│   │   ├── Tasks.php         # Controlador API para tareas
│   │   └── TodoApp.php       # Controlador para la interfaz web
│   ├── Models/
│   │   └── TaskModel.php     # Modelo para operaciones de base de datos
│   ├── Views/
│   │   └── todo_app.php      # Vista principal de la aplicación
│   └── Database/
│       └── Migrations/       # Migraciones de base de datos
├── public/                    # Archivos públicos (CSS, JS, imágenes)
├── writable/                  # Archivos de escritura (logs, cache)
└── vendor/                    # Dependencias de Composer
```

## 🧪 Pruebas

### Probar la API
Puedes usar herramientas como Postman, Insomnia o curl para probar los endpoints:

```bash
# Obtener todas las tareas
curl http://localhost:8080/tasks

# Crear una nueva tarea
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Mi primera tarea"}'

# Actualizar una tarea
curl -X PUT http://localhost:8080/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Eliminar una tarea
curl -X DELETE http://localhost:8080/tasks/1
```

## 🚀 Despliegue en Producción

### Configuración del Servidor Web
1. Configurar el servidor web para apuntar al directorio `public/`
2. Asegurar que el directorio `writable/` tenga permisos de escritura
3. Configurar variables de entorno para producción

### Optimizaciones Recomendadas
- Habilitar caché de CodeIgniter
- Configurar compresión gzip
- Optimizar consultas de base de datos
- Minificar CSS y JavaScript

## 🐛 Solución de Problemas

### Error de Conexión a Base de Datos
- Verificar que MySQL esté ejecutándose
- Confirmar credenciales en `Database.php`
- Verificar que la base de datos `ci4` exista

### Error de Permisos
- Asegurar que el directorio `writable/` tenga permisos 755
- Verificar permisos del usuario del servidor web

### Problemas de Rutas
- Verificar configuración de `.htaccess`
- Confirmar que mod_rewrite esté habilitado en Apache

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor:
1. Revisa la documentación de CodeIgniter 4
2. Busca en los issues existentes
3. Abre un nuevo issue con detalles del problema

---

**¡Disfruta gestionando tus tareas de manera eficiente!** 🎉


