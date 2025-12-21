<?php

namespace App\Http\Controllers\Api;

use App\Models\Player;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PlayerController extends Controller
{
    // GET /api/players
    public function index()
    {
        return Player::orderBy('rank')->get();
    }
}
