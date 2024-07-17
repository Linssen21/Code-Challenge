<?php

declare(strict_types=1);

namespace App\Service;

use App\Contracts\ICustomerRepository;
use App\DTO\CustomerCreateDto;
use App\DTO\CustomerUpdateDto;

class CustomerService
{
    public function __construct(private ICustomerRepository $customerRepository)
    {
    }

    public function register(CustomerCreateDto $customerCreate): array
    {
        $customer = $this->customerRepository->create($customerCreate);
        if (!$customer) {
            return [
                'message' => 'Registration failed',
                'status' => config('constants.STATUS_FAILED')
            ];
        }

        return [
            'message' => 'Registration success',
            'status' => config('constants.STATUS_SUCCESS')
        ];
    }

    public function update(CustomerUpdateDto $customerUpdate): array
    {
        $isUpdated = $this->customerRepository->update($customerUpdate->getId(), $customerUpdate->toArray());
        if (!$isUpdated) {
            return [
                'message' => 'Update failed',
                'status' => config('constants.STATUS_FAILED')
            ];
        }

        return [
            'message' => 'Update success',
            'status' => config('constants.STATUS_SUCCESS')
        ];
    }

    public function delete(int $id): array
    {
        $isDeleted = $this->customerRepository->update($id, ['is_delete' => 1]);
        if (!$isDeleted) {
            return [
                'message' => 'Delete failed',
                'status' => config('constants.STATUS_FAILED')
            ];
        }

        return [
            'message' => 'Delete success',
            'status' => config('constants.STATUS_SUCCESS')
        ];
    }

    public function listAll(int $perPage = 10, int $page = 1): array
    {
        $customers = $this->customerRepository->findAll($perPage, $page);
        if ($customers->count() == 0) {
            return [
                'message' => 'Customers not found',
                'status' => config('constants.STATUS_FAILED')
            ];
        }

        return [
            'customer_data' => $customers->toArray(),
            'message' => 'Customers found',
            'status' => config('constants.STATUS_SUCCESS')
        ];
    }

    public function profile(int $id): array
    {
        $customer = $this->customerRepository->find(['id' => $id], "=");

        if (!$customer) {
            return [
                'message' => 'Customer not found',
                'status' => config('constants.STATUS_FAILED')
            ];
        }

        return [
            'customer' => $customer->toArray(),
            'message' => 'Customer found',
            'status' => config('constants.STATUS_SUCCESS')
        ];
    }
}
