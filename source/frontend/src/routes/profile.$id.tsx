import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Alert,
} from "react-bootstrap";
import { getCustomer, updateCustomer } from "../actions/customer";
import { useForm } from "react-hook-form";
import { UpdateCustomerFormData } from "../types/Customer";
import { useState } from "react";

export const Route = createFileRoute("/profile/$id")({
  loader: async ({ params }) => {
    const customer = await getCustomer(params.id);
    return customer;
  },
  component: Profile,
});

function Profile() {
  const { id } = Route.useParams();
  const { customer } = Route.useLoaderData();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<UpdateCustomerFormData>({
    defaultValues: {
      id: customer.id,
      firstName: customer.first_name,
      lastName: customer.last_name,
      email: customer.email,
      contactNumber: customer.contact_number,
    },
  });

  const onSubmit = async (formData: UpdateCustomerFormData) => {
    try {
      setLoading(true);
      const { id, firstName, lastName, email, contactNumber } = formData;
      const data = await updateCustomer(
        id,
        firstName,
        lastName,
        email,
        contactNumber
      );
      if (!data.errors) {
        setShowSuccessAlert(true);
        setShowErrorAlert(false);
      } else {
        setShowSuccessAlert(false);
        setShowErrorAlert(true);
      }
    } catch (error) {
      setShowSuccessAlert(false);
      setShowErrorAlert(true);
      console.error("Failed to update customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      {showSuccessAlert && (
        <Alert variant="primary">Customer Update Success</Alert>
      )}
      {showErrorAlert && <Alert variant="danger">Customer Update Failed</Alert>}
      <h3>Customer Profile</h3>
      <p>Customer ID: {id}</p>
      <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                {...register("firstName")}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Doe"
                {...register("lastName")}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="test@gmail.com"
            {...register("email")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contact Number</Form.Label>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">+63</InputGroup.Text>
            <Form.Control
              type="tel"
              placeholder="9XXXXXXXXX"
              {...register("contactNumber")}
            />
          </InputGroup>
        </Form.Group>
        <div className="d-flex gap-2">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
          <Link className="btn btn-secondary" to="/">
            Back
          </Link>
        </div>
      </Form>
    </Container>
  );
}
