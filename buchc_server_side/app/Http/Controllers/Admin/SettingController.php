<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $joinLink = Setting::get('join_link', '');
        $clubEmail = Setting::get('club_email', '');
        $facebookLink = Setting::get('facebook_link', '');
        $instagramLink = Setting::get('instagram_link', '');
        $linkedinLink = Setting::get('linkedin_link', '');
        
        return view('admin.settings.index', compact(
            'joinLink',
            'clubEmail',
            'facebookLink',
            'instagramLink',
            'linkedinLink'
        ));
    }

    public function update(Request $request)
    {
        $request->validate([
            'join_link' => 'nullable|url',
            'club_email' => 'nullable|email',
            'facebook_link' => 'nullable|url',
            'instagram_link' => 'nullable|url',
            'linkedin_link' => 'nullable|url',
        ]);

        Setting::set('join_link', $request->join_link);
        Setting::set('club_email', $request->club_email);
        Setting::set('facebook_link', $request->facebook_link);
        Setting::set('instagram_link', $request->instagram_link);
        Setting::set('linkedin_link', $request->linkedin_link);

        return redirect()->route('admin.settings.index')
            ->with('success', 'Settings updated successfully!');
    }
}
