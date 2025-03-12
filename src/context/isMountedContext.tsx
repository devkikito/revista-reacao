"use client";

import React, { createContext, useContext, useState } from "react";

interface IsMountedContextProps {
  registerComponent: () => void;
  componentMounted: () => void;
  isAllMounted: boolean;
}

const IsMountedContext = createContext<IsMountedContextProps | undefined>(undefined);

export const IsMountedProvider = ({
  totalComponents,
  children,
}: {
  totalComponents: number;
  children: React.ReactNode;
}) => {
  const [mountedCount, setMountedCount] = useState(0);

  const registerComponent = () => {
    // Função que será chamada pelos filhos para se registrar
  };

  const componentMounted = () => {
    setMountedCount((prev) => prev + 1);
  };

  const isAllMounted = mountedCount === totalComponents;

  return (
    <IsMountedContext.Provider value={{ registerComponent, componentMounted, isAllMounted }}>
      {children}
    </IsMountedContext.Provider>
  );
};

export const useIsMounted = () => {
  const context = useContext(IsMountedContext);
  if (!context) {
    throw new Error("useIsMounted deve ser usado dentro de IsMountedProvider");
  }
  return context;
};
