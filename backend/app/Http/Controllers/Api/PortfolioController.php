<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use App\Models\PortfolioProduct;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class PortfolioController extends Controller
{
    public function projects(): JsonResponse
    {
        $projects = Project::with(['technologies', 'evidence'])->orderBy('sort_order')->get();

        return response()->json(['data' => $projects->map(fn (Project $project) => $this->projectData($project))]);
    }

    public function project(Project $project): JsonResponse
    {
        return response()->json(['data' => $this->projectData($project->load(['technologies', 'evidence']))]);
    }

    public function experiences(): JsonResponse
    {
        $experiences = Experience::with(['technologies', 'highlights'])->orderBy('sort_order')->get();

        return response()->json(['data' => $experiences->map(fn (Experience $experience) => [
            'company' => $experience->company,
            'role' => $experience->role,
            'period' => $experience->period,
            'start_date' => $experience->start_date,
            'end_date' => $experience->end_date,
            'summary' => $experience->summary,
            'evidence_type' => $experience->evidence_type,
            'link' => $experience->link,
            'technologies' => $experience->technologies->pluck('name')->all(),
            'highlights' => $experience->highlights->pluck('text')->all(),
        ])]);
    }

    public function products(): JsonResponse
    {
        return response()->json(['data' => PortfolioProduct::orderBy('sort_order')->get([
            'slug', 'name', 'label', 'summary', 'url', 'relationship', 'evidence_type',
        ])]);
    }

    private function projectData(Project $project): array
    {
        return [
            'slug' => $project->slug,
            'name' => $project->name,
            'kind' => $project->kind,
            'year' => $project->year,
            'category' => $project->category,
            'evidence_type' => $project->evidence_type,
            'visibility' => $project->visibility,
            'summary' => $project->summary,
            'problem' => $project->problem,
            'contribution' => $project->contribution,
            'architecture' => $project->architecture,
            'engineering_details' => $project->engineering_details,
            'repository_url' => $project->repository_url,
            'secondary_url' => $project->secondary_url,
            'live_url' => $project->live_url,
            'image_url' => $project->image_url,
            'image_alt' => $project->image_alt,
            'featured' => $project->featured,
            'technologies' => $project->technologies->pluck('name')->all(),
            'evidence' => $project->evidence->map->only(['label', 'url', 'type'])->all(),
        ];
    }
}
