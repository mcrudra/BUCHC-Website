<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        $teams = TeamMember::latest()->paginate(15);
        return view('admin.teams.index', compact('teams'));
    }

    public function create()
    {
        return view('admin.teams.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'       => 'required',
            'position'   => 'required',
            'department' => 'required',
            'mail'       => 'nullable|email',
        ]);

        TeamMember::create($request->all());

        return redirect()
            ->route('admin.teams.index')
            ->with('success', 'Team member added successfully');
    }

    public function edit(TeamMember $team)
    {
        return view('admin.teams.edit', compact('team'));
    }

    public function update(Request $request, TeamMember $team)
    {
        $team->update($request->all());

        return redirect()
            ->route('admin.teams.index')
            ->with('success', 'Team member updated successfully');
    }

    public function destroy(TeamMember $team)
    {
        $team->delete();

        return redirect()
            ->route('admin.teams.index')
            ->with('success', 'Team member deleted successfully');
    }
}
