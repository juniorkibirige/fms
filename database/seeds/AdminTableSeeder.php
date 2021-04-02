<?php

use App\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // let env = [
        //     "DEV_NAME" => "Test",
        //     "DEV_EMAIL" => "test@gmail.com",
        //     "DEV_PASSWORD" => "secret",
        //     "ADMIN_PREFIX" => "admin",
        // ];
        echo config('project');
        foreach ([
            'administrator' => 'administrator',
            'moderator' => 'moderator',
            'manager' => 'manager',
        ] as $role) {
            Role::findOrCreate('admin', $role);

            $admins = [
                [
                    'role' => 'administrator',
                    'name' => 'Director',
                    'email' => 'administrator@gmail.com',
                    'password' => 'Secret'
                ],
                [
                    'role' => 'moderator',
                    'name' => 'Supervisor',
                    'email' => 'moderator@gmail.com',
                    'password' => 'Secret'
                ],
                [
                    'role' => 'manager',
                    'name' => 'Manager',
                    'email' => 'manager@gmail.com',
                    'password' => 'Secret',
                ],
            ];

            foreach ($admins as $admin) {
                $exist = Admin::where('email', $admin['email'])->first();
                if (empty($exist)) {
                    echo implode(" - ", $admin);
                    $super_admin = Admin::create([
                        'name' => $admin['name'],
                        'email' => $admin['email'],
                        'password' => bcrypt($admin['password']),
                    ]);
                    $super_admin->assignRole($admin['role']);
                }
            }
        }
        DB::table('admins')->insert([
            'name' => 'Admin Admin',
            'email' => 'admin@argon.com',
            'email_verified_at' => now(),
            'password' => Hash::make('secret'),
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
