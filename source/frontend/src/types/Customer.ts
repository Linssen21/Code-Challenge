export interface CustomerProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  handleShowDel: () => void;
}

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  is_delete: number;
  created_at: string;
  updated_at: string;
}

export interface CustomersData {
  customer_data?: {
    current_page: number;
    data: Customer[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      url: string;
      label: string;
      active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
  message: string;
  status: boolean;
}

export type CustomerParams = {
  page?: number;
  per_page?: number;
};

export interface AddCustomerMessage {
  errors?: {
    email?: string[];
    contact_number?: string[];
    first_name?: string[];
    last_name?: string[];
  };
  status: boolean;
  message: string;
}

export interface UpdateCustomerMessage {
  errors?: {
    id?: string[];
    email?: string[];
    contact_number?: string[];
    first_name?: string[];
    last_name?: string[];
  };
  status: boolean;
  message: string;
}

export interface DelCustomerMessage {
  errors?: {
    id?: string[];
  };
  status: boolean;
  message: string;
}

export interface AddCustomerModalProps {
  show: boolean;
  handleClose: () => void;
}

export interface DelCustomerModalProps {
  show: boolean;
  handleClose: () => void;
  refetch: () => void;
}

export interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
}

export interface UpdateCustomerFormData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
}

export interface DeleteCustomerFormData {
  id: number;
}

export interface CustomerData {
  customer: Customer;
  message: string;
  status: boolean;
}

export interface PaginationLink {
  url: string;
  label: string;
  active: boolean;
}

export interface Pagination {
  current_page: number;
  first_page_url: string;
  from: string;
  last_page: string;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}
