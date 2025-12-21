<?php

namespace App\Http\Controllers\Api;

use App\Models\TeamMember;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TeamController extends Controller
{
    public function index()
    {
        return response()->json([
            'governing' => TeamMember::where('department','governing')->get(),
            'em'        => TeamMember::where('department','em')->get(),
            'creative'  => TeamMember::where('department','creative')->get(),
            'training'  => TeamMember::where('department','training')->get(),
            'hr'        => TeamMember::where('department','hr')->get(),
        ]);
    }
}
