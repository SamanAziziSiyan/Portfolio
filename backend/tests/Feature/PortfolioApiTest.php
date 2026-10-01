<?php

namespace Tests\Feature;

use App\Models\ContactSubmission;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PortfolioApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_project_and_experience_endpoints_expose_seeded_evidence(): void
    {
        $this->seed();

        $this->getJson('/api/v1/projects')
            ->assertOk()
            ->assertJsonCount(10, 'data')
            ->assertJsonPath('data.0.slug', 'blogina')
            ->assertJsonPath('data.0.evidence_type', 'Professional work')
            ->assertJsonPath('data.0.live_url', 'https://www.rtl-theme.com/blogina-wordpress-theme/')
            ->assertJsonPath('data.0.repository_url', null);

        $this->getJson('/api/v1/projects/amiramir-jewelry')
            ->assertOk()
            ->assertJsonPath('data.name', 'AMIRAMIR Jewelry');

        $this->getJson('/api/v1/projects/not-a-project')->assertNotFound();
        $this->getJson('/api/v1/experiences')->assertOk()->assertJsonCount(9, 'data')
            ->assertJsonPath('data.2.company', 'Dalga')
            ->assertJsonPath('data.4.role', 'Technical Team Lead')
            ->assertJsonPath('data.5.role', 'Full Stack Web Developer');
        $this->getJson('/api/v1/products')->assertOk()->assertJsonCount(2, 'data');
    }

    public function test_contact_requires_valid_fields_and_rejects_honeypot(): void
    {
        $this->postJson('/api/v1/contact', [
            'name' => 'A', 'email' => 'invalid', 'message' => 'short',
        ])->assertUnprocessable();

        $this->postJson('/api/v1/contact', [
            'name' => 'Jane Engineer',
            'email' => 'jane@example.com',
            'message' => 'A legitimate project enquiry with enough detail.',
            'website' => 'spam.example',
        ])->assertUnprocessable();

        $this->assertDatabaseCount('contact_submissions', 0);
    }

    public function test_contact_persists_valid_submission_and_throttles_repeats(): void
    {
        $payload = [
            'name' => 'Jane Engineer',
            'email' => 'JANE@example.com',
            'message' => 'A legitimate project enquiry with enough detail.',
        ];
        $this->postJson('/api/v1/contact', $payload)->assertCreated();
        $this->assertDatabaseHas('contact_submissions', ['email' => 'jane@example.com']);
        $this->assertSame(1, ContactSubmission::count());

        for ($attempt = 0; $attempt < 4; $attempt++) {
            $this->postJson('/api/v1/contact', $payload)->assertCreated();
        }
        $this->postJson('/api/v1/contact', $payload)->assertTooManyRequests();
    }
}
