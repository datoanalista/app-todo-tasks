-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS todo_db;
USE todo_db;

-- Crear la tabla tasks
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar algunas tareas de ejemplo
INSERT INTO tasks (title, completed, created_at) VALUES
('Tarea de ejemplo 1', FALSE, NOW()),
('Tarea de ejemplo 2', TRUE, NOW()),
('Tarea de ejemplo 3', FALSE, NOW());

