"use client";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import React from "react";

interface SetQtyProps {
  cartCounter?: boolean;
  cartProduct?: CartProductType;
  handleQtyIncrement: () => void;
  handleQtyDecrement: () => void;
}

const btnStyles = "border-[1.2px] border-slate-300 px-2 rounded";

const SetQuantity: React.FC<SetQtyProps> = ({
  cartCounter,
  cartProduct,
  handleQtyIncrement,
  handleQtyDecrement,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold ">QUANTITY : </div>}
      <div className="flex gap-4 items-center text-base">
        <button className={btnStyles} onClick={handleQtyDecrement}>
          -
        </button>
        <div>{cartProduct?.quantity}</div>
        <button className={btnStyles} onClick={handleQtyIncrement}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
