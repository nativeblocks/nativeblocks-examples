<?php

namespace App\Controllers;

class HelloController
{
    private function sendJson($data = [], $status = 200): void
    {
        header("Content-Type: application/json");
        http_response_code($status);
        echo json_encode($data);
    }

    public function index(): void
    {
        $this->sendJson(['message' => 'Hello, World!']);
    }

}