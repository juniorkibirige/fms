<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterDeliveredByDistributionInput extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('distributions', function (Blueprint $table) {
            $table->dropColumn('delivered_by');
        });
        Schema::table('distributions', function (Blueprint $table) {
            $table->unsignedBigInteger('delivered_by')->nullable(false)->after('beneficiary_id')->default(1);
            $table->foreign('delivered_by')->on('suppliers')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('distributions', function (Blueprint $table) {
            $table->dropIndex('delivered_by');
            $table->dropColumn('delivered_by');
        });
        Schema::table('distributions', function (Blueprint $table) {
            $table->string('delivered_by');
        });
    }
}
