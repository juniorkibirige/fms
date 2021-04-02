<?php

use App\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Contracts\Role;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // foreach(config('project.user.roles') as $role) {
        //     Role::findOrCreate('admin', $role);

        //     $admins = [
        //         [
        //             'role' => 'administrator',
        //             'name' => 'Director',
        //             'email' => 'administrator@gmail.com',
        //             'password' => 'Secret'
        //         ],
        //         [
        //             'role' => 'moderator',
        //             'name' => 'Supervisor',
        //             'email' => 'moderator@gmail.com',
        //             'password' => 'Secret'
        //         ],
        //         [
        //             'role' => 'manager',
        //             'Clerk' => 'Manager',
        //             'email' => 'manager@gmail.com',
        //             'password' => 'Secret',
        //         ],
        //     ];

        //     foreach ($admins as $admin) {
        //         $exist = Admin::where('email', $admin['email'])->first();
        //         if(empty($exist)) {
        //             $super_admin = Admin::findOrCreate([
        //                 'name' => $admin['name'],
        //                 'email' => $admin['email'],
        //                 'password' => bcrypt($admin['password']),
        //             ]);
        //             $super_admin->assignRole($admin['role']);
        //         }
        //     }
        // }
         DB::table('users')->insert([
             'name' => 'Admin Admin',
             'email' => 'admin@argon.com',
             'email_verified_at' => now(),
             'password' => Hash::make('secret'),
             'created_at' => now(),
             'updated_at' => now()
         ]);
    }
}
