<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\TeamMember;
use App\Models\TopPlayer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalEvents = Event::count();
        // $totalTeamMembers = TeamMember::count();
        // $totalTopPlayers = TopPlayer::count();

        return view('admin.dashboard',['totalEvents'=>$totalEvents]);
    }
}
