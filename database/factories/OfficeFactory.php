<?php

namespace Database\Factories;

use App\Models\Office;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class OfficeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Office::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $name = $this->faker->name;
        return [
            'name' => $name,
            'email' => $this->faker->email,
            'address' => $this->faker->address,
            'phone_number' => $this->faker->phoneNumber,
            'slug' => Str::slug($name),
            'district_id' => 1,
            'constituency_id' => 1,
            'region_id' => 1,
        ];
    }
}
