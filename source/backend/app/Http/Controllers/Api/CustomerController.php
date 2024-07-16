<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\DTO\CustomerCreateDto;
use App\DTO\CustomerUpdateDto;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\DeleteRequest;
use App\Http\Requests\Api\RegistrationRequest;
use App\Http\Requests\Api\UpdateRequest;
use App\Service\CustomerService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CustomerController extends Controller
{
    public function __construct(private CustomerService $customerService)
    {
    }

    public function register(RegistrationRequest $request): JsonResponse
    {
        try {
            $customerCreate = new CustomerCreateDto(
                $request->get('first_name'),
                $request->get('last_name'),
                $request->get('email'),
                $request->get('contact_number'),
            );
            $result = $this->customerService->register($customerCreate);
            $status = $result['status'] == config('constants.STATUS_SUCCESS') ? 200 : 500;
            return response()->json($result, $status);
        } catch (\Throwable $e) {
            $message = "Registration failed, Unexpected error occur";
            Log::channel('applog')->error(
                '[Customer Create] ' . $message,
                ['message: ' => $e->getMessage()]
            );
            return response()->json([
                'message' => $message,
                'status' => config('constants.STATUS_FAILED')
            ]);
        }

    }

    public function update(UpdateRequest $request): JsonResponse
    {
        try {
            $customerUpdate = new CustomerUpdateDto(
                $request->input('id'),
                $request->input('first_name'),
                $request->input('last_name'),
                $request->input('email'),
                $request->input('contact_number'),
            );
            $result = $this->customerService->update($customerUpdate);
            $status = $result['status'] == config('constants.STATUS_SUCCESS') ? 200 : 500;
            return response()->json($result, $status);
        } catch (\Throwable $e) {
            $message = "Update failed, Unexpected error occur";
            Log::channel('applog')->error(
                '[Customer Update] ' . $message,
                ['message: ' => $e->getMessage()]
            );
            return response()->json([
                'message' => $message,
                'status' => config('constants.STATUS_FAILED')
            ]);
        }
    }

    public function delete(DeleteRequest $request): JsonResponse
    {
        try {
            $id = $request->input('id');
            $result = $this->customerService->delete($id);
            $status = $result['status'] == config('constants.STATUS_SUCCESS') ? 200 : 500;
            return response()->json($result, $status);
        } catch (\Throwable $e) {
            $message = "Delete failed, Unexpected error occur";
            Log::channel('applog')->error(
                '[Customer Delete] ' . $message,
                ['message: ' => $e->getMessage()]
            );
            return response()->json([
                'message' => $message,
                'status' => config('constants.STATUS_FAILED')
            ]);
        }
    }

    public function list(Request $request): JsonResponse
    {
        try {
            $perPage  = (int) $request->get('per_page', 10);
            $page = (int) $request->get('page', 1);

            $result = $this->customerService->listAll($perPage, $page);
            $status = $result['status'] == config('constants.STATUS_SUCCESS') ? 200 : 500;
            return response()->json($result, $status);
        } catch (\Throwable $e) {
            $message = "Customers not found, Unexpected error occur";
            Log::channel('applog')->error(
                '[Customer List] ' . $message,
                ['message: ' => $e->getMessage()]
            );
            return response()->json([
                'message' => $message,
                'status' => config('constants.STATUS_FAILED')
            ]);
        }
    }

    public function profile(Request $request): JsonResponse
    {
        try {
            $id = (int) $request->route('id');
            $result = $this->customerService->profile($id);
            $status = $result['status'] == config('constants.STATUS_SUCCESS') ? 200 : 500;
            return response()->json($result, $status);
        } catch (\Throwable $e) {
            $message = "Customer not found, Unexpected error occur";
            Log::channel('applog')->error(
                '[Customer Profile] ' . $message,
                ['message: ' => $e->getMessage()]
            );
            return response()->json([
                'message' => $message,
                'status' => config('constants.STATUS_FAILED')
            ]);
        }
    }

}
