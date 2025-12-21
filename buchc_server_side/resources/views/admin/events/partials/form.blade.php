<div class="space-y-4">

    <div>
        <label class="block text-sm font-medium mb-1">Title</label>
        <input type="text" name="title" value="{{ old('title', $event->title ?? '') }}"
            class="w-full border p-2 rounded" required>
    </div>

    <div>
        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea name="desc" class="w-full border p-2 rounded" rows="3">{{ old('desc', $event->desc ?? '') }}</textarea>
    </div>

    <div class="grid grid-cols-2 gap-4">
        <div>
            <label class="block text-sm font-medium mb-1">Date</label>
            <input type="date" name="date" value="{{ old('date', $event->date ?? '') }}"
                class="w-full border p-2 rounded" required>
        </div>

        <div>
            <label class="block text-sm font-medium mb-1">Time</label>
            <input type="text" name="time" value="{{ old('time', $event->time ?? '') }}"
                class="w-full border p-2 rounded">
        </div>
    </div>

    <div>
        <label class="block text-sm font-medium mb-1">Location</label>
        <input type="text" name="location" value="{{ old('location', $event->location ?? '') }}"
            class="w-full border p-2 rounded">
    </div>

    <div>
        <label class="block text-sm font-medium mb-1">Registration Link (Optional)</label>
        <input type="url" name="registration_link" value="{{ old('registration_link', $event->registration_link ?? '') }}"
            placeholder="https://example.com/register"
            class="w-full border p-2 rounded">
        <p class="text-xs text-gray-500 mt-1">Leave empty if registration is not available</p>
    </div>

    <div>
        <label class="block text-sm font-medium mb-1">Image URL</label>
        <input type="text" name="img" value="{{ old('img', $event->img ?? '') }}"
            class="w-full border p-2 rounded">
    </div>

    <div class="flex items-center gap-2">
        <input type="checkbox" name="is_past" value="1"
            {{ old('is_past', $event->is_past ?? false) ? 'checked' : '' }}>
        <label class="text-sm">Mark as past event</label>
    </div>

</div>
