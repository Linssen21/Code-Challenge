<?php

namespace Tests\Feature;

use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Customer::factory()->create([
            'id' => 1,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@gmail.com',
            'contact_number' => '12312312312312312312312312331',
            'is_delete' => 0
        ]);
    }

    public function test_customer_register(): void
    {
        // Act
        $response = $this->postJson('/api/v2/customer/register', [
            'first_name' => 'FirstTest',
            'last_name' => 'LastTest',
            'email' => 'test@gmail.com',
            'contact_number' => '09111111111'
        ]);

        // When
        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Registration success',
                'status' => config('constants.STATUS_SUCCESS'),
            ]);
    }

    public function test_customer_update(): void
    {
        // Act
        $response = $this->postJson('/api/v2/customer/update', [
            'id' => 1,
            'first_name' => 'John Update',
            'last_name' => 'Doe',
            'email' => 'johndoeupdate@gmail.com',
            'contact_number' => '09111111111'
        ]);

        // When
        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Update success',
                'status' => config('constants.STATUS_SUCCESS'),
            ]);
    }

    public function test_customer_delete(): void
    {
        // Act
        $response = $this->postJson('/api/v2/customer/delete', ['id' => 1]);

        // When
        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Delete success',
                'status' => config('constants.STATUS_SUCCESS'),
            ]);
    }

    public function test_customer_list(): void
    {
        // Act
        $response = $this->getJson('/api/v2/customer/list');

        // When
        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Customers found',
                'status' => config('constants.STATUS_SUCCESS'),
            ]);
    }

    public function test_customer_profile(): void
    {
        // Act
        $response = $this->getJson('/api/v2/customer/profile/1');

        // When
        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Customer found',
                'status' => config('constants.STATUS_SUCCESS'),
            ]);
    }


    protected function tearDown(): void
    {
        parent::tearDown();
    }
}
