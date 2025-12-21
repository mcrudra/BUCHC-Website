@extends('admin.layout.app')

@section('content')
    <div class="max-w-3xl mx-auto">
        <div class="mb-8">
            <h1 class="text-2xl font-semibold text-gray-800">Add Player</h1>
            <p class="text-sm text-gray-500 mt-1">Add a new player to the rankings</p>
        </div>

        <div class="bg-white rounded-xl shadow-md border border-gray-200">
            <form method="POST" action="{{ route('admin.players.update', $player) }}" class="p-8 space-y-6">
                @csrf
                @method('PUT')
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Rank</label>
                    <input type="number" name="rank" required value="{{ old('rank', $player->rank) }}"
                        class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" name="name" required
                        value="{{ old('name', $player->name) }}"class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Points</label>
                    <input type="number" name="points" required
                        value="{{ old('points', $player->points) }}"class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500">
                </div>

                <div class="flex items-center justify-between pt-6 border-t border-gray-200">
                    <a href="{{ route('admin.players.index') }}" class="text-sm text-gray-600 hover:text-gray-900">←
                        Back</a>
                    <button type="submit"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">Save
                        Player</button>
                </div>

            </form>
        </div>
    </div>
@endsection
