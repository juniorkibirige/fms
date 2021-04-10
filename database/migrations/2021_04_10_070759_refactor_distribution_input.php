<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RefactorDistributionInput extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('distribution_input', function (Blueprint $table) {
            $table->dropColumn('assessed_qty');
            $table->dropColumn('reconciled');
        });
        Schema::table('distribution_input', function (Blueprint $table) {
            $table->integer('assessed_qty')->nullable();
            $table->integer('reconciled')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('distribution_input', function (Blueprint $table) {
            $table->integer('assessed_qty')->nullable();
            $table->integer('reconciled')->nullable();
        });
    }
}
