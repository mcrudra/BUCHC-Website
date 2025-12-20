<?php

namespace App\Http\Controllers\Api;

use App\Models\TeamMember;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TeamMemberController extends Controller
{
    // GET /api/team-members
    public function index()
    {
        return TeamMember::all()->groupBy('department');
    }

    // POST /api/team-members
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => 'required|string',
            'position'   => 'required|string',
            'department' => 'required|string',
            'photo'      => 'nullable|string',
            'mail'       => 'nullable|string',
        ]);

        return TeamMember::create($data);
    }

    // GET /api/team-members/{teamMember}
    public function show(TeamMember $teamMember)
    {
        return $teamMember;
    }

    // PUT /api/team-members/{teamMember}
    public function update(Request $request, TeamMember $teamMember)
    {
        $teamMember->update($request->all());
        return $teamMember;
    }

    // DELETE /api/team-members/{teamMember}
    public function destroy(TeamMember $teamMember)
    {
        $teamMember->delete();
        return response()->json(['message' => 'Member removed']);
    }
}
