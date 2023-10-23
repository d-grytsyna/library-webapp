import React from "react";
import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { error } from "console";
import { Link } from "react-router-dom";

export const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
  const imgDataUri = props.book.img
    ? `data:image/jpeg;base64,${props.book.img}`
    : '';

  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        
          <img
          src= {imgDataUri}
          width="151"
          height="233"
          alt="book"
          style={{
            boxShadow: "3px 3px 5px 0 rgba(0, 0, 0, 0.5)",
          }}
        />
      

        <h6 className="mt-2">{props.book.title}</h6>
        <p>{props.book.author}</p>
        <Link className="btn secondary-color text-white" to={`checkout/${props.book.id}`}>
          Reserve
        </Link>
      </div>
    </div>
  );
};
