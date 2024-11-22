<?php

$router = new AltoRouter();

$router->map('GET', '/', ['App\Controllers\HelloController', 'index']);
$router->map('GET', '/paywall', ['App\Controllers\PaywallController', 'index']);

$match = $router->match();

if ($match && is_callable([new $match['target'][0], $match['target'][1]])) {
    call_user_func_array([new $match['target'][0], $match['target'][1]], $match['params']);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Route not found']);
}
