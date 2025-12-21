@extends('admin.layout.app')

@section('content')
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Teams</h1>

        <a href="{{ route('admin.teams.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded">
            Add Member
        </a>
    </div>

    <table class="w-full bg-white shadow rounded">
        <thead class="bg-gray-100">
            <tr>
                <th class="p-2">Name</th>
                <th class="p-2">Position</th>
                <th class="p-2">Department</th>
                <th class="p-2">Email</th>
                <th class="p-2">Actions</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($teams as $team)
                <tr class="border-t text-center">
                    <td class="p-2">{{ $team->name }}</td>
                    <td class="p-2">{{ $team->position }}</td>
                    <td class="p-2 capitalize">{{ $team->department }}</td>
                    <td class="p-2">{{ $team->mail }}</td>
                    <td class="p-2">
                        <a href="{{ route('admin.teams.edit', $team) }}" class="text-blue-600">Edit</a>

                        <form action="{{ route('admin.teams.destroy', $team) }}" method="POST" class="inline">
                            @csrf
                            @method('DELETE')
                            <button class="text-red-600 ml-2">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="mt-4">
        {{ $teams->links() }}
    </div>
@endsection
