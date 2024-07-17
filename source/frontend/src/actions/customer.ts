import {
  AddCustomerMessage,
  CustomerData,
  CustomersData,
  DelCustomerMessage,
  UpdateCustomerMessage,
} from "../types/Customer";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getCustomers = async (
  page: number = 1,
  perPage: number = 10
): Promise<CustomersData> => {
  const response = await fetch(
    `${API_URL}/list?page=${page}&per_page=${perPage}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const addCustomer = async (
  firstName: string,
  lastName: string,
  email: string,
  contactNumber: string
): Promise<AddCustomerMessage> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
      contact_number: contactNumber,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add customer");
  }

  const data = await response.json();
  return data;
};

export const updateCustomer = async (
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  contactNumber: string
): Promise<UpdateCustomerMessage> => {
  const response = await fetch(`${API_URL}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      contact_number: contactNumber,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update customer");
  }

  const data = await response.json();
  return data;
};

export const deleteCustomer = async (
  id: number
): Promise<DelCustomerMessage> => {
  const response = await fetch(`${API_URL}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete customer");
  }

  const data = await response.json();
  return data;
};

export const getCustomer = async (id: string): Promise<CustomerData> => {
  const response = await fetch(`${API_URL}/profile/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};
