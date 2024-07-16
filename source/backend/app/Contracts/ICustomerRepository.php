<?php

declare(strict_types=1);

namespace App\Contracts;

use App\DTO\CustomerCreateDto;
use App\Models\Customer;
use Illuminate\Pagination\LengthAwarePaginator;

interface ICustomerRepository
{
    public function create(CustomerCreateDto $customerCreateDto): Customer;
    public function update(int $id, array $column): bool;
    public function find(array $column, mixed $mixOperator = "="): ?Customer;
    public function findAll(int $perPage = 10, int $page = 1): ?LengthAwarePaginator;
}
