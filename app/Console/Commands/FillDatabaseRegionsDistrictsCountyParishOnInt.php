<?php

namespace App\Console\Commands;

use App\Models\Constituency;
use App\Models\District;
use App\Models\Parishes;
use App\Models\Region;
use Illuminate\Console\Command;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Schema;

class FillDatabaseRegionsDistrictsCountyParishOnInt extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:fill';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add Location data to database once';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        DB::statement("SET foreign_key_checks=0");
        DB::table('regions')->truncate();
        DB::table('districts')->truncate();
        DB::table('constituencies')->truncate();
        DB::table('parishes')->truncate();
        $json_url = base_path('public/compiled_data/ugData.json');
        $json = file_get_contents($json_url);
        $data = json_decode($json, true);
        foreach ($data as $region => $districts) {
            $reg = [
                'name'=> $region,
                'slug'=>Str::lower($region)
            ];
            $rid = Region::create($reg);
            foreach ($districts as $district => $counties) {
                $dis = [
                    'name'=> $district,
                    'slug'=>Str::lower($district),
                    'region_id' => $rid->id
                ];
                $did = District::create($dis);
                foreach ($counties as $county => $parishes) {
                    $cou = [
                        'name'=> $county,
                        'slug'=>Str::lower($county),
                        'region_id' => $rid->id,
                        'district_id' => $did->id
                    ];
                    $cid = Constituency::create($cou);
                    foreach ($parishes as $index => $parish) {
                        $p = [
                            'name'=> $parish,
                            'slug'=>Str::lower($parish),
                            'region_id' => $rid->id,
                            'district_id' => $did->id,
                            'county_id' => $cid->id
                        ];
                        Parishes::create($p);
                    }
                }
            }
            $this->info("Database::Fill Added ".$region." with ".count($districts)." Districts!\n");
        }
        DB::statement("SET foreign_key_checks=1");
    }
}
