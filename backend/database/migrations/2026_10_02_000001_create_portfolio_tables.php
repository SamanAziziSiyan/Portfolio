<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('technologies', function (Blueprint $table): void {
            $table->id();
            $table->string('name')->unique();
        });

        Schema::create('projects', function (Blueprint $table): void {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('kind');
            $table->string('year', 24);
            $table->string('category', 32)->index();
            $table->string('evidence_type', 32);
            $table->string('visibility');
            $table->text('summary');
            $table->text('problem');
            $table->text('contribution');
            $table->text('architecture');
            $table->text('engineering_details');
            $table->string('repository_url');
            $table->string('secondary_url')->nullable();
            $table->boolean('featured')->default(false)->index();
            $table->unsignedSmallInteger('sort_order');
            $table->timestamps();
        });

        Schema::create('project_technology', function (Blueprint $table): void {
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('technology_id')->constrained()->cascadeOnDelete();
            $table->primary(['project_id', 'technology_id']);
        });

        Schema::create('project_evidence', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('label');
            $table->string('url');
            $table->string('type', 32);
        });

        Schema::create('experiences', function (Blueprint $table): void {
            $table->id();
            $table->string('company');
            $table->string('role');
            $table->string('period');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->text('summary');
            $table->string('evidence_type', 32);
            $table->string('link')->nullable();
            $table->unsignedSmallInteger('sort_order');
            $table->timestamps();
        });

        Schema::create('experience_highlights', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('experience_id')->constrained()->cascadeOnDelete();
            $table->text('text');
            $table->unsignedSmallInteger('sort_order');
        });

        Schema::create('experience_technology', function (Blueprint $table): void {
            $table->foreignId('experience_id')->constrained()->cascadeOnDelete();
            $table->foreignId('technology_id')->constrained()->cascadeOnDelete();
            $table->primary(['experience_id', 'technology_id']);
        });

        Schema::create('products', function (Blueprint $table): void {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('label');
            $table->text('summary');
            $table->string('url');
            $table->string('relationship');
            $table->string('evidence_type', 32);
            $table->unsignedSmallInteger('sort_order');
            $table->timestamps();
        });

        Schema::create('contact_submissions', function (Blueprint $table): void {
            $table->id();
            $table->string('name', 120);
            $table->string('email', 254);
            $table->text('message');
            $table->string('status', 16)->default('new');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_submissions');
        Schema::dropIfExists('products');
        Schema::dropIfExists('experience_technology');
        Schema::dropIfExists('experience_highlights');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('project_evidence');
        Schema::dropIfExists('project_technology');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('technologies');
    }
};
