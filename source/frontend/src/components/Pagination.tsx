import { Pagination as PaginationButton } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PaginationLink } from "../types/Customer";

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
          <PaginationButton.Item
            key={key}
            disabled={!link.url}
            className={link.active ? "active" : ""}
            href={`/?${link.url?.split("?")[1]}`}
          >
            {renderLinkLabel(link.label)}
          </PaginationButton.Item>
        ))}
    </PaginationButton>
  );
}
