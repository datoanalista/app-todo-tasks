/**
 * Todo App - Aplicación de Gestión de Tareas
 * Arquitectura modular con clases ES6
 * Version: 2.0 - Optimizada y refactorizada
 */

'use strict';

/**
 * Clase principal para manejar la aplicación de tareas
 */
class TodoApp {
    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl;
        this.tasks = [];
        this.taskToDelete = null;
        this.isLoading = false;
        
        // Elementos DOM
        this.elements = {
            tasksContainer: null,
            newTaskInput: null,
            addTaskForm: null,
            deleteModal: null,
            alertContainer: null
        };
        
        this.init();
    }

    /**
     * Inicializar la aplicación
     */
    init() {
        this.initializeElements();
        this.attachEventListeners();
        this.loadTasks();
    }

    /**
     * Inicializar referencias a elementos DOM
     */
    initializeElements() {
        this.elements.tasksContainer = document.getElementById('tasksContainer');
        this.elements.newTaskInput = document.getElementById('newTaskInput');
        this.elements.addTaskForm = document.querySelector('.add-task-form');
        this.elements.deleteModal = document.getElementById('deleteModal');
        this.elements.alertContainer = document.getElementById('alertContainer');

        if (!this.elements.tasksContainer || !this.elements.newTaskInput || !this.elements.addTaskForm) {
            console.error('Elementos DOM críticos no encontrados');
            return;
        }
    }

    /**
     * Configurar event listeners
     */
    attachEventListeners() {
        // Formulario de nueva tarea
        this.elements.addTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.createTask();
        });

        // Enter en input
        this.elements.newTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.createTask();
            }
        });

        // Esc para cerrar modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.deleteModal.classList.contains('active')) {
                this.closeDeleteModal();
            }
        });

        // Click fuera del modal para cerrar
        this.elements.deleteModal.addEventListener('click', (e) => {
            if (e.target === this.elements.deleteModal) {
                this.closeDeleteModal();
            }
        });
    }

    /**
     * Cargar todas las tareas desde la API
     */
    async loadTasks() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();

        try {
            const response = await fetch(this.apiBaseUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.status === 'success') {
                this.tasks = data.data || [];
                this.renderTasks();
            } else {
                throw new Error(data.message || 'Error desconocido al cargar tareas');
            }

        } catch (error) {
            console.error('Error al cargar tareas:', error);
            this.showError('Error al cargar las tareas', 'Intenta recargar la página');
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Crear nueva tarea
     */
    async createTask() {
        const title = this.elements.newTaskInput.value.trim();
        
        if (!title) {
            this.showAlert('Por favor, escribe el título de la tarea', 'error');
            return;
        }

        if (title.length > 255) {
            this.showAlert('El título no puede exceder 255 caracteres', 'error');
            return;
        }

        try {
            const response = await fetch(this.apiBaseUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.status === 'success') {
                this.elements.newTaskInput.value = '';
                this.showAlert('Tarea creada exitosamente', 'success');
                await this.loadTasks();
            } else {
                throw new Error(data.message || 'Error al crear la tarea');
            }

        } catch (error) {
            console.error('Error al crear tarea:', error);
            this.showAlert('Error al crear la tarea', 'error');
        }
    }

    /**
     * Editar tarea inline
     */
    editTask(taskId) {
        const task = this.tasks.find(t => t.id == taskId);
        if (!task) return;

        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        const titleElement = taskElement.querySelector('.task-title');
        
        // Crear input de edición
        const originalTitle = task.title;
                titleElement.innerHTML = `
            <input type="text" 
                   class="edit-input"
                   value="${this.escapeHtml(originalTitle)}" 
                   maxlength="255"
                   onkeypress="if(event.key==='Enter') todoApp.saveEdit(${taskId}, this.value)"
                   style="background: white; color: #333; border: 1px solid #ddd; border-radius: 4px; padding: 5px; width: 100%;">
        `;
        
        // Focus y seleccionar texto
        const input = titleElement.querySelector('.edit-input');
        input.focus();
        input.select();
        
        // Cambiar botones
        const actionsDiv = taskElement.querySelector('.task-actions');
        actionsDiv.innerHTML = `
            <button class="save-btn" 
                    onclick="todoApp.saveEditFromInput(${taskId})"
                    title="Guardar cambios">
                💾
            </button>
            <button class="cancel-btn" 
                    onclick="todoApp.cancelEdit(${taskId}, '${this.escapeHtml(originalTitle)}')"
                    title="Cancelar edición">
                ❌
            </button>
        `;
    }

    /**
     * Guardar edición desde el input (función auxiliar)
     */
    saveEditFromInput(taskId) {
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        const input = taskElement.querySelector('.edit-input');
        if (input) {
            this.saveEdit(taskId, input.value);
        }
    }

    /**
     * Guardar edición de tarea
     */
    async saveEdit(taskId, newTitle) {
        const task = this.tasks.find(t => t.id == taskId);
        if (!task) return;

        const title = newTitle.trim();
        if (!title) {
            this.showAlert('El título no puede estar vacío', 'error');
            return;
        }

        if (title.length > 255) {
            this.showAlert('El título no puede exceder 255 caracteres', 'error');
            return;
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    title: title,
                    completed: task.completed 
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.status === 'success') {
                task.title = title;
                this.renderTasks();
                this.showAlert('Tarea actualizada exitosamente', 'success');
            } else {
                throw new Error(data.message || 'Error al actualizar la tarea');
            }

        } catch (error) {
            console.error('Error al actualizar tarea:', error);
            this.showAlert('Error al actualizar la tarea', 'error');
            this.renderTasks(); // Restaurar vista original
        }
    }

    /**
     * Cancelar edición de tarea
     */
    cancelEdit(taskId, originalTitle) {
        this.renderTasks(); // Simplemente re-renderizar para restaurar
    }

    /**
     * Alternar estado completado de una tarea
     */
    async toggleTask(taskId) {
        const task = this.tasks.find(t => t.id == taskId);
        if (!task) return;

        const newCompletedStatus = task.completed == 1 ? 0 : 1;

        try {
            const response = await fetch(`${this.apiBaseUrl}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    title: task.title,
                    completed: newCompletedStatus 
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.status === 'success') {
                task.completed = newCompletedStatus;
                this.renderTasks();
                this.showAlert(
                    newCompletedStatus == 1 ? 'Tarea completada' : 'Tarea marcada como pendiente', 
                    'success'
                );
            } else {
                throw new Error(data.message || 'Error al actualizar la tarea');
            }

        } catch (error) {
            console.error('Error al actualizar tarea:', error);
            this.showAlert('Error al actualizar la tarea', 'error');
        }
    }

    /**
     * Mostrar modal de confirmación para eliminar
     */
    showDeleteModal(taskId) {
        const task = this.tasks.find(t => t.id == taskId);
        if (!task) return;

        this.taskToDelete = taskId;
        this.elements.deleteModal.classList.add('active');
        
        // Focus en el botón cancelar para accesibilidad
        setTimeout(() => {
            const cancelBtn = this.elements.deleteModal.querySelector('.modal-btn-cancel');
            if (cancelBtn) cancelBtn.focus();
        }, 100);
    }

    /**
     * Cerrar modal de eliminación
     */
    closeDeleteModal() {
        this.elements.deleteModal.classList.remove('active');
        this.taskToDelete = null;
    }

    /**
     * Confirmar y ejecutar eliminación
     */
    async confirmDelete() {
        if (!this.taskToDelete) return;

        try {
            const response = await fetch(`${this.apiBaseUrl}/${this.taskToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.status === 'success') {
                this.showAlert('Tarea eliminada exitosamente', 'success');
                await this.loadTasks();
            } else {
                throw new Error(data.message || 'Error al eliminar la tarea');
            }

        } catch (error) {
            console.error('Error al eliminar tarea:', error);
            this.showAlert('Error al eliminar la tarea', 'error');
        } finally {
            this.closeDeleteModal();
        }
    }

    /**
     * Renderizar lista de tareas
     */
    renderTasks() {
        if (!this.elements.tasksContainer) return;

        if (!this.tasks || this.tasks.length === 0) {
            this.elements.tasksContainer.innerHTML = `
                <div class="no-tasks" role="status">
                    <p>📝 No hay tareas aún</p>
                    <p style="font-size: 0.9em; opacity: 0.7;">¡Agrega tu primera tarea!</p>
                </div>
            `;
            return;
        }

        const tasksHTML = this.tasks.map(task => `
            <div class="task ${task.completed == 1 ? 'completed' : ''}" role="listitem" data-task-id="${task.id}">
                <input type="checkbox" 
                       class="task-checkbox" 
                       ${task.completed == 1 ? 'checked' : ''}
                       onchange="todoApp.toggleTask(${task.id})"
                       aria-label="Marcar tarea como ${task.completed == 1 ? 'pendiente' : 'completada'}">
                
                <span class="task-title">${this.escapeHtml(task.title)}</span>
                
                <div class="task-actions">
                    <button class="edit-btn" 
                            onclick="todoApp.editTask(${task.id})"
                            aria-label="Editar tarea: ${this.escapeHtml(task.title)}"
                            title="Editar tarea">
                        ✏️
                    </button>
                    <button class="delete-btn" 
                            onclick="todoApp.showDeleteModal(${task.id})"
                            aria-label="Eliminar tarea: ${this.escapeHtml(task.title)}"
                            title="Eliminar tarea">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');

        this.elements.tasksContainer.innerHTML = tasksHTML;
    }

    /**
     * Mostrar indicador de carga
     */
    showLoading() {
        if (!this.elements.tasksContainer) return;
        
        this.elements.tasksContainer.innerHTML = `
            <div class="loading" role="status" aria-live="polite">
                <div class="spinner" aria-hidden="true"></div>
                <p>Cargando tareas...</p>
            </div>
        `;
    }

    /**
     * Mostrar error de carga
     */
    showError(title, message) {
        if (!this.elements.tasksContainer) return;
        
        this.elements.tasksContainer.innerHTML = `
            <div class="error-state" role="status">
                <h3>${title}</h3>
                <p>${message}</p>
                <button onclick="todoApp.loadTasks()" class="retry-btn">
                    🔄 Reintentar
                </button>
            </div>
        `;
    }

    /**
     * Mostrar alerta temporal
     */
    showAlert(message, type = 'success') {
        if (!this.elements.alertContainer) return;

        const alertId = 'alert-' + Date.now();
        const alertHTML = `
            <div class="alert alert-${type}" id="${alertId}" role="alert">
                ${this.escapeHtml(message)}
            </div>
        `;

        this.elements.alertContainer.insertAdjacentHTML('beforeend', alertHTML);

        // Auto-eliminar después de 4 segundos
        setTimeout(() => {
            const alertElement = document.getElementById(alertId);
            if (alertElement) {
                alertElement.style.opacity = '0';
                setTimeout(() => alertElement.remove(), 300);
            }
        }, 4000);
    }

    /**
     * Escapar HTML para prevenir XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

/**
 * Funciones globales para eventos onclick (compatibilidad)
 * TODO: Migrar a event listeners para mejor práctica
 */
window.closeDeleteModal = () => todoApp?.closeDeleteModal();
window.confirmDelete = () => todoApp?.confirmDelete();

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // La variable API_BASE_URL debe ser definida en la vista
    if (typeof API_BASE_URL !== 'undefined') {
        window.todoApp = new TodoApp(API_BASE_URL);
    } else {
        console.error('API_BASE_URL no está definida');
    }
});