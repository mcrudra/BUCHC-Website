@extends('admin.layout.app')

@section('content')
    <div class="max-w-3xl mx-auto">
        <div class="mb-8">
            <h1 class="text-2xl font-semibold text-gray-800">Add Team Member</h1>
            <p class="text-sm text-gray-500 mt-1">
                Create a new member for the BUCHC team structure
            </p>
        </div>

        <div class="bg-white rounded-xl shadow-md border border-gray-200">
            <form method="POST" action="{{ route('admin.teams.store') }}" class="p-8 space-y-6">
                @csrf
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input type="text" name="name" required placeholder="e.g. Monish Chandra Rudra"
                        class="w-full rounded-lg border border-gray-300
                           px-4 py-2
                           focus:border-blue-500 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Department
                    </label>
                    <select name="department" id="department" required
                        class="w-full rounded-lg border border-gray-300
                           px-4 py-2
                           bg-white
                           focus:border-blue-500 focus:ring-blue-500">
                        <option value="">Select Department</option>
                        <option value="governing">Governing Body</option>
                        <option value="em">Event Management</option>
                        <option value="creative">Creative & IT</option>
                        <option value="training">Training & Research</option>
                        <option value="hr">Human Resource</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Position
                    </label>
                    <select name="position" id="position" required
                        class="w-full rounded-lg border border-gray-300
                           px-4 py-2
                           bg-white
                           focus:border-blue-500 focus:ring-blue-500">
                        <option value="">Select Department First</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input type="email" name="mail" placeholder="president@buccclub"
                        class="w-full rounded-lg border border-gray-300
                           px-4 py-2
                           focus:border-blue-500 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Photo URL
                    </label>
                    <input type="text" name="photo" placeholder="https://image-url.jpg"
                        class="w-full rounded-lg border border-gray-300
                           px-4 py-2
                           focus:border-blue-500 focus:ring-blue-500">
                </div>
                <div class="flex items-center justify-between pt-6 border-t border-gray-200">
                    <a href="{{ route('admin.teams.index') }}" class="text-sm text-gray-600 hover:text-gray-900">
                        ← Back to Team List
                    </a>
                    <button type="submit"
                        class="bg-blue-600 hover:bg-blue-700
                           text-white px-6 py-2
                           rounded-lg font-medium transition">
                        Save Member
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        const departmentSelect = document.getElementById('department');
        const positionSelect = document.getElementById('position');

        const governingPositions = [
            'President',
            'Vice President',
            'General Secretary',
            'Joint Secretary',
            'Treasurer',
            'General Co-ordinator'
        ];

        const departmentalPositions = [
            'Director',
            'Co-Director',
            'Asst. Director'
        ];

        function updatePositionOptions() {
            const department = departmentSelect.value;
            positionSelect.innerHTML = '<option value="">Select Position</option>';

            if (department === 'governing') {
                governingPositions.forEach(position => {
                    const option = document.createElement('option');
                    option.value = position;
                    option.textContent = position;
                    positionSelect.appendChild(option);
                });
            } else if (department && department !== '') {
                departmentalPositions.forEach(position => {
                    const option = document.createElement('option');
                    option.value = position;
                    option.textContent = position;
                    positionSelect.appendChild(option);
                });
            }
        }

        departmentSelect.addEventListener('change', updatePositionOptions);
    </script>
@endsection
