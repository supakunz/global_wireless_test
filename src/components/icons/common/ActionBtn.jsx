import React, { useContext, useState } from "react";
import { getdata, remove } from "@/functions/product";
import EditProduct from "@/components/editproduct/EditProduct";
import { ProductContext } from "@/providers/ProductProvider";

const ActionBtn = ({ data }) => {
  const [editToggle, setEditToggle] = useState(false);
  const { setProductData } = useContext(ProductContext);
  // console.log(data);
  return (
    <div>
      <div>
        <a
          onClick={() => setEditToggle(true)}
          className="edit_btn active:bg-slate-600"
        >
          Edit
        </a>
        <a
          onClick={() => {
            remove(data.id)
              .then((res) => console.log(res.data.message))
              .catch((err) => console.log(err.response.data.message))
              .finally(() => {
                getdata()
                  .then((res) => setProductData(res.data.response))
                  .catch((err) => console.log(err.response.data.message));
              });
          }}
          className="remove_btn active:bg-red-600"
        >
          Delete
        </a>
      </div>
      <EditProduct
        editToggle={editToggle}
        setEditToggle={setEditToggle}
        product_value={data.row}
      />
    </div>
  );
};

export default ActionBtn;
