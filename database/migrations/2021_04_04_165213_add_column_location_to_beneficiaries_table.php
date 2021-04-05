<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnLocationToBeneficiariesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("SET foreign_key_checks=0");
        Schema::table('beneficiaries', function (Blueprint $table) {
            $table->unsignedBigInteger('region_id')->after('age');
            $table->unsignedBigInteger('parish_id')->after('county_id');
            $table->foreign('region_id')->references('id')->on('regions')->onDelete('restrict')->onUpdate('cascade');
            $table->foreign('parish_id')->references('id')->on('parishes')->onDelete('restrict')->onUpdate('cascade');
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
        Schema::table('beneficiaries', function (Blueprint $table) {
            $table->dropIfExists();
        });
    }
}
