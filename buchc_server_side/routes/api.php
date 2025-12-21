<?php

use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\PlayerController;
use App\Http\Controllers\Api\SettingController;

Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{event}', [EventController::class, 'show']);

Route::apiResource('team-members', TeamMemberController::class);
Route::apiResource('players', PlayerController::class);

Route::get('/settings/join-link', [SettingController::class, 'getJoinLink']);
Route::get('/settings', [SettingController::class, 'getAllSettings']);

