<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\ListController;
use Illuminate\Support\Facades\Route;

Route::apiResource('boards', BoardController::class);
Route::apiResource('lists', ListController::class)->only(['store', 'update', 'destroy']);
Route::apiResource('cards', CardController::class)->only(['store', 'update', 'destroy']);
Route::post('cards/{card}/move', [CardController::class, 'move']);
Route::post('cards/{card}/tags', [CardController::class, 'attachTag']);
