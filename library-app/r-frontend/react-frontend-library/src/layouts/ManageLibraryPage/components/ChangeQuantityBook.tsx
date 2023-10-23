import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { useOktaAuth } from "@okta/okta-react";

export const ChangeQuantityBook: React.FC<{
  book: BookModel;
  deleteBook: any;
}> = (props, key) => {
  const { authState } = useOktaAuth();
  const [quantity, setQuantity] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    const fetchBookInState = () => {
      props.book.copies ? setQuantity(props.book.copies) : setQuantity(0);
      props.book.copiesAvailable
        ? setRemaining(props.book.copiesAvailable)
        : setRemaining(0);
    };
    fetchBookInState();
  }, []);

  async function increaseQuantity() {
    const url: string = `${process.env.REACT_APP_API}/admin/secure/increase/book/quantity/?bookId=${props.book?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const quantityUpdateResponse = await fetch(url, requestOptions);
    if (!quantityUpdateResponse.ok) {
      throw new Error("Something went wrong");
    }
    setQuantity(quantity + 1);
    setRemaining(remaining + 1);
  }

  async function decreaseQuantity() {
    const url: string = `${process.env.REACT_APP_API}/admin/secure/decrease/book/quantity/?bookId=${props.book?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const quantityUpdateResponse = await fetch(url, requestOptions);
    if (!quantityUpdateResponse.ok) {
      throw new Error("Something went wrong");
    }
    setQuantity(quantity - 1);
    setRemaining(remaining - 1);
  }

  async function deleteBook() {
    const url: string = `${process.env.REACT_APP_API}/admin/secure/delete/book/?bookId=${props.book?.id}`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const updateResponse = await fetch(url, requestOptions);
    if (!updateResponse.ok) {
      throw new Error("Something went wrong");
    }
    props.deleteBook();
  }
  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            <img
              src={`data:image/jpeg;base64,${props.book.img}`}
              width="123"
              height="196"
              alt="book"
            />
          </div>
          <div className="d-lg-none d-flex justify-content-center align-items-center">
            <img
              src={`data:image/jpeg;base64,${props.book.img}`}
              width="123"
              height="196"
              alt="book"
            />
          </div>
        </div>

        <div className="col-md-6 ">
          <div className="card-body">
            <h5 className="card-title">{props.book.author}</h5>
            <h4>{props.book.title}</h4>
            <p className="card-text">{props.book.description}</p>
          </div>
        </div>
        <div className="mt-3 col-md-4">
          <div className="d-flex justify-content-center align-items-center">
            <p>
              Total quantity: <b>{quantity}</b>
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p>
              Books remaining: <b>{remaining}</b>
            </p>
          </div>

          <div className="d-flex justify-content-center align-items-center">

            <p className="pt-3 me-3">Quantity: </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="rgb(78, 150, 150)"
          className="bi bi-plus-circle-fill me-2 quantity-control"
          viewBox="0 0 16 16"
          onClick={increaseQuantity}
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="rgb(78, 150, 150)"
          className="bi bi-dash-circle-fill quantity-control"
          viewBox="0 0 16 16"
          onClick={decreaseQuantity}
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
        </svg>
        </div>
        <div className="d-flex justify-content-center">
            <button className="m-1 btn btn-md btn-danger" onClick={deleteBook}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
