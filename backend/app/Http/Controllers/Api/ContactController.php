<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:254'],
            'message' => ['required', 'string', 'min:20', 'max:5000'],
            'website' => ['prohibited'],
        ]);

        ContactSubmission::create([
            'name' => trim($data['name']),
            'email' => mb_strtolower(trim($data['email'])),
            'message' => trim($data['message']),
        ]);

        return response()->json(['message' => 'Message received. Thank you.'], 201);
    }
}
