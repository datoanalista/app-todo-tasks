<<<<<<< HEAD
'use strict';

=======
/**
 * Todo App - Aplicación de Gestión de Tareas
 * Arquitectura modular con clases ES6
 * Version: 2.0 - Optimizada y refactorizada
 */

'use strict';

/**
 * Clase principal para manejar la aplicación de tareas
 */
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
class TodoApp {
    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl;
        this.tasks = [];
        this.editingTaskId = null;
        this.taskToDelete = null;
        
<<<<<<< HEAD
=======
        // Referencias a elementos DOM
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
        this.elements = {
            newTaskInput: null,
            tasksContainer: null,
            alertContainer: null,
<<<<<<< HEAD
            deleteModal: null
=======
            deleteModal: null,
            addButton: null
        };
        
        // Configuración
        this.config = {
            alertTimeout: 5000,
            maxTaskLength: 255,
            debounceDelay: 300
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
        };
        
        this.init();
    }
    
<<<<<<< HEAD
=======
    /**
     * Inicializar la aplicación
     */
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
    init() {
        this.cacheElements();
        this.bindEvents();
        this.loadTasks();
    }
    
<<<<<<< HEAD
=======
    /**
     * Cachear referencias a elementos DOM
     */
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
    cacheElements() {
        this.elements = {
            newTaskInput: document.getElementById('newTaskInput'),
            tasksContainer: document.getElementById('tasksContainer'),
            alertContainer: document.getElementById('alertContainer'),
<<<<<<< HEAD
            deleteModal: document.getElementById('deleteModal')
        };
    }
    
    bindEvents() {
=======
            deleteModal: document.getElementById('deleteModal'),
            addButton: document.querySelector('.add-task-form button')
        };
        
        // Verificar que todos los elementos existen
        const missingElements = Object.entries(this.elements)
            .filter(([key, element]) => !element)
            .map(([key]) => key);
            
        if (missingElements.length > 0) {
            console.error('Elementos DOM faltantes:', missingElements);
            this.showAlert('Error: Faltan elementos en la página', 'error');
        }
    }
    
    /**
     * Asociar eventos
     */
    bindEvents() {
        // Evento para agregar tarea con Enter
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
        this.elements.newTaskInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addTask();
            }
        });
        
<<<<<<< HEAD
        document.addEventListener('keydown', this.handleGlobalKeyPress.bind(this));
        
=======
        // Evento de input con debouncing para validación en tiempo real
        this.elements.newTaskInput?.addEventListener('input', 
            this.debounce(this.validateInput.bind(this), this.config.debounceDelay)
        );
        
        // Eventos de teclado para accesibilidad
        document.addEventListener('keydown', this.handleGlobalKeyPress.bind(this));
        
        // Evento para cerrar modal con Escape
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
        this.elements.deleteModal?.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeDeleteModal();
            }
        });
