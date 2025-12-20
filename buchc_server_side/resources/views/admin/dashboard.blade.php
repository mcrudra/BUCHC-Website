@extends('admin.layout.app')

@section('content')
    <div class="p-6">
        <h1 class="text-4xl font-bold mb-6 text-gray-800">BUCHC Dashboard</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Events Card -->
            <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
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
            <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-600">Team Members</h2>
                        {{-- <p class="text-3xl font-bold text-gray-800 mt-2">{{ $totalTeamMembers }}</p> --}}
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

            <!-- Top Players Card -->
            <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-600">Top Players</h2>
                        {{-- <p class="text-3xl font-bold text-gray-800 mt-2">{{ $totalTopPlayers }}</p> --}}
                    </div>
                    <div class="bg-yellow-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.056 6.313a1 1 0 00.95.69h6.63c.969 0 1.371 1.24.588 1.81l-5.37 3.906a1 1 0 00-.364 1.118l2.056 6.313c.3.921-.755 1.688-1.54 1.118l-5.37-3.906a1 1 0 00-1.176 0l-5.37 3.906c-.784.57-1.838-.197-1.539-1.118l2.055-6.313a1 1 0 00-.364-1.118L2.825 11.74c-.783-.57-.38-1.81.588-1.81h6.63a1 1 0 00.95-.69l2.056-6.313z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activities / Quick Links -->
        <div class="mt-10">
            <h2 class="text-2xl font-bold mb-4 text-gray-700">Quick Actions</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a href="{{ route('admin.events.create') }}"
                    class="bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 transition text-center font-medium">
                    Add New Event
                </a>
                <a href="{{ route('admin.events.index') }}"
                    class="bg-green-600 text-white p-4 rounded-lg shadow hover:bg-green-700 transition text-center font-medium">
                    View All Events
                </a>
                <a href="{{ route('admin.dashboard') }}"
                    class="bg-yellow-500 text-white p-4 rounded-lg shadow hover:bg-yellow-600 transition text-center font-medium">
                    Refresh Dashboard
                </a>
            </div>
        </div>
    </div>
@endsection
