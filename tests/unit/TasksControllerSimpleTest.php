<?php

namespace Tests\Unit;

use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\ControllerTestTrait;

class TasksControllerSimpleTest extends CIUnitTestCase
{
    use ControllerTestTrait;

    /**
     * Prueba 1: Verificar que el controlador Tasks existe y es accesible
     */
    public function testTasksControllerExists()
    {
        $this->assertTrue(class_exists('\App\Controllers\Tasks'));
    }

    /**
     * Prueba 2: Verificar que el método index existe
     */
    public function testIndexMethodExists()
    {
        $controller = new \App\Controllers\Tasks();
        $this->assertTrue(method_exists($controller, 'index'));
    }

    /**
     * Prueba 3: Verificar que el método show existe
     */
    public function testShowMethodExists()
    {
        $controller = new \App\Controllers\Tasks();
        $this->assertTrue(method_exists($controller, 'show'));
    }

    /**
     * Prueba 4: Verificar que el método create existe
     */
    public function testCreateMethodExists()
    {
        $controller = new \App\Controllers\Tasks();
        $this->assertTrue(method_exists($controller, 'create'));
    }

    /**
     * Prueba 5: Verificar que el método update existe
     */
    public function testUpdateMethodExists()
    {
        $controller = new \App\Controllers\Tasks();
        $this->assertTrue(method_exists($controller, 'update'));
    }

    /**
     * Prueba 6: Verificar que el método delete existe
     */
    public function testDeleteMethodExists()
    {
        $controller = new \App\Controllers\Tasks();
        $this->assertTrue(method_exists($controller, 'delete'));
    }

    /**
     * Prueba 7: Verificar que el modelo TaskModel existe
     */
    public function testTaskModelExists()
    {
        $this->assertTrue(class_exists('\App\Models\TaskModel'));
    }

    /**
     * Prueba 8: Verificar que el modelo tiene la tabla correcta
     */
    public function testTaskModelTable()
    {
        $model = new \App\Models\TaskModel();
        $this->assertEquals('tasks', $model->getTable());
    }
}

