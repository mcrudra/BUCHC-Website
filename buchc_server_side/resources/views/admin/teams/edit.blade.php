@extends('admin.layout.app')

@section('content')
    <div class="max-w-4xl mx-auto">
        <div class="mb-10">
            <h1 class="text-3xl font-semibold text-gray-900">Edit Team Member</h1>
            <p class="text-sm text-gray-500 mt-2">
                Modify team member details and department assignment
            </p>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200">
            <form method="POST" action="{{ route('admin.teams.update', $team) }}" class="p-10 space-y-8">
                @csrf
                @method('PUT')
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input type="text" name="name" required value="{{ old('name', $team->name) }}"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2.5
                               text-gray-800
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Position
                        </label>
                        <input type="text" name="position" required value="{{ old('position', $team->position) }}"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2.5
                               text-gray-800
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Department
                        </label>
                        <select name="department" required
                            class="w-full border border-gray-300 rounded-lg px-4 py-2.5
                               bg-white text-gray-800
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select Department</option>
                            <option value="governing" @selected($team->department === 'governing')>Governing Body</option>
                            <option value="em" @selected($team->department === 'em')>Event Management</option>
                            <option value="creative" @selected($team->department === 'creative')>Creative & IT</option>
                            <option value="training" @selected($team->department === 'training')>Training & Research</option>
                            <option value="hr" @selected($team->department === 'hr')>Human Resource</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input type="email" name="mail" value="{{ old('mail', $team->mail) }}"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2.5
                               text-gray-800
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Photo URL
                    </label>
                    <input type="text" name="photo" value="{{ old('photo', $team->photo) }}"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2.5
                           text-gray-800
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">

                    @if ($team->photo)
                        <div class="mt-4">
                            <p class="text-xs text-gray-500 mb-2">Current Photo</p>
                            <img src="{{ $team->photo }}" alt="Photo Preview"
                                class="w-32 h-32 object-cover rounded-xl border shadow-sm">
                        </div>
                    @endif
                </div>
                <div class="pt-6 border-t border-gray-200 flex items-center justify-between">
                    <a href="{{ route('admin.teams.index') }}" class="text-sm text-gray-600 hover:text-gray-900 transition">
                        ← Back to Team List
                    </a>
                    <button type="submit"
                        class="inline-flex items-center gap-2
                           bg-blue-600 hover:bg-blue-700
                           text-white px-6 py-2.5 rounded-lg
                           font-medium shadow-sm transition">
                        Update Member
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection
