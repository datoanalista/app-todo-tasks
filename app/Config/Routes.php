<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// Ruta principal de la aplicación de tareas
$routes->get('/', 'TodoApp::index');

// Rutas de la API de tareas
$routes->group('tasks', function($routes) {
    $routes->get('/', 'Tasks::index');           // GET /tasks
    $routes->get('(:num)', 'Tasks::show/$1');    // GET /tasks/{id}
    $routes->post('/', 'Tasks::create');         // POST /tasks
    $routes->put('(:num)', 'Tasks::update/$1');  // PUT /tasks/{id}
    $routes->delete('(:num)', 'Tasks::delete/$1'); // DELETE /tasks/{id}
});

// Ruta de respaldo para la página de bienvenida
$routes->get('welcome', 'Home::index');
