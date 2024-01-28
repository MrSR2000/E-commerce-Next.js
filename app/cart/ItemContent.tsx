import React from "react";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Image from "next/image";
import Link from "next/link";
import { truncastText } from "@/utils/truncateText";
import Button from "../components/Button";
import SetQuantity from "../components/products/SetQuantity";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleQtyDecrement,
  } = useCart();

  return (
    <div className="grid grid-cols-5 text-sm md:text-sm gap-4 py-4 items-center mt-8 border-[1.5px] border-slate-200">
      <div className="flex col-span-2 justify-self-start gap-2">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className="object-contain "></Image>
          </div>
        </Link>

        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{truncastText(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w=[70px]">
            <button
              className="text-slate-700 underline"
              onClick={() => handleRemoveProductFromCart(item)}>
              Remove
            </button>
          </div>
        </div>
        {/* <div className="col-span-1">
          <Image src={item.selectedImg.image} alt={item.id} />
        </div> */}
      </div>
      <div className="col-span-1 justify-self-center">Rs.{item.price}</div>
      <div className="col-span-1 justify-self-center">
        <SetQuantity
          cartCounter
          cartProduct={item}
          handleQtyIncrement={() => {
            handleCartQtyIncrease(item);
          }}
          handleQtyDecrement={() => {
            handleQtyDecrement(item);
          }}></SetQuantity>
      </div>
      <div className="col-span-1 justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
