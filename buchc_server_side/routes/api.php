<?php

use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\PlayerController;

Route::get('/events', [EventController::class, 'index']);


Route::get('/teams',[TeamMemberController::class, 'index']);
Route::get('/players',[PlayerController::class, 'index']);



