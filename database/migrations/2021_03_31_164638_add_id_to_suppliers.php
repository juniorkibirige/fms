<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIdToSuppliers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("SET foreign_key_checks=0");
        Schema::table('suppliers', function (Blueprint $table) {
            $table->unsignedBigInteger('region_id');
            $table->foreign('region_id')->references('id')->on('regions')
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
        //
    }
}
