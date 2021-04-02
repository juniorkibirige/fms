<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDistributionAssessmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('distribution_assessment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('distribution_id')->nullable(false);
            $table->foreign('distribution_id')->references('id')->on('distributions');
            $table->string('assessed_by')->nullable(false);
            $table->datetime('assessed_on')->nullable(false);
            $table->string('beneficiary_acknowledgement')->nullable(false);
            $table->string('narrative')->nullable(false);
            $table->unsignedBigInteger('office_id')->nullable(false);
            $table->foreign('office_id')->references('id')->on('offices')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('distribution_assessment');
    }
}
