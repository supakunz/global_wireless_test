"use client";

import { useState, createContext } from "react";

// Create Store
export const ProductContext = createContext(); //type ข้อมูลที่ส่งออก

export default function ProductProvider({ children }) {
  const [productData, setProductData] = useState([]);

  return (
    <ProductContext.Provider
      value={{
        setProductData,
        productData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
