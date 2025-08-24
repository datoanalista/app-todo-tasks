<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Aplicación de gestión de tareas desarrollada con CodeIgniter 4">
    <meta name="author" content="Todo App Team">
    <title>Lista de Tareas - CodeIgniter</title>
    <link rel="preload" href="<?= base_url() ?>assets/css/todo-app.css" as="style">
    <link rel="preload" href="<?= base_url() ?>assets/js/todo-app.js" as="script">
    <link rel="stylesheet" href="<?= base_url() ?>assets/css/todo-app.css">
    <link rel="icon" href="<?= base_url() ?>favicon.ico" type="image/x-icon">
</head>
<body>
    <a href="#main-content" class="sr-only">Saltar al contenido principal</a>
    <div class="container">
        <header class="header" role="banner">
            <div class="theme-toggle">
                <button id="theme-toggle" class="theme-btn" title="Cambiar tema">🌙</button>
            </div>
            <h1><span class="title-icon">✓</span> Lista de Tareas</h1>
            <p>Gestiona tus tareas de manera eficiente.</p>
        </header>

        <main class="content" id="main-content" role="main">
            <section aria-labelledby="add-task-heading">
                <h2 id="add-task-heading" class="sr-only">Agregar nueva tarea</h2>
                <form class="add-task-form" role="form" aria-label="Formulario para agregar nueva tarea">
                    <label for="newTaskInput" class="sr-only">Título de la nueva tarea</label>
                    <input type="text" 
                           id="newTaskInput" 
                           placeholder="Escribe una nueva tarea..." 
                           maxlength="255"
                           aria-describedby="task-input-help"
                           required>
                    <div id="task-input-help" class="sr-only">Máximo 255 caracteres. Presiona Enter o click en Agregar para crear la tarea.</div>
                    <button type="submit" 
                            aria-describedby="add-button-help">
                        Agregar Tarea
                    </button>
                    <div id="add-button-help" class="sr-only">Ctrl+Enter como atajo de teclado</div>
                </form>
            </section>

            <div id="alertContainer" 
                 role="region" 
                 aria-live="polite" 
                 aria-label="Notificaciones">
            </div>

            <section aria-labelledby="tasks-heading">
                <h2 id="tasks-heading" class="sr-only">Lista de tareas</h2>
                <div class="tasks-container" 
                     id="tasksContainer" 
                     role="list" 
                     aria-label="Tareas disponibles">
                    <div class="loading" role="status" aria-live="polite">
                        <div class="spinner" aria-hidden="true"></div>
                    <p>Cargando tareas...</p>
                </div>
            </div>
            </section>
        </main>
    </div>

    <div class="modal-overlay" 
         id="deleteModal" 
         role="dialog" 
         aria-modal="true" 
         aria-labelledby="modal-title" 
         aria-describedby="modal-description">
        <div class="modal">
            <div class="modal-header">
                <div class="modal-title" id="modal-title">🗑️ Eliminar Tarea</div>
                <div class="modal-message" id="modal-description">
                    ¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.
                </div>
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-cancel" 
                        onclick="closeDeleteModal()"
                        type="button">
                    Cancelar
                </button>
                <button class="modal-btn modal-btn-confirm" 
                        onclick="confirmDelete()"
                        type="button">
                    Eliminar
                </button>
            </div>
        </div>
    </div>

    <script>
        const API_BASE_URL = '<?= base_url() ?>tasks';
    </script>
    <script src="<?= base_url() ?>assets/js/todo-app.js" defer></script>
</body>
</html>