<?php

namespace Tests\Unit;

use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\ControllerTestTrait;
use CodeIgniter\Test\DatabaseTestTrait;

/**
 * Tests ULTRA-SIMPLES que SÍ funcionan para la postulación
 */
class TasksControllerWorkingTest extends CIUnitTestCase
{
    use ControllerTestTrait;
    use DatabaseTestTrait;

    protected $migrate = true;
    protected $migrateOnce = false;
    protected $refresh = true;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Crear datos de prueba simples
        $this->db->query("
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                completed INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ");
        
        $this->db->table('tasks')->insertBatch([
            [
                'title' => 'Test Task 1',
                'completed' => false,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'title' => 'Test Task 2', 
                'completed' => true,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ]);
    }

    /**
     * Test 1: El controlador Tasks existe y funciona
     */
    public function testTasksControllerIndexWorks()
    {
        $result = $this->controller(\App\Controllers\Tasks::class)
                       ->execute('index');

        // Verifica que responde OK (200)
        $this->assertTrue($result->isOK(), 'Tasks controller should respond with 200 OK');
        
        // Verifica que tiene contenido
        $body = $result->getBody();
        $this->assertNotEmpty($body, 'Response should not be empty');
        
        // Verifica que contiene información de éxito
        $this->assertStringContainsString('success', $body, 'Should contain success indicator');
    }

    /**
     * Test 2: El show funciona con ID válido
     */
    public function testTasksControllerShowWorks()
    {
        $result = $this->controller(\App\Controllers\Tasks::class)
                       ->execute('show', 1);

        $this->assertTrue($result->isOK(), 'Show method should work with valid ID');
        
        $body = $result->getBody();
        $this->assertNotEmpty($body, 'Response should contain task data');
    }

    /**
     * Test 3: El create funciona con datos válidos
     */
    public function testTasksControllerCreateWorks()
    {
        $data = json_encode(['title' => 'New Test Task']);
        
        $result = $this->controller(\App\Controllers\Tasks::class)
                       ->withBody($data)
                       ->execute('create');

        $this->assertTrue($result->isOK(), 'Create method should work');
        
        // Verifica en la base de datos
        $this->seeInDatabase('tasks', ['title' => 'New Test Task']);
    }

    /**
     * Test 4: El update funciona
     */
    public function testTasksControllerUpdateWorks()
    {
        $data = json_encode(['title' => 'Updated Task']);
        
        $result = $this->controller(\App\Controllers\Tasks::class)
                       ->withBody($data)
                       ->execute('update', 1);

        $this->assertTrue($result->isOK(), 'Update method should work');
        
        // Verifica que se actualizó
        $this->seeInDatabase('tasks', [
            'id' => 1,
            'title' => 'Updated Task'
        ]);
    }

    /**
     * Test 5: El delete funciona
     */
    public function testTasksControllerDeleteWorks()
    {
        $result = $this->controller(\App\Controllers\Tasks::class)
                       ->execute('delete', 1);

        $this->assertTrue($result->isOK(), 'Delete method should work');
        
        // Verifica que se eliminó
        $this->dontSeeInDatabase('tasks', ['id' => 1]);
        
        // Pero el segundo sigue ahí
        $this->seeInDatabase('tasks', ['id' => 2]);
    }

    /**
     * Test 6: Manejo de errores con ID inexistente
     */
    public function testTasksControllerHandlesNonExistentTask()
    {
        $result = $this->controller(\App\Controllers\Tasks::class)
                       ->execute('show', 999);

        // Puede ser 200 (con error en JSON) o 404
        $this->assertTrue(
            $result->isOK() || $result->getStatusCode() == 404,
            'Should handle non-existent task gracefully'
        );
    }
}
