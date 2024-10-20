/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";

const ProductImage = ({ image_name }) => {
  console.log(image_name);
  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <Image width={70} height={70} src={`/file/${image_name}`} />
    </div>
  );
};

export default ProductImage;
