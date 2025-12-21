<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function getJoinLink()
    {
        $joinLink = Setting::get('join_link', '');
        return response()->json(['join_link' => $joinLink]);
    }

    public function getAllSettings()
    {
        return response()->json([
            'join_link' => Setting::get('join_link', ''),
            'club_email' => Setting::get('club_email', ''),
            'facebook_link' => Setting::get('facebook_link', ''),
            'instagram_link' => Setting::get('instagram_link', ''),
            'linkedin_link' => Setting::get('linkedin_link', ''),
        ]);
    }
}
