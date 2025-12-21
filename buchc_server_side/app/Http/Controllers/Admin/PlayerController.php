<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Player;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    public function index()
    {
        $players = Player::orderBy('rank')->paginate(10);
        return view('admin.players.index', compact('players'));
    }

    public function create()
    {
        return view('admin.players.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'rank' => 'required|integer|unique:players,rank',
            'name' => 'required|string',
            'points' => 'required|integer',
        ]);

        Player::create($request->all());
        return redirect()->route('admin.players.index')->with('success', 'Player added successfully!');
    }

    public function edit(Player $player)
    {
        return view('admin.players.edit', compact('player'));
    }

    public function update(Request $request, Player $player)
    {
        $request->validate([
            'rank' => 'required|integer|unique:players,rank,' . $player->id,
            'name' => 'required|string',
            'points' => 'required|integer',
        ]);

        $player->update($request->all());
        return redirect()->route('admin.players.index')->with('success', 'Player updated successfully!');
    }

    public function destroy(Player $player)
    {
        $player->delete();
        return redirect()->route('admin.players.index')->with('success', 'Player deleted successfully!');
    }
}
