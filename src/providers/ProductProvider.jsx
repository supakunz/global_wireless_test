"use client";

import { useState, createContext } from "react";

// Create Store
export const ProductContext = createContext(); //type ข้อมูลที่ส่งออก

export default function ProductProvider({ children }) {
  const [productData, setProductData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalprice, setTotalprice] = useState();

  const totalValue = () => {
    //Total price
    const sum = productData.reduce((a, b) => {
      return Number(a) + Number(b.price);
    }, 0);
    //Format to USD
    let USDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits: 3,
    });
    let result = USDollar.format(sum);
    return setTotalprice(result);
  };

  return (
    <ProductContext.Provider
      value={{
        setProductData,
        productData,
        loading,
        setLoading,
        totalValue,
        totalprice,
        userData,
        setUserData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
