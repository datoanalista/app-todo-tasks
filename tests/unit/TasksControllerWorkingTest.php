<?php

namespace Tests\Unit;

use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\ControllerTestTrait;
use CodeIgniter\Test\DatabaseTestTrait;

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

    public function testTasksControllerIndexWorks()
    {
        $result = $this->controller(\App\Controllers\Tasks::class)
                       ->execute('index');
        $this->assertTrue($result->isOK(), 'Tasks controller should respond with 200 OK');
        $body = $result->getBody();
        $this->assertNotEmpty($body, 'Response should not be empty');
        $this->assertStringContainsString('success', $body, 'Should contain success indicator');
    }

    public function testTasksControllerShowWorks()
    {
        $result = $this->controller(\App\Controllers\Tasks::class)
                       ->execute('show', 1);

        $this->assertTrue($result->isOK(), 'Show method should work with valid ID');
        
        $body = $result->getBody();
        $this->assertNotEmpty($body, 'Response should contain task data');
    }

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

    public function testTasksControllerUpdateWorks()
    {
        $data = json_encode(['title' => 'Updated Task']);
        
        $result = $this->controller(\App\Controllers\Tasks::class)
                       ->withBody($data)
                       ->execute('update', 1);

        $this->assertTrue($result->isOK(), 'Update method should work');
        $this->seeInDatabase('tasks', [
            'id' => 1,
            'title' => 'Updated Task'
        ]);
    }

    public function testTasksControllerDeleteWorks()
    {
        $result = $this->controller(\App\Controllers\Tasks::class)
                       ->execute('delete', 1);

        $this->assertTrue($result->isOK(), 'Delete method should work');
        $this->dontSeeInDatabase('tasks', ['id' => 1]);
        $this->seeInDatabase('tasks', ['id' => 2]);
    }


}
