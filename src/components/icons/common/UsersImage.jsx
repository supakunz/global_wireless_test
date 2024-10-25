/* eslint-disable jsx-a11y/alt-text */
import { Avatar } from "@mui/material";

const ProductImage = ({ image_name }) => {
  return (
    <div className="h-full py-1">
      <div className="h-full flex items-center">
        <Avatar />
      </div>
    </div>
  );
};

export default ProductImage;
