<?php

use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\PlayerController;

Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{event}', [EventController::class, 'show']);

Route::apiResource('team-members', TeamMemberController::class);
Route::apiResource('players', PlayerController::class);

