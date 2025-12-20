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

    // POST /api/players
    public function store(Request $request)
    {
        $data = $request->validate([
            'rank'   => 'required|integer',
            'name'   => 'required|string',
            'points' => 'required|integer',
        ]);

        return Player::create($data);
    }

    // GET /api/players/{player}
    public function show(Player $player)
    {
        return $player;
    }

    // PUT /api/players/{player}
    public function update(Request $request, Player $player)
    {
        $player->update($request->all());
        return $player;
    }

    // DELETE /api/players/{player}
    public function destroy(Player $player)
    {
        $player->delete();
        return response()->json(['message' => 'Player deleted']);
    }
}
