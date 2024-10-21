"use client";

import { useState, createContext } from "react";

// Create Store
export const ProductContext = createContext(); //type ข้อมูลที่ส่งออก

export default function ProductProvider({ children }) {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <ProductContext.Provider
      value={{
        setProductData,
        productData,
        loading,
        setLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
