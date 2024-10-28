"use client";

import { useState, createContext } from "react";

// Create Store
export const ProductContext = createContext(); //type ข้อมูลที่ส่งออก

export default function ProductProvider({ children }) {
  const [productData, setProductData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalprice, setTotalprice] = useState();
  // const [currencyPrice, setCurrencyPrice] = useState([]);

  //Format to USD
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
  });

  // currency price from productData
  const currencyPrice = productData.map((val) => {
    let result = { ...val, price: USDollar.format(val.price) };
    return result;
  });

  const totalValue = () => {
    //Total price
    const sum = productData.reduce((a, b) => {
      return Number(a) + Number(b.price);
    }, 0);
    let result = USDollar.format(sum);
    return setTotalprice(result);
  };

  console.log(productData);

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
        currencyPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
