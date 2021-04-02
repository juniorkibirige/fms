<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateInputSupplierPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('input_supplier', function (Blueprint $table) {
            $table->unsignedBigInteger('input_id')->index();
            $table->foreign('input_id')->references('id')->on('inputs')->onDelete('cascade');
            $table->unsignedBigInteger('supplier_id')->index();
            $table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('cascade');
            $table->primary(['input_id', 'supplier_id']);
            $table->integer('quantity')->default(0)->nullable(false);
            $table->integer('rate')->nullable(false);
            $table->integer('total')->nullable(false);
            $table->string('date_supplied')->nullable();
            $table->string('status')->nullable(false);
            $table->unsignedBigInteger('office_id');
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
        Schema::dropIfExists('input_supplier');
    }
}
