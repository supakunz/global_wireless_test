/* eslint-disable react-hooks/exhaustive-deps */
import { getdata } from "@/functions/product";
import { ProductContext } from "@/providers/ProductProvider";
import { useContext, useEffect } from "react";

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
