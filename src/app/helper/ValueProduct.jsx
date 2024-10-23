import { getdata } from "@/functions/product";
import { ProductContext } from "@/providers/ProductProvider";
import React, { useContext, useEffect } from "react";

const ValueProduct = () => {
  const { productData, setProductData } = useContext(ProductContext);
  useEffect(() => {
    getdata()
      .then((res) => {
        setProductData(res.data.response);
      })
      .catch((err) => console.log(err));
  }, []);
  return productData.length;
};

export default ValueProduct;
