<!DOCTYPE html>
<html>

<head>
    <title>Admin Panel</title>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 min-h-screen">

    <div class="flex">
        <!-- Sidebar -->
        <aside class="w-64 bg-gray-900 text-white min-h-screen p-4">
            <h2 class="text-xl font-bold mb-6">BUCHC Admin Panel</h2>

            <nav class="space-y-2">
                <a href="{{ route('admin.dashboard') }}" class="block px-3 py-2 rounded hover:bg-gray-700">
                    Dashboard
                </a>

                <a href="{{ route('admin.events.index') }}" class="block px-3 py-2 rounded hover:bg-gray-700">
                    Events
                </a>
                <a href="{{ route('admin.teams.index') }}" class="block px-3 py-2 rounded hover:bg-gray-700">
                    Buchc Panel + Director
                </a>
                <a href="{{ route('admin.players.index') }}" class="block px-3 py-2 rounded hover:bg-gray-700">
                    Top 10 Players
                </a>
                <a href="{{ route('admin.settings.index') }}" class="block px-3 py-2 rounded hover:bg-gray-700">
                    Settings
                </a>

                <form method="POST" action="{{ route('admin.logout') }}">
                    @csrf
                    <button class="w-full text-left px-3 py-2 rounded hover:bg-red-600">
                        Logout
                    </button>
                </form>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 p-6">
            @yield('content')
        </main>
    </div>

</body>

</html>
