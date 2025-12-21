<aside class="w-64 bg-white shadow-md">
    <div class="p-6 font-bold text-xl border-b">Admin Panel</div>

    <nav class="p-4 space-y-2">
        <a href="{{ route('admin.dashboard') }}" class="block p-2 hover:bg-gray-100">Dashboard</a>
        <a href="{{ route('admin.events.index') }}" class="block p-2 hover:bg-gray-100">Events</a>
        <a href="{{ route('admin.teams.index') }}" class="block p-2 hover:bg-gray-100">Team</a>
        <a href="{{ route('admin.players.index') }}" class="block p-2 hover:bg-gray-100">Top Players</a>

        <form method="POST" action="{{ route('admin.logout') }}">
            @csrf
            <button class="w-full text-left p-2 text-red-600 hover:bg-gray-100">
                Logout
            </button>
        </form>
    </nav>
</aside>
