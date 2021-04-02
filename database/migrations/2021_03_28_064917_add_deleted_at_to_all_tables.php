<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeletedAtToAllTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('admins', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('beneficiaries', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('constituencies', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('distribution_assessment', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('distribution_input', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('distributions', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('districts', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('input_supplier', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('inputs', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('office_user', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('offices', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('permission_role', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('permission_user', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('permissions', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('regions', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('role_user', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('roles', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('supplier_contacts', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('supplier_contracts', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('suppliers', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
        Schema::table('users', function (Blueprint $table) {
            $table->timestamp('deleted_at')->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('admins', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('beneficiaries', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('constituencies', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('distribution_assessment', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('distribution_input', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('distributions', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('districts', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('input_supplier', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('inputs', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('office_user', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('offices', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('permission_role', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('permission_user', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('permissions', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('regions', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('role_user', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('roles', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('supplier_contacts', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('supplier_contracts', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('suppliers', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
    }
}
