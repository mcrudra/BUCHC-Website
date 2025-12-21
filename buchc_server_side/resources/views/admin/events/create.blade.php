@extends('admin.layout.app')

@section('content')
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div class="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
            <h1 class="text-3xl font-bold mb-6 text-center text-gray-900">Create Event</h1>
            <form action="{{ route('admin.events.store') }}" method="POST" class="space-y-6">
                @csrf
                @include('admin.events.partials.form', ['event' => null])
                <div>
                    <button type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition">
                        Save Event
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection
