@extends('admin.layout.app')

@section('content')
    <div class="max-w-4xl mx-auto">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
            <p class="text-gray-600 mt-2">
                Manage website settings and links
            </p>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-200">
            <form method="POST" action="{{ route('admin.settings.update') }}" class="p-8 space-y-6">
                @csrf
                
                @if(session('success'))
                    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {{ session('success') }}
                    </div>
                @endif

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Join BUCHC Link
                    </label>
                    <input 
                        type="url" 
                        name="join_link" 
                        value="{{ old('join_link', $joinLink) }}"
                        placeholder="https://example.com/join-buchc"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2.5
                               text-gray-800
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <p class="text-xs text-gray-500 mt-2">
                        Enter the registration/join link. Leave empty if registration is not available. 
                        This link will be used for all "Join BUCHC" buttons on the website.
                    </p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Club Email
                    </label>
                    <input 
                        type="email" 
                        name="club_email" 
                        value="{{ old('club_email', $clubEmail) }}"
                        placeholder="club.buchc@bracu.ac.bd"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2.5
                               text-gray-800
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <p class="text-xs text-gray-500 mt-2">
                        Enter the club email address. This will be used in the footer contact section.
                    </p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Facebook Page Link
                    </label>
                    <input 
                        type="url" 
                        name="facebook_link" 
                        value="{{ old('facebook_link', $facebookLink) }}"
                        placeholder="https://facebook.com/buchc"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2.5
                               text-gray-800
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <p class="text-xs text-gray-500 mt-2">
                        Enter the Facebook page URL. Leave empty if not available.
                    </p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Instagram Page Link
                    </label>
                    <input 
                        type="url" 
                        name="instagram_link" 
                        value="{{ old('instagram_link', $instagramLink) }}"
                        placeholder="https://instagram.com/buchc"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2.5
                               text-gray-800
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <p class="text-xs text-gray-500 mt-2">
                        Enter the Instagram page URL. Leave empty if not available.
                    </p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn Page Link
                    </label>
                    <input 
                        type="url" 
                        name="linkedin_link" 
                        value="{{ old('linkedin_link', $linkedinLink) }}"
                        placeholder="https://linkedin.com/company/buchc"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2.5
                               text-gray-800
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <p class="text-xs text-gray-500 mt-2">
                        Enter the LinkedIn page URL. Leave empty if not available.
                    </p>
                </div>

                <div class="pt-6 border-t border-gray-200 flex items-center justify-between">
                    <a href="{{ route('admin.dashboard') }}" class="text-sm text-gray-600 hover:text-gray-900 transition">
                        ← Back to Dashboard
                    </a>
                    <button type="submit"
                        class="inline-flex items-center gap-2
                           bg-blue-600 hover:bg-blue-700
                           text-white px-6 py-2.5 rounded-lg
                           font-medium shadow-sm transition">
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection

