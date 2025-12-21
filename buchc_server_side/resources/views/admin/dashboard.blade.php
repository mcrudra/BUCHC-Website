@extends('admin.layout.app')

@section('content')
    <div class="p-6">
        <!-- Page Title -->
        <h1 class="text-4xl font-bold mb-6 text-gray-800">BUCHC Admin Dashboard</h1>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            <!-- Events Card -->
            <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-600">Events</h2>
                        <p class="text-3xl font-bold text-gray-800 mt-2">{{ $totalEvents }}</p>
                    </div>
                    <div class="bg-blue-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Team Members Card -->
            <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-600">Team Members</h2>
                        <p class="text-3xl font-bold text-gray-800 mt-2">{{ $totalTeamMembers }}</p>
                    </div>
                    <div class="bg-green-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5.121 17.804A7 7 0 1118.804 5.122 7 7 0 015.12 17.804z" />
                        </svg>
                    </div>
                </div>
            </div>


        </div>

        <!-- Quick Actions -->
        <div class="mt-10">
            <h2 class="text-2xl font-bold mb-4 text-gray-700">Quick Actions</h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">

                <a href="{{ route('admin.events.create') }}"
                    class="bg-blue-600 text-white p-4 rounded-xl shadow hover:bg-blue-700 transition text-center font-medium">
                    Add New Event
                </a>

                <a href="{{ route('admin.events.index') }}"
                    class="bg-green-600 text-white p-4 rounded-xl shadow hover:bg-green-700 transition text-center font-medium">
                    View All Events
                </a>

                <a href="{{ route('admin.teams.create') }}"
                    class="bg-purple-600 text-white p-4 rounded-xl shadow hover:bg-purple-700 transition text-center font-medium">
                    Add Team Member
                </a>

            </div>
        </div>
    </div>
@endsection
