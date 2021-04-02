<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDistributionInputPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('distribution_input', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->unique()->index();
            $table->unsignedBigInteger('distribution_id')->index();
            $table->foreign('distribution_id')->references('id')->on('distributions')->onDelete('cascade');
            $table->unsignedBigInteger('input_id')->index();
            $table->foreign('input_id')->references('id')->on('inputs')->onDelete('cascade');
            $table->integer('quantity')->nullable(false);
            $table->integer('assessed_qty')->nullable('false');
            $table->integer('reconciled')->nullable(false);
            $table->primary(['distribution_id', 'input_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('distribution_input');
    }
}
