<?php

namespace Database\Seeders;

use App\Models\Experience;
use App\Models\PortfolioProduct;
use App\Models\Project;
use App\Models\Technology;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $path = env('PORTFOLIO_CONTENT_PATH', base_path('../packages/content/portfolio.json'));
        $content = json_decode(file_get_contents($path), true, flags: JSON_THROW_ON_ERROR);

        DB::transaction(function () use ($content): void {
            $projectIds = [];
            foreach ($content['projects'] as $index => $row) {
                $technologies = $row['technologies'];
                $evidence = $row['evidence'];
                unset($row['technologies'], $row['evidence']);
                $project = Project::updateOrCreate(['slug' => $row['slug']], [...$row, 'sort_order' => $index]);
                $projectIds[] = $project->id;
                $project->technologies()->sync($this->technologyIds($technologies));
                $project->evidence()->delete();
                $project->evidence()->createMany($evidence);
            }
            Project::whereNotIn('id', $projectIds)->delete();

            $experienceIds = [];
            foreach ($content['experiences'] as $index => $row) {
                $technologies = $row['technologies'];
                $highlights = $row['highlights'];
                unset($row['technologies'], $row['highlights']);
                $experience = Experience::updateOrCreate(
                    ['company' => $row['company'], 'role' => $row['role']],
                    [...$row, 'sort_order' => $index],
                );
                $experienceIds[] = $experience->id;
                $experience->technologies()->sync($this->technologyIds($technologies));
                $experience->highlights()->delete();
                foreach ($highlights as $position => $text) {
                    $experience->highlights()->create(['text' => $text, 'sort_order' => $position]);
                }
            }
            Experience::whereNotIn('id', $experienceIds)->delete();

            $productIds = [];
            foreach ($content['products'] as $index => $row) {
                $product = PortfolioProduct::updateOrCreate(['slug' => $row['slug']], [...$row, 'sort_order' => $index]);
                $productIds[] = $product->id;
            }
            PortfolioProduct::whereNotIn('id', $productIds)->delete();
        });
    }

    private function technologyIds(array $names): array
    {
        return array_map(
            fn (string $name): int => Technology::firstOrCreate(['name' => $name])->id,
            $names,
        );
    }
}