<<<<<<< HEAD
    }
    
    handleGlobalKeyPress(event) {
        if (event.key === 'Escape') {
            if (this.elements.deleteModal?.classList.contains('show')) {
                this.closeDeleteModal();
            }
        }
    }
    
    async loadTasks() {
        try {
            const response = await fetch(this.apiBaseUrl);
            const result = await response.json();
            
            if (result.status === 'success') {
                this.tasks = result.data;
                this.renderTasks();
            } else {
                throw new Error('Error al cargar las tareas');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showAlert('Error al cargar las tareas: ' + error.message, 'error');
            this.showEmptyState('Error al cargar las tareas', 'Intenta recargar la página');
        }
    }

=======
        
        // Prevenir submit del formulario (si existe)
        const form = document.querySelector('.add-task-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addTask();
            });
        }
    }
    
    /**
     * Manejar eventos globales de teclado
     */
    handleGlobalKeyPress(event) {
        switch(event.key) {
            case 'Escape':
                if (this.elements.deleteModal?.classList.contains('show')) {
                    this.closeDeleteModal();
                }
                if (this.editingTaskId) {
                    this.cancelEdit();
                }
                break;
            case 'Enter':
                if (event.ctrlKey || event.metaKey) {
                    this.addTask();
                }
                break;
        }
    }
    
    /**
     * Validar input en tiempo real
     */
    validateInput() {
        const input = this.elements.newTaskInput;
        const value = input?.value || '';
        
        if (value.length > this.config.maxTaskLength) {
            input.setCustomValidity(`Máximo ${this.config.maxTaskLength} caracteres`);
            input.classList.add('invalid');
        } else {
            input.setCustomValidity('');
            input.classList.remove('invalid');
        }
    }
    
    /**
     * Cargar tareas desde la API
     */
    async loadTasks() {
        try {
            this.showLoading();
            
            const response = await this.apiRequest('GET', '');
            
            if (response.status === 'success') {
                this.tasks = response.data || [];
                this.renderTasks();
            } else {
                throw new Error(response.message || 'Error al cargar las tareas');
            }
        } catch (error) {
            this.handleError('Error al cargar las tareas', error);
            this.showEmptyState('Error al cargar las tareas', 'Intenta recargar la página');
        }
    }
    
    /**
     * Agregar nueva tarea
     */
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
    async addTask() {
        const input = this.elements.newTaskInput;
        const title = input?.value?.trim();
        
        if (!title) {
            this.showAlert('Por favor, escribe el título de la tarea', 'error');
            input?.focus();
            return;
        }
        
<<<<<<< HEAD
        try {
            const response = await fetch(this.apiBaseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: title })
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                input.value = '';
                this.showAlert('Tarea agregada exitosamente');
                await this.loadTasks();
                input?.focus();
            } else {
                throw new Error(result.message || 'Error al crear la tarea');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showAlert('Error al crear la tarea: ' + error.message, 'error');
        }
    }
    

    editTask(taskId) {
        if (this.editingTaskId === taskId) return;
        
=======
        if (title.length > this.config.maxTaskLength) {
            this.showAlert(`El título no puede exceder ${this.config.maxTaskLength} caracteres`, 'error');
            return;
        }
        
        try {
            this.setButtonLoading(this.elements.addButton, true);
            
            const response = await this.apiRequest('POST', '', { title });
            
            if (response.status === 'success') {
                input.value = '';
                input.classList.remove('invalid');
                this.showAlert('Tarea agregada exitosamente');
                await this.loadTasks();
                input?.focus(); // Mantener foco para agregar más tareas
            } else {
                throw new Error(response.message || 'Error al crear la tarea');
            }
        } catch (error) {
            this.handleError('Error al crear la tarea', error);
        } finally {
            this.setButtonLoading(this.elements.addButton, false);
        }
    }
    
    /**
     * Editar tarea
     */
    editTask(taskId) {
        if (this.editingTaskId === taskId) return;
        
        // Cancelar edición previa si existe
        if (this.editingTaskId) {
            this.cancelEdit();
        }
        
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
        const task = this.tasks.find(t => t.id == taskId);
        if (!task) {
            this.showAlert('Tarea no encontrada', 'error');
            return;
        }
        
        const taskTitle = document.getElementById(`task-title-${taskId}`);
        if (!taskTitle) return;
        
<<<<<<< HEAD
        const currentTitle = this.escapeHtml(task.title);
        
        taskTitle.innerHTML = `
            <input type="text" 
                   value="${currentTitle}" 
                   class="edit-input"
=======
        const currentTitle = task.title;
        
        taskTitle.innerHTML = `
            <input type="text" 
                   value="${this.escapeHtml(currentTitle)}" 
                   class="edit-input"
                   maxlength="${this.config.maxTaskLength}"
                   aria-label="Editar tarea"
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
                   style="width: 100%; padding: 8px; border: 1px solid #3498db; border-radius: 5px; background: #f8fafc;">
        `;
        
        const input = taskTitle.querySelector('input');
        this.editingTaskId = taskId;
        
<<<<<<< HEAD
=======
        // Eventos para la edición
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.saveTaskEdit(taskId);
            }
        });
        
        input.addEventListener('blur', () => {
<<<<<<< HEAD
            setTimeout(() => this.saveTaskEdit(taskId), 100);
        });
        
=======
            // Delay para permitir click en botones
            setTimeout(() => this.saveTaskEdit(taskId), 100);
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.cancelEdit();
            }
        });
        
        // Seleccionar texto y enfocar
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
        input.focus();
        input.select();
    }
    
<<<<<<< HEAD

=======
    /**
     * Cancelar edición actual
     */
    cancelEdit() {
        if (!this.editingTaskId) return;
        
        // Recargar para restaurar estado original
        this.loadTasks();
        this.editingTaskId = null;
    }
    
    /**
     * Guardar edición de tarea
     */
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
    async saveTaskEdit(taskId) {
        if (!this.editingTaskId || this.editingTaskId !== taskId) return;
        
        const taskTitle = document.getElementById(`task-title-${taskId}`);
        const input = taskTitle?.querySelector('input');
        const newTitle = input?.value?.trim();
        
        if (!newTitle) {
            this.showAlert('El título de la tarea no puede estar vacío', 'error');
<<<<<<< HEAD
            await this.loadTasks();
            this.editingTaskId = null;
=======
            this.cancelEdit();
            return;
        }
        
        if (newTitle.length > this.config.maxTaskLength) {
            this.showAlert(`El título no puede exceder ${this.config.maxTaskLength} caracteres`, 'error');
            input?.focus();
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
            return;
        }
        
        try {
<<<<<<< HEAD
            const response = await fetch(`${this.apiBaseUrl}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTitle })
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                this.showAlert('Tarea actualizada exitosamente');
                await this.loadTasks();
            } else {
                throw new Error(result.message || 'Error al actualizar la tarea');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showAlert('Error al actualizar la tarea: ' + error.message, 'error');
=======
            const response = await this.apiRequest('PUT', `/${taskId}`, { title: newTitle });
            
            if (response.status === 'success') {
                this.showAlert('Tarea actualizada exitosamente');
                await this.loadTasks();
            } else {
                throw new Error(response.message || 'Error al actualizar la tarea');
            }
        } catch (error) {
            this.handleError('Error al actualizar la tarea', error);
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
            await this.loadTasks();
        } finally {
            this.editingTaskId = null;
        }
    }
    
