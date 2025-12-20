@extends('admin.layout.app')

@section('content')
    <h1 class="text-2xl font-bold mb-6">Edit Event</h1>

    <form action="{{ route('admin.events.update', $event) }}" method="POST" class="max-w-xl bg-white p-6 rounded shadow">
        @csrf
        @method('PUT')

        @include('admin.events.partials.form', ['event' => $event])

        <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            Update Event
        </button>
    </form>
@endsection
