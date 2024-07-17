import { createFileRoute } from "@tanstack/react-router";
import { Container, Table, Spinner, Button } from "react-bootstrap";
import CustomerRow from "../components/CustomerRow";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../actions/customer";
import { CustomersData, CustomerParams } from "../types/Customer";
import { useEffect, useState } from "react";
import AddCustomerModal from "../components/AddCustomerModal";
import DeleteCustomerModal from "../components/DeleteCustomerModal";
import { useSuccessContext } from "../state/SuccessContext";
import Pagination from "../components/Pagination";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown> = {}): CustomerParams => {
    const page = search?.page !== undefined ? Number(search.page) : undefined;
    const per_page =
      search?.per_page !== undefined ? Number(search.per_page) : undefined;
    return {
      page,
      per_page,
    };
  },
  component: Index,
});

function Index() {
  const { page, per_page } = Route.useSearch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const { success, setSuccess } = useSuccessContext();

  const handleCloseAdd = () => setShowAddModal(false);
  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseDel = () => setShowDelModal(false);
  const handleShowDel = () => setShowDelModal(true);

  const { isPending, isError, data, error, refetch, isRefetching } =
    useQuery<CustomersData>({
      queryKey: ["customers"],
      queryFn: () => getCustomers(page, per_page),
    });

  useEffect(() => {
    refetch();
  }, [page, per_page, refetch]);

  if (success) {
    refetch();
    setSuccess(false);
  }

  if (isPending || isRefetching) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="mt-5 text-center">
        <span>Error: {error.message}</span>
      </Container>
    );
  }

  console.log(data);

  return (
    <Container className="mt-5">
      <h3>Customer Table</h3>
      <Button className="my-4" onClick={handleShowAdd}>
        Add New Customer
      </Button>
      <AddCustomerModal show={showAddModal} handleClose={handleCloseAdd} />
      <DeleteCustomerModal
        show={showDelModal}
        handleClose={handleCloseDel}
        refetch={refetch}
      />
      {data && data?.customer_data ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.customer_data.data.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  id={customer.id}
                  firstName={customer.first_name}
                  lastName={customer.last_name}
                  email={customer.email}
                  contactNumber={customer.contact_number}
                  handleShowDel={handleShowDel}
                />
              ))}
            </tbody>
          </Table>
          <Pagination links={data?.customer_data.links} />
        </>
      ) : (
        <div className="mt-5 text-center">
          <span>No Data Available</span>
        </div>
      )}
    </Container>
  );
}
