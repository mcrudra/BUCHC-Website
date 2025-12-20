@extends('admin.layout.app')

@section('content')
    <h1 class="text-2xl font-bold mb-6">Create Event</h1>

    <form action="{{ route('admin.events.store') }}" method="POST" class="max-w-xl bg-white p-6 rounded shadow">
        @csrf

        @include('admin.events.partials.form', ['event' => null])

        <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            Save Event
        </button>
    </form>
@endsection
