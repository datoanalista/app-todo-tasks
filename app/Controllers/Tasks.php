<?php

namespace App\Controllers;

use App\Models\TaskModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

class Tasks extends ResourceController
{
    use ResponseTrait;

    protected $taskModel;

    public function __construct()
    {
        $this->taskModel = new TaskModel();
    }

    public function index()
    {
        try {
            $tasks = $this->taskModel->findAll();
            return $this->respond([
                'status' => 'success',
                'data' => $tasks
            ]);
        } catch (\Exception $e) {
            return $this->failServerError('Error al obtener las tareas: ' . $e->getMessage());
        }
    }

    public function show($id = null)
    {
        try {
            if (!$id) {
                return $this->failValidationError('ID de tarea requerido');
            }

            $task = $this->taskModel->find($id);
            if (!$task) {
                return $this->failNotFound('Tarea no encontrada');
            }

            return $this->respond([
                'status' => 'success',
                'data' => $task
            ]);
        } catch (\Exception $e) {
            return $this->failServerError('Error al obtener la tarea: ' . $e->getMessage());
        }
    }

    public function create()
    {
        try {
            $data = $this->request->getJSON(true);
            
            if (!$this->taskModel->validate($data)) {
                return $this->failValidationError('Datos inválidos', $this->taskModel->errors());
            }
<<<<<<< HEAD

=======
>>>>>>> 3b1ddc7d2af4f2e9213b1295db205949427c55fe
            $data['created_at'] = date('Y-m-d H:i:s');
            $taskId = $this->taskModel->insert($data);
            $task = $this->taskModel->find($taskId);
            return $this->respondCreated([
                'status' => 'success',
                'message' => 'Tarea creada exitosamente',
                'data' => $task
            ]);
        } catch (\Exception $e) {
            return $this->failServerError('Error al crear la tarea: ' . $e->getMessage());
        }
    }

    public function update($id = null)
    {
        try {
            if (!$id) {
                return $this->failValidationError('ID de tarea requerido');
            }

            $task = $this->taskModel->find($id);
            if (!$task) {
                return $this->failNotFound('Tarea no encontrada');
            }

            $data = $this->request->getJSON(true);
            
            if (!$this->taskModel->validate($data)) {
                return $this->failValidationError('Datos inválidos', $this->taskModel->errors());
            }

            $data['updated_at'] = date('Y-m-d H:i:s');

            $this->taskModel->update($id, $data);
            $updatedTask = $this->taskModel->find($id);

            return $this->respond([
                'status' => 'success',
                'message' => 'Tarea actualizada exitosamente',
                'data' => $updatedTask
            ]);
        } catch (\Exception $e) {
            return $this->failServerError('Error al actualizar la tarea: ' . $e->getMessage());
        }
    }

    public function delete($id = null)
    {
        try {
            if (!$id) {
                return $this->failValidationError('ID de tarea requerido');
            }

            $task = $this->taskModel->find($id);
            if (!$task) {
                return $this->failNotFound('Tarea no encontrada');
            }

            $this->taskModel->delete($id);

            return $this->respond([
                'status' => 'success',
                'message' => 'Tarea eliminada exitosamente'
            ]);
        } catch (\Exception $e) {
            return $this->failServerError('Error al eliminar la tarea: ' . $e->getMessage());
        }
    }
}
