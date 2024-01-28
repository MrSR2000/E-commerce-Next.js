"use client";

interface CartProviderProps {
  children: React.ReactNode;
}

import { CartContextProvider } from "@/hooks/useCart";
import React from "react";

const CartProviders: React.FC<CartProviderProps> = ({ children }) => {
  return (
    <div>
      <CartContextProvider>{children}</CartContextProvider>
    </div>
  );
};

export default CartProviders;
