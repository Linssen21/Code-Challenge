<?php

declare(strict_types=1);

namespace App\DTO;

class CustomerUpdateDto
{
    private int $id;
    private string $first_name;
    private string $last_name;
    private string $email;
    private string $contact_number;


    public function __construct(
        int $id,
        string $first_name,
        string $last_name,
        string $email,
        string $contact_number
    ) {
        $this->id = $id;
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->email = $email;
        $this->contact_number = $contact_number;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getFirstName(): string
    {
        return $this->first_name;
    }

    public function getLastName(): string
    {
        return $this->last_name;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getContactNumber(): string
    {
        return $this->contact_number;
    }

    public function toArray(): array
    {
        return [
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'contact_number' => $this->contact_number,
        ];
    }


}
