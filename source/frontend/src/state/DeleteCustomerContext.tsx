import { ReactNode } from "@tanstack/react-router";
import React, { createContext, useContext, useState } from "react";

interface DeleteCustomerContextType {
  customerId: number | null; // Change type to number | null
  setCustomerId: React.Dispatch<React.SetStateAction<number | null>>; // Change dispatch type
}

const DeleteCustomerContext = createContext<DeleteCustomerContextType>({
  customerId: null,
  setCustomerId: () => {},
});

export const useDeleteCustomerContext = () => useContext(DeleteCustomerContext);

export const DeleteCustomerContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [customerId, setCustomerId] = useState<number | null>(null); // Initialize with null for number

  return (
    <DeleteCustomerContext.Provider value={{ customerId, setCustomerId }}>
      {children}
    </DeleteCustomerContext.Provider>
  );
};
