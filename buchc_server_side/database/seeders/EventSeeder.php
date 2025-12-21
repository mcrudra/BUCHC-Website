<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        Event::insert([//for testing purpose
            [
                'title' => 'Monthly Arena Championship',
                'desc' => 'Our flagship monthly tournament where players compete for ranking points.',
                'date' => '2025-12-16',
                'time' => '5:00 PM',
                'location' => 'MPH',
                'img' => 'https://res.cloudinary.com/dxuezm3jb/image/upload/v1766079479/ChatGPT_Image_Dec_18_2025_11_34_59_PM_ft4uff.png',
                'is_past' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Strategy Workshop: Opening Theory',
                'desc' => 'Learn advanced opening strategies from our top-rated players.',
                'date' => '2025-12-20',
                'time' => '6:00 PM',
                'location' => 'BU Campus',
                'img' => '/events/chess2.jpg',
                'is_past' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Beginner’s Chess Bootcamp',
                'desc' => 'New to chess? Join our intensive beginner-friendly bootcamp.',
                'date' => '2026-01-05',
                'time' => '4:00 PM',
                'location' => 'BU Lab',
                'img' => '/events/chess3.jpg',
                'is_past' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // PAST EVENTS
            [
                'title' => 'Inter-University Championship 2024',
                'desc' => null,
                'date' => '2024-11-10',
                'time' => null,
                'location' => null,
                'img' => '/events/chess1.jpg',
                'is_past' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Annual Chess Festival',
                'desc' => null,
                'date' => '2024-10-05',
                'time' => null,
                'location' => null,
                'img' => '/events/chess3.jpg',
                'is_past' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Grandmasters’ Visit & Simul',
                'desc' => null,
                'date' => '2024-09-12',
                'time' => null,
                'location' => null,
                'img' => '/events/chess2.jpg',
                'is_past' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Blitz Chess Marathon',
                'desc' => null,
                'date' => '2024-08-18',
                'time' => null,
                'location' => null,
                'img' => '/events/chess1.jpg',
                'is_past' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
