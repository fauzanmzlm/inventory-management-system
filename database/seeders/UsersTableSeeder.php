<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Fauzan',
            'email' => 'admin@gmail.com',
            'email_verified_at' => Carbon::now(),
            'password' => md5('password'),
            'created_at' => Carbon::now(),
        ]);
    }
}
