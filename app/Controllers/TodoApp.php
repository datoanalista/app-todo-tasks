<?php

namespace App\Controllers;

class TodoApp extends BaseController
{
    public function index()
    {
        return view('todo_app');
    }
}
