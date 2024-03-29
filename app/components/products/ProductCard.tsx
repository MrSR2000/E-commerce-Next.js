"use client";
import { formatPrice } from "@/utils/formatPrice";
import { truncastText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { productRating } from "@/utils/productRating";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="col-span-1
      cursor-pointer
      border-[1.2px]
    border-slate-100
    bg-slate-100
      rounded-sm p-2
      transition 
      hover:scale-105
      text-center
      text-sm">
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            className="w-full h-full object-contain"
            src={data.images[0].image}
            alt={data.name}
          />
        </div>
        <div className="mt-4">{truncastText(data.name)}</div>
        <div>
          <Rating value={productRating(data)} readOnly />
        </div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
        <div></div>
      </div>
    </div>
  );
};

export default ProductCard;
