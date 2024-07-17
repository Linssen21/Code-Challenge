import React, { createContext, useContext, useState, ReactNode } from "react";

interface SuccessContextType {
  success: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessContext = createContext<SuccessContextType>({
  success: false,
  setSuccess: () => {},
});

export const useSuccessContext = () => useContext(SuccessContext);

export const SuccessProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [success, setSuccess] = useState(false);

  return (
    <SuccessContext.Provider value={{ success, setSuccess }}>
      {children}
    </SuccessContext.Provider>
  );
};
