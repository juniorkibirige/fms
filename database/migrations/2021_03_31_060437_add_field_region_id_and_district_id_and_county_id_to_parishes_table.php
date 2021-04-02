<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddFieldRegionIdAndDistrictIdAndCountyIdToParishesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("SET foreign_key_checks=0");
        Schema::table('parishes', function (Blueprint $table) {
            $table->unsignedBigInteger('region_id');
            $table->foreign('region_id')->references('id')->on('regions')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('district_id');
            $table->foreign('district_id')->references('id')->on('districts')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('county_id');
            $table->foreign('county_id')->references('id')->on('constituencies')
                ->onDelete('cascade')->onUpdate('cascade');
        });
        DB::statement("SET foreign_key_checks=1");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('parishes', function (Blueprint $table) {
            $table->dropColumn('region_id');
            $table->dropColumn('district_id');
            $table->dropColumn('county_id');
        });
    }
}
