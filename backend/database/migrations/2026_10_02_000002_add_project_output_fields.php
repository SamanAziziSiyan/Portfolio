<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table): void {
            $table->string('repository_url')->nullable()->change();
            $table->string('live_url')->nullable();
            $table->string('image_url')->nullable();
            $table->string('image_alt')->nullable();
        });
    }

    public function down(): void
    {
        DB::table('projects')->whereNull('repository_url')->update(['repository_url' => '']);
        Schema::table('projects', function (Blueprint $table): void {
            $table->dropColumn(['live_url', 'image_url', 'image_alt']);
            $table->string('repository_url')->nullable(false)->change();
        });
    }
};
