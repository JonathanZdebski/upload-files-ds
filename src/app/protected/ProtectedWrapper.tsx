// src/components/ProtectedWrapper.tsx
"use client";

import React from "react";
import Checkout from "../Components/checkout";
import styles from "../styles/button.module.css";

interface ProtectedWrapperProps {
  children: React.ReactNode;
}

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
  const [hasAccess, setHasAccess] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await fetch("/api/auth-status");
        if (response.ok) {
          const data = await response.json();
          setHasAccess(data.hasPaid);
        } else {
          setHasAccess(false);
        }
      } catch (error) {
        console.error("Failed to check access:", error);
        setHasAccess(false);
      }
    };

    checkAccess();
  }, []);

  if (hasAccess === null) {
    return (
      <div className="flex items-center justify-center mt-7">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div>
        <Checkout />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedWrapper;
