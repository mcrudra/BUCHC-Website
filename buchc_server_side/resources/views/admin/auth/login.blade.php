<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BUCHC Admin Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body
    class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 h-screen flex items-center justify-center font-sans">

    <div class="relative w-96">
        <div class="absolute inset-0 bg-black/10 grid grid-cols-8 grid-rows-8 pointer-events-none">
            <div class="col-span-1 row-span-1 bg-white/20"></div>
            <div class="col-span-1 row-span-1 bg-gray-800/30"></div>
            <div class="col-span-1 row-span-1 bg-white/20"></div>
            <div class="col-span-1 row-span-1 bg-gray-800/30"></div>
            <div class="col-span-1 row-span-1 bg-white/20"></div>
            <div class="col-span-1 row-span-1 bg-gray-800/30"></div>
            <div class="col-span-1 row-span-1 bg-white/20"></div>
            <div class="col-span-1 row-span-1 bg-gray-800/30"></div>
        </div>
        <form method="POST" action="{{ route('admin.login') }}"
            class="relative bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 z-10">
            @csrf
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">BUCHC Admin Login</h2>
            <div class="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-yellow-500" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 2L9 8H15L12 2ZM8 10V22H16V10H8Z" />
                </svg>
            </div>
            <div class="mb-4">
                <input type="email" name="email" placeholder="Email"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                    required>
            </div>
            <div class="mb-4">
                <input type="password" name="password" placeholder="Password"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                    required>
            </div>
            @error('email')
                <p class="text-red-500 text-sm mb-3 text-center">{{ $message }}</p>
            @enderror
            <button
                class="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 rounded-lg shadow-lg transition-all">
                Login
            </button>
            <p class="text-xs text-gray-600 mt-4 text-center">
                Brac University Chess Club - Admin Panel
            </p>
        </form>
    </div>
</body>

</html>
