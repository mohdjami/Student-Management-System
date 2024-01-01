"use client";
import React, { useState, useEffect, ReactNode } from "react";
import TokenContext from "./TokenContext";

interface TokenProviderProps {
  children: ReactNode;
}

const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
  );
};

export default TokenProvider;
