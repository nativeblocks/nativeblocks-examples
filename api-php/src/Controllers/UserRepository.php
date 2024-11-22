<?php

namespace App\Controllers;

class UserRepository
{

    public static function getUsers(): array
    {
        return [
            ['id' => 1],
            ['id' => 2],
            ['id' => 3],
            ['id' => 4],
        ];
    }
}