<<<<<<< HEAD
=======
    /**
     * Iniciar eliminación de tarea
     */
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
    deleteTask(taskId) {
        this.taskToDelete = taskId;
        this.showDeleteModal();
    }
    
<<<<<<< HEAD
=======
    /**
     * Confirmar eliminación de tarea
     */
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
    async confirmDelete() {
        if (!this.taskToDelete) return;
        
        try {
<<<<<<< HEAD
            const response = await fetch(`${this.apiBaseUrl}/${this.taskToDelete}`, {
                method: 'DELETE'
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                this.showAlert('Tarea eliminada exitosamente');
                await this.loadTasks();
            } else {
                throw new Error(result.message || 'Error al eliminar la tarea');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showAlert('Error al eliminar la tarea: ' + error.message, 'error');
=======
            const response = await this.apiRequest('DELETE', `/${this.taskToDelete}`);
            
            if (response.status === 'success') {
                this.showAlert('Tarea eliminada exitosamente');
                await this.loadTasks();
            } else {
                throw new Error(response.message || 'Error al eliminar la tarea');
            }
        } catch (error) {
            this.handleError('Error al eliminar la tarea', error);
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
        } finally {
            this.closeDeleteModal();
        }
    }
    
<<<<<<< HEAD
=======
    /**
     * Mostrar modal de confirmación
     */
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
    showDeleteModal() {
        const modal = this.elements.deleteModal;
        if (!modal) return;
        
        modal.classList.add('show');
        
<<<<<<< HEAD
        const firstButton = modal.querySelector('button');
        firstButton?.focus();
    }
    
=======
        // Enfocar primer botón para accesibilidad
        const firstButton = modal.querySelector('button');
        firstButton?.focus();
        
        // Trap focus en el modal
        this.trapFocus(modal);
    }
    
    /**
     * Cerrar modal de confirmación
     */
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
    closeDeleteModal() {
        const modal = this.elements.deleteModal;
        if (!modal) return;
        
        modal.classList.remove('show');
        this.taskToDelete = null;
<<<<<<< HEAD
    }
    
=======
        this.removeFocusTrap();
    }
    
    /**
     * Renderizar lista de tareas
     */
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
    renderTasks() {
        const container = this.elements.tasksContainer;
        if (!container) return;
        
        if (this.tasks.length === 0) {
            this.showEmptyState('No hay tareas', '¡Agrega tu primera tarea para comenzar!');
            return;
        }
        
        const tasksHTML = this.tasks.map(task => `
<<<<<<< HEAD
            <div class="task-item" data-task-id="${task.id}">
=======
            <div class="task-item" data-task-id="${task.id}" role="listitem">
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
                <div class="task-title" id="task-title-${task.id}">
                    ${this.escapeHtml(task.title)}
                    <div class="task-date">Creada: ${this.formatDate(task.created_at)}</div>
                </div>
                
<<<<<<< HEAD
                <div class="task-actions">
                    <button class="btn-edit" 
                            onclick="todoApp.editTask(${task.id})"
                            aria-label="Editar tarea: ${this.escapeHtml(task.title)}">
                        ✏️ Editar
                    </button>
                    <button class="btn-delete" 
                            onclick="todoApp.deleteTask(${task.id})"
                            aria-label="Eliminar tarea: ${this.escapeHtml(task.title)}">
                        🗑️ Eliminar
=======
                <div class="task-actions" role="group" aria-label="Acciones de tarea">
                    <button class="btn-edit" 
                            onclick="todoApp.editTask(${task.id})"
                            aria-label="Editar tarea: ${this.escapeHtml(task.title)}"
                            type="button">
                        <span aria-hidden="true">✏️</span> Editar
                    </button>
                    <button class="btn-delete" 
                            onclick="todoApp.deleteTask(${task.id})"
                            aria-label="Eliminar tarea: ${this.escapeHtml(task.title)}"
                            type="button">
                        <span aria-hidden="true">🗑️</span> Eliminar
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
                    </button>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = tasksHTML;
<<<<<<< HEAD
    }
    
=======
        
        // Actualizar contador para lectores de pantalla
        this.announceTaskCount();
    }
    
    /**
     * Mostrar estado de loading
     */
    showLoading() {
        const container = this.elements.tasksContainer;
        if (!container) return;
        
        container.innerHTML = `
            <div class="loading" role="status" aria-live="polite">
                <div class="spinner" aria-hidden="true"></div>
                <p>Cargando tareas...</p>
            </div>
        `;
    }
    
    /**
     * Mostrar estado vacío
     */
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
    showEmptyState(title, message) {
        const container = this.elements.tasksContainer;
        if (!container) return;
        
        container.innerHTML = `
<<<<<<< HEAD
            <div class="empty-state">
=======
            <div class="empty-state" role="status">
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
                <h3>${this.escapeHtml(title)}</h3>
                <p>${this.escapeHtml(message)}</p>
            </div>
        `;
    }
    
<<<<<<< HEAD
=======
    /**
     * Mostrar alerta
     */
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
    showAlert(message, type = 'success') {
        const container = this.elements.alertContainer;
        if (!container) {
            console.log(`Alert (${type}):`, message);
            return;
        }
        
        const alertId = `alert-${Date.now()}`;
        const alertDiv = document.createElement('div');
        alertDiv.id = alertId;
        alertDiv.className = `alert alert-${type}`;
        alertDiv.setAttribute('role', type === 'error' ? 'alert' : 'status');
<<<<<<< HEAD
=======
        alertDiv.setAttribute('aria-live', 'polite');
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
        alertDiv.textContent = message;
        
        container.appendChild(alertDiv);
        
<<<<<<< HEAD
=======
        // Auto-remove
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
        setTimeout(() => {
            const element = document.getElementById(alertId);
            if (element) {
                element.remove();
            }
<<<<<<< HEAD
        }, 5000);
    }
    
=======
        }, this.config.alertTimeout);
    }
    
    /**
     * Realizar petición a la API
     */
    async apiRequest(method, endpoint, data = null) {
        const url = `${this.apiBaseUrl}${endpoint}`;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        if (data) {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    }
    
    /**
     * Manejar errores de forma centralizada
     */
    handleError(context, error) {
        console.error(`${context}:`, error);
        const message = error?.message || 'Error desconocido';
        this.showAlert(`${context}: ${message}`, 'error');
    }
    
    /**
     * Formatear fecha
     */
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Fecha inválida';
        }
    }
    
<<<<<<< HEAD
=======
    /**
     * Escapar HTML para prevenir XSS
     */
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
    escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
<<<<<<< HEAD
}

window.closeDeleteModal = () => todoApp?.closeDeleteModal();
window.confirmDelete = () => todoApp?.confirmDelete();
window.addTask = () => todoApp?.addTask();

document.addEventListener('DOMContentLoaded', () => {
=======
    
    /**
     * Debounce utility
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /**
     * Establecer estado de loading en botón
     */
    setButtonLoading(button, loading) {
        if (!button) return;
        
        if (loading) {
            button.disabled = true;
            button.classList.add('btn-loading');
            button.setAttribute('aria-busy', 'true');
        } else {
            button.disabled = false;
            button.classList.remove('btn-loading');
            button.setAttribute('aria-busy', 'false');
        }
    }
    
    /**
     * Anunciar cantidad de tareas para lectores de pantalla
     */
    announceTaskCount() {
        const count = this.tasks.length;
        const announcement = count === 1 
            ? '1 tarea disponible' 
            : `${count} tareas disponibles`;
            
        // Crear elemento temporal para anuncio
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.textContent = announcement;
        
        document.body.appendChild(announcer);
        
        // Remover después de que se anuncie
        setTimeout(() => {
            document.body.removeChild(announcer);
        }, 1000);
    }
    
    /**
     * Trap focus within modal
     */
    trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        const handleTabKey = (e) => {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };
        
        modal.addEventListener('keydown', handleTabKey);
        this._currentFocusTrap = handleTabKey;
    }
    
    /**
     * Remove focus trap
     */
    removeFocusTrap() {
        if (this._currentFocusTrap) {
            document.removeEventListener('keydown', this._currentFocusTrap);
            this._currentFocusTrap = null;
        }
    }
}

/**
 * Funciones globales para compatibilidad con onclick en HTML
 * TODO: Migrar a event listeners para mejor práctica
 */
window.closeDeleteModal = () => todoApp?.closeDeleteModal();
window.confirmDelete = () => todoApp?.confirmDelete();

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // La variable API_BASE_URL debe ser definida en la vista
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
    if (typeof API_BASE_URL !== 'undefined') {
        window.todoApp = new TodoApp(API_BASE_URL);
    } else {
        console.error('API_BASE_URL no está definida');
    }
});
