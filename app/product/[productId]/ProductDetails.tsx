"use client";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { productRating } from "@/utils/productRating";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

import React, { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

//divider component
const Divider = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();

  console.log("cart products", cartProducts);

  const [isProductInCart, setisProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const router = useRouter();

  useEffect(() => {
    setisProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setisProductInCart(true);
      }
    }
  }, [cartProducts]);

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQtyIncrement = useCallback(() => {
    if (cartProduct.quantity === 10) {
      return;
    }

    setCartProduct((prev) => {
      console.log(`previous quantity = ${prev.quantity}`);

      return { ...prev, quantity: prev.quantity++ };
    });
  }, [cartProduct]);

  const handleQtyDecrement = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity-- };
    });
  }, [cartProduct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
      <ProductImage
        cartProduct={cartProduct}
        handleColorSelect={handleColorSelect}
        product={product}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="font-medium text-3xl text-slate-700">{product.name}</h2>
        <div className="flex items-center ">
          <Rating value={productRating(product)} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Divider />
        <div className="text-justify">{product.description}</div>
        <Divider />
        <div>
          <span className="font-semibold">CATEGORY : </span> {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND : </span> {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In Stock" : "Out of Stock"}{" "}
        </div>
        <Divider />

        {isProductInCart ? (
          <>
            <p className="flex mb-2 text-slate-500 gap-1 pb-2">
              <MdCheckCircle size={20} className="text-teal-400" />
              <span>Product added to cart</span>
            </p>
            <div>
              <Button
                label="View Cart"
                outline
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <SetColor
                cartProduct={cartProduct}
                images={product.images}
                handleColorSelect={handleColorSelect}
              />
            </div>
            <Divider />
            <div>
              <SetQuantity
                cartProduct={cartProduct}
                handleQtyIncrement={handleQtyIncrement}
                handleQtyDecrement={handleQtyDecrement}
              />
            </div>
            <Divider />
            <div className="max-w-[300px]">
              <Button
                label="Add To Cart"
                onClick={() => handleAddProductToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
