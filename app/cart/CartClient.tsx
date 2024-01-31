"use client";

import { useCart } from "@/hooks/useCart";
import { dividerClasses } from "@mui/material";
import Link from "next/link";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";

const CartClient = () => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center ">
        <div className="text-2xl mb-2">Your Cart is Empty</div>
        <div>
          <Link href={"/"} className="text-slate-500 flex items-center gap-1">
            <MdArrowBack />
            <span>Start</span>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Heading title="Shopping Cart" center />
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
          <div className="col-span-2 justify-start">PRODUCT</div>
          <div className="justify-self-center">PRICE</div>
          <div className="justify-self-center">QUANTITY</div>
          <div className="justify-self-end">TOTAL</div>
        </div>
        <div>
          {cartProducts &&
            cartProducts.map((item) => {
              return (
                <div key={item.id}>
                  <ItemContent item={item} />
                </div>
              );
            })}
        </div>
        <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between">
          <div className="w-[100px]">
            <Button
              label="Clear Cart"
              onClick={() => handleClearCart()}
              small
              outline
            />
          </div>
          <div>
            <div className=" flex flex-col gap-1 items-start">
              <div className="flex justify-between w-full text-base font-semibold">
                <span>Subtotal</span>
                <h1>{formatPrice(cartTotalAmount)}</h1>
              </div>
              <p className="text-slate-500 mb-3">
                Taxs and shipping calculated at checkout
              </p>
              <Button label="CHECK OUT" onClick={() => {}} />
              <Link href={"/"}>
                <div className="flex  items-center gap-1 mt-3">
                  <MdArrowBack />
                  <p>Continue Shopping</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default CartClient;
