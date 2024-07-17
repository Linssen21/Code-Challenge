import { Alert, Button, Modal } from "react-bootstrap";
import { DelCustomerModalProps } from "../types/Customer";
import { useDeleteCustomerContext } from "../state/DeleteCustomerContext";
import { deleteCustomer } from "../actions/customer";
import { useState } from "react";

const DeleteCustomerModal: React.FC<DelCustomerModalProps> = ({
  show,
  handleClose,
  refetch,
}) => {
  const { customerId } = useDeleteCustomerContext();
  const [apiErrors, setApiErrors] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (customerId) {
        const data = await deleteCustomer(customerId);
        if (!data.errors) {
          setApiErrors({});
          handleClose();
          refetch();
        }
      } else {
        console.error("Customer ID is not available.");
      }
    } catch (error) {
      console.error("Failed to delete customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Customer</Modal.Title>
      </Modal.Header>
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
        <h5>Are you sure you want to delete this customer?</h5>
        <div>{`Customer ID: ${customerId}`}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleSubmit} disabled={loading}>
          {loading ? "Deleting..." : "Yes"}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCustomerModal;
