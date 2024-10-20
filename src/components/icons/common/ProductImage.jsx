/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";

const ProductImage = ({ image_name }) => {
  return (
    <div className="h-full py-1">
      <div className="h-full relative w-[90px]">
        <Image
          alt="image_product"
          fill={true}
          layout={"fill"}
          objectFit={"contain"}
          src={`/file/${image_name}`}
        />
      </div>
    </div>
  );
};

export default ProductImage;
