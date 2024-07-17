<?php

namespace Tests\Unit;

use App\Contracts\ICustomerRepository;
use App\DTO\CustomerCreateDto;
use App\DTO\CustomerUpdateDto;
use App\Models\Customer;
use App\Repository\MySql\CustomerRepository;
use App\Service\CustomerService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Pagination\LengthAwarePaginator;
use Mockery;
use Mockery\MockInterface;
use Tests\TestCase;

class CustomerServiceTest extends TestCase
{
    use RefreshDatabase;

    private Customer $customerMock;
    private CustomerService $customerService;

    /**
     * Create a mock user meta repository object, add reference with CustomerRepository Class and Mock Object class
     *
     * @var ICustomerRepository&MockInterface
     */
    private ICustomerRepository $customerRepositoryMock;


    protected function setUp(): void
    {
        parent::setUp();

        $this->customerRepositoryMock = $this->mock(CustomerRepository::class);
        $this->customerMock = new Customer([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@gmail.com',
            'contact_number' => '09111111111'
        ]);
        $this->customerService = new CustomerService($this->customerRepositoryMock);
    }

    public function test_create_customer(): void
    {
        // Arrange
        $createCustomerDto = new CustomerCreateDto('John', 'Doe', 'johndoe@gmail.com', '09111111111');
        $this->customerRepositoryMock->shouldReceive('create')
            ->with($createCustomerDto)
            ->andReturn($this->customerMock);

        // Act
        $createdCustomer = $this->customerService->register($createCustomerDto);

        // When
        $this->assertIsArray($createdCustomer);
        $this->assertEquals('Registration success', $createdCustomer['message']);
        $this->assertEquals(config('constants.STATUS_SUCCESS'), $createdCustomer['status']);
    }

    public function test_update_customer(): void
    {
        // Arrange
        $updateCustomerDto = new CustomerUpdateDto(1, 'John', 'Doe', 'johndoe@gmail.com', '09111111111');
        $this->customerRepositoryMock->shouldReceive('update')
            ->with(1, $updateCustomerDto->toArray())
            ->andReturn(true);

        // Act
        $updatedCustomer = $this->customerService->update($updateCustomerDto);

        // When
        $this->assertIsArray($updatedCustomer);
        $this->assertEquals('Update success', $updatedCustomer['message']);
        $this->assertEquals(config('constants.STATUS_SUCCESS'), $updatedCustomer['status']);
    }

    public function test_delete_customer(): void
    {
        // Arrange
        $id = 1;
        $this->customerRepositoryMock->shouldReceive('update')
            ->with(1, ['is_delete' => 1])
            ->andReturn(true);

        // Act
        $deletedCustomer = $this->customerService->delete($id);

        // When
        $this->assertIsArray($deletedCustomer);
        $this->assertEquals('Delete success', $deletedCustomer['message']);
        $this->assertEquals(config('constants.STATUS_SUCCESS'), $deletedCustomer['status']);
    }

    public function test_list_all_customer(): void
    {
        // Arrange
        $data = [
            'current_page' => 1,
            'data' => [
                $this->customerMock->toArray()
            ],
            'total' => 1,
            'per_page' => 1,
            'current_page' => 1,
        ];

        $paginator = Mockery::mock(LengthAwarePaginator::class);
        $paginator->shouldReceive('toArray')->andReturn($data);
        $paginator->shouldReceive('count')->andReturn(1);

        $this->customerRepositoryMock->shouldReceive('findAll')
            ->with(10, 1)
            ->andReturn($paginator);

        // Act
        $customers = $this->customerService->listAll();

        // When
        $this->assertCount(1, $customers['customer_data']['data']);
    }

    public function test_get_customer(): void
    {
        // Arrange
        $id = 1;
        $this->customerRepositoryMock->shouldReceive('find')
            ->with(['id' => 1], '=')
            ->andReturn($this->customerMock);

        // Act
        $customer = $this->customerService->profile($id);

        // When
        $this->assertIsArray($customer);
        $this->assertEquals('Customer found', $customer['message']);
        $this->assertEquals($this->customerMock->toArray(), $customer['customer']);
        $this->assertEquals(config('constants.STATUS_SUCCESS'), $customer['status']);
    }



    protected function tearDown(): void
    {
        parent::tearDown();
        // Clean up mocks after each test
        \Mockery::close();
    }


}
