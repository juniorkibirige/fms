<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBeneficiariesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('beneficiaries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->nullable(false);
            $table->string('NIN')->nullable(false)->unique()->index();
            $table->string('gender')->nullable(false);
            $table->boolean('is_pwd')->nullable(false);
            $table->string('type_of_disability')->default('N/A');
            $table->string('phone_number')->nullable(false);
            $table->datetime('date_of_birth')->nullable(false);
            $table->integer('age');
            $table->unsignedBigInteger('district_id')->nullable(false);
            $table->foreign('district_id')->references('id')->on('districts');
            $table->unsignedBigInteger('county_id')->nullable(false);
            $table->foreign('county_id')->references('id')->on('constituencies');
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
        Schema::dropIfExists('beneficiaries');
    }
}
