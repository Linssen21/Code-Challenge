import { Pagination as PaginationButton } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PaginationLink } from "../types/Customer";
import { Link } from "@tanstack/react-router";

export default function Pagination({ links }: { links: PaginationLink[] }) {
  const renderLinkLabel = (label: string) => {
    if (label === "&laquo; Previous") {
      return <FaChevronLeft />;
    }

    if (label === "Next &raquo;") {
      return <FaChevronRight />;
    }

    return label;
  };

  return (
    <PaginationButton>
      {links.length > 3 &&
        links.map((link, key) => (
          <li
            className={`page-item ${link.active ? "active" : ""} ${!link.url ? "disabled" : ""}`}
          >
            <Link
              className="page-link"
              key={key}
              to={`/?${link.url?.split("?")[1]}`}
            >
              {renderLinkLabel(link.label)}
            </Link>
          </li>
        ))}
    </PaginationButton>
  );
}
