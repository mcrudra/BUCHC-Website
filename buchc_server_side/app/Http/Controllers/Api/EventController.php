<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;

class EventController extends Controller
{
    public function index()
    {
        return response()->json([
            'upcomingEvents' => Event::where('is_past', false)->orderBy('date')->get(),
            'pastEvents' => Event::where('is_past', true)->orderByDesc('date')->get(),
        ]);
    }
    public function show(Event $event)
    {
        return response()->json($event);
    }
}
