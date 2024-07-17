import React, { useState } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { addCustomer } from "../actions/customer";
import { useForm } from "react-hook-form";
import { useSuccessContext } from "../state/SuccessContext";
import { AddCustomerModalProps, CustomerFormData } from "../types/Customer";

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  show,
  handleClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomerFormData>();

  const [apiErrors, setApiErrors] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(false);
  const { setSuccess } = useSuccessContext();

  const onSubmit = async (formData: CustomerFormData) => {
    try {
      setLoading(true);
      const { firstName, lastName, email, contactNumber } = formData;
      const data = await addCustomer(firstName, lastName, email, contactNumber);
      if (!data.errors) {
        setSuccess(true);
        reset();
        setApiErrors({});
        handleClose();
      } else {
        setApiErrors(data.errors);
        console.error("Validation Errors:", data.errors);
      }
    } catch (error) {
      console.error("Failed to add customer");
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    reset();
    setApiErrors({});
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Customer</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          {Object.keys(apiErrors).length > 0 && (
            <Alert variant="danger">
              <ul className="mb-0">
                {Object.keys(apiErrors).map((key) =>
                  apiErrors[key].map((error, index) => (
                    <li key={key + index}>{error}</li>
                  ))
                )}
              </ul>
            </Alert>
          )}
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <Form.Text className="text-danger">
                {errors.firstName.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <Form.Text className="text-danger">
                {errors.lastName.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <Form.Text className="text-danger">
                {errors.email.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="contactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contact number"
              {...register("contactNumber", {
                required: "Contact number is required",
              })}
            />
            {errors.contactNumber && (
              <Form.Text className="text-danger">
                {errors.contactNumber.message}
              </Form.Text>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Save Changes"}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddCustomerModal;
