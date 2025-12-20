<!DOCTYPE html>
<html>

<head>
    <title>Admin Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 h-screen flex items-center justify-center">

    <form method="POST" action="{{ route('admin.login') }}" class="bg-white p-6 rounded shadow w-96">
        @csrf

        <h2 class="text-xl font-bold mb-4">Admin Login</h2>

        <input type="email" name="email" placeholder="Email" class="w-full border p-2 mb-3" required>

        <input type="password" name="password" placeholder="Password" class="w-full border p-2 mb-3" required>

        @error('email')
            <p class="text-red-500 text-sm mb-2">{{ $message }}</p>
        @enderror

        <button class="bg-blue-600 text-white w-full py-2 rounded">
            Login
        </button>
    </form>

</body>

</html>
