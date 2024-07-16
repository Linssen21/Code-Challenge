<?php

declare(strict_types=1);

namespace App\Repository\MySql;

use App\Contracts\ICustomerRepository;
use App\DTO\CustomerCreateDto;
use App\Models\Customer;
use Illuminate\Pagination\LengthAwarePaginator;

class CustomerRepository implements ICustomerRepository
{
    public function __construct(private Customer $customerModel)
    {
    }

    public function create(CustomerCreateDto $customerCreateDto): Customer
    {
        return $this->customerModel->query()->create($customerCreateDto->toArray());
    }

    public function update(int $id, array $column): bool
    {
        $affectedRow = $this->customerModel->query()->where([
            ['id', '=', $id],
            ['is_delete', '=', 0]
        ])->update($column);

        return $affectedRow > 0;
    }

    public function find(array $column, mixed $mixOperator = "="): ?Customer
    {
        $queryCustomer = $this->customerModel->query()->where('is_delete', 0);
        foreach ($column as $columnField => $columnValue) {

            if ($queryCustomer->getQuery()->wheres) {
                $queryCustomer->orWhere($columnField, $mixOperator, $columnValue);
            } else {
                $queryCustomer->where($columnField, $mixOperator, $columnValue);
            }
        }

        return $queryCustomer->first();
    }

    public function findAll(int $perPage = 10, int $page = 1): ?LengthAwarePaginator
    {
        return $this->customerModel->query()->where('is_delete', 0)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);
    }
}
