<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/projects', [PortfolioController::class, 'projects']);
    Route::get('/projects/{project:slug}', [PortfolioController::class, 'project']);
    Route::get('/experiences', [PortfolioController::class, 'experiences']);
    Route::get('/products', [PortfolioController::class, 'products']);
    Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:contact');
});
