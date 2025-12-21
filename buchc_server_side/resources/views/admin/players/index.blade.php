@extends('admin.layout.app')

@section('content')
    <div class="max-w-5xl mx-auto">

        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-semibold text-gray-800">Players</h1>
            <a href="{{ route('admin.players.create') }}"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Add Player
            </a>
        </div>

        <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div class="grid grid-cols-12 bg-blue-600 text-white px-6 py-3 font-semibold">
                <div class="col-span-2">Rank</div>
                <div class="col-span-3">Name</div>
                <div class="col-span-4 text-right">Points</div>
                <div class="col-span-3 text-right">Actions</div>
            </div>

            @foreach ($players as $player)
                <div class="grid grid-cols-12 items-center px-6 py-4 border-b border-gray-200 hover:bg-gray-50">
                    <div class="col-span-2">{{ $player->rank }}</div>
                    <div class="col-span-3">{{ $player->name }}</div>
                    <div class="col-span-4 text-right">{{ $player->points }}</div>
                    <div class="col-span-3 text-right flex justify-end gap-4">
                        <a href="{{ route('admin.players.edit', $player) }}"
                            class="text-blue-600 hover:text-blue-800">Edit</a>
                        <form method="POST" action="{{ route('admin.players.destroy', $player) }}">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="text-red-600 hover:text-red-800">Delete</button>
                        </form>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="mt-4">
            {{ $players->links() }}
        </div>
    </div>
@endsection
