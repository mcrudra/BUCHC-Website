<?php

namespace App\Http\Controllers\Api;

use App\Models\TeamMember;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TeamMemberController extends Controller
{
    public function index()
    {
        // Get all governing body members
        $allGoverning = TeamMember::where('department','governing')->get();
        
        // Separate General Co-ordinator from other governing body members
        $generalCoordinator = $allGoverning->where('position', 'General Co-ordinator')->first();
        $governingBody = $allGoverning->where('position', '!=', 'General Co-ordinator')->values();
        
        return response()->json([
            'governing' => $governingBody,
            'general_coordinator' => $generalCoordinator,
            'em'        => TeamMember::where('department','em')->get(),
            'creative'  => TeamMember::where('department','creative')->get(),
            'training'  => TeamMember::where('department','training')->get(),
            'hr'        => TeamMember::where('department','hr')->get(),
        ]);
    }
}
