import React from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { RxAvatar } from "react-icons/rx";
import { TiDelete } from "react-icons/ti";
import { CustomerProps } from "../types/Customer";
import { Link } from "@tanstack/react-router";
import { useDeleteCustomerContext } from "../state/DeleteCustomerContext";

const CustomerRow: React.FC<CustomerProps> = ({
  id,
  firstName,
  lastName,
  email,
  contactNumber,
  handleShowDel,
}) => {
  const { setCustomerId } = useDeleteCustomerContext();
  const onShowDelModal = () => {
    setCustomerId(id);
    handleShowDel();
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{contactNumber}</td>
      <td className="d-flex gap-2 justify-content-center">
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>View Customer Profile</Tooltip>}
        >
          <Button className="fs-4 d-flex" variant="info">
            <Link
              className="d-flex justify-content-center align-items-center"
              to={`/profile/${id}`}
            >
              <RxAvatar />
            </Link>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>Delete Customer</Tooltip>}
        >
          <Button
            className="fs-4 d-flex justify-content-center align-items-center"
            variant="danger"
            onClick={onShowDelModal}
          >
            <TiDelete />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
};

export default CustomerRow;
