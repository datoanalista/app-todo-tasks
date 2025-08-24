<?php

namespace Tests\Unit;

use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\ControllerTestTrait;

class TasksControllerSimpleTest extends CIUnitTestCase
{
    use ControllerTestTrait;

    public function testTasksControllerExists()
    {
        $this->assertTrue(class_exists('\App\Controllers\Tasks'));
    }

    public function testIndexMethodExists()
    {
        $controller = new \App\Controllers\Tasks();
        $this->assertTrue(method_exists($controller, 'index'));
    }

    public function testShowMethodExists()
    {
        $controller = new \App\Controllers\Tasks();
        $this->assertTrue(method_exists($controller, 'show'));
    }

    public function testCreateMethodExists()
    {
        $controller = new \App\Controllers\Tasks();
        $this->assertTrue(method_exists($controller, 'create'));
    }

    public function testUpdateMethodExists()
    {
        $controller = new \App\Controllers\Tasks();
        $this->assertTrue(method_exists($controller, 'update'));
    }

    public function testDeleteMethodExists()
    {
        $controller = new \App\Controllers\Tasks();
        $this->assertTrue(method_exists($controller, 'delete'));
    }

    public function testTaskModelExists()
    {
        $this->assertTrue(class_exists('\App\Models\TaskModel'));
    }

    public function testTaskModelTable()
    {
        $model = new \App\Models\TaskModel();
        $this->assertEquals('tasks', $model->getTable());
    }
}

