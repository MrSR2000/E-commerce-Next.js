"use client";
import Heading from "@/app/components/Heading";
import { Avatar, Rating, dividerClasses } from "@mui/material";
import moment from "moment";
import React from "react";

interface ListRatingProps {
  product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  return (
    <div>
      <Heading title="Product Reviews" />
      <div className="text-sm mt-2">
        {product.reviews &&
          product.reviews.map((review: any) => {
            return (
              <div key={review.id} className="max-w-300px">
                <div className="flex gap-2 items-center">
                  <Avatar src={review?.user.image} />
                  <div className="font-semibold">{review?.user.name}</div>
                  <div className="font-light">
                    {moment(review.createdDate).fromNow()}
                  </div>
                </div>
                <div className="mt-2">
                  <Rating value={review.rating} readOnly />
                  <div>{review.comment}</div>
                  <hr className="mt-4 mb-4 max-w-[300px]" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
