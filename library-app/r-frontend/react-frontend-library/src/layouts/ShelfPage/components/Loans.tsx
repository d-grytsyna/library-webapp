import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";
import { error } from "console";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";
import { LoansModal } from "./LoansModal";

export const Loans = () => {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);
  //Current loans
  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<
    ShelfCurrentLoans[]
  >([]);
  const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
  const [checkout, setCheckout] = useState(false);
  const [isLoadingUserReviewedBooks, setIsLoadingUserReviewedBooks] = useState(true);
  const [userReviewedBooks, setUserReviewedBooks] = useState<number[]>([]);


  useEffect(() => {
    const fetchUserCurrentLoans = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${process.env.REACT_APP_API}/books/secure/currentloans`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const shelfCurrentLoansResponse = await fetch(url, requestOptions);
        if (!shelfCurrentLoansResponse.ok) {
          throw new Error("Something went wrong");
        }
        const shelfCurrentLoansResponseJson =
          await shelfCurrentLoansResponse.json();
        setShelfCurrentLoans(shelfCurrentLoansResponseJson);
      }
      setIsLoadingUserLoans(false);
    };
    fetchUserCurrentLoans().catch((error: any) => {
      setIsLoadingUserLoans(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [authState, checkout]);

  useEffect(()=>{
    const fetchUserReviewedBooks = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${process.env.REACT_APP_API}/reviews/secure/reviewed-books`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const userReviewedBooksResponse = await fetch(url, requestOptions);
        if (!userReviewedBooksResponse.ok) {
          throw new Error("Something went wrong");
        }
      
        const userReviewedBooksResponseJson =
          await userReviewedBooksResponse.json();
        console.log(userReviewedBooksResponseJson);  
        setUserReviewedBooks(userReviewedBooksResponseJson);
      }
      setIsLoadingUserReviewedBooks(false);
    };
    fetchUserReviewedBooks().catch((error: any) => {
      setIsLoadingUserReviewedBooks(false);
      setHttpError(error.message);
    });

  }, [authState])

  if (isLoadingUserLoans || isLoadingUserReviewedBooks) {
    return <SpinnerLoading></SpinnerLoading>;
  }
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function returnBook(bookId:number) {
    const url = `${process.env.REACT_APP_API}/books/secure/return/?bookId=${bookId}`;
    const requestOptions = {
        method : 'PUT',
        headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json"
        }
    };
    const returnResponse = await fetch(url, requestOptions);
    if(!returnResponse.ok){
        throw new Error("Something went wrong!");
    }
    setCheckout(!checkout);
  }

  async function renewLoan(bookId:number) {
    const url = `${process.env.REACT_APP_API}/books/secure/renew/loan/?bookId=${bookId}`;
    const requestOptions = {
        method : 'PUT',
        headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json"
        }
    }
    const returnResponse = await fetch(url, requestOptions);
    if(!returnResponse.ok){
        throw new Error("Something went wrong!")
    }
    setCheckout(!checkout);
    
  }
  return (
    <div>
      {/* Desktop */}
      <div className="d-none d-lg-block mt-2">
        {shelfCurrentLoans.length > 0 ? (
          <>
            <h5>Current loans: </h5>
            {shelfCurrentLoans.map((shelfCurrentLoan) => (
              <div key={shelfCurrentLoan.book.id}>
                <div className="row mt-3 mb-3">
                  <div className="col-4 col-md-4 container">
                    <img
                      src={`data:image/jpeg;base64,${shelfCurrentLoan.book?.img}`}
                      width="226"
                      height="349"
                      alt="book"
                    />
                  </div>
                  <div className="card col-3 col-md-3 container d-flex">
                    <div className="card-body">
                      <div className="mt-3">
                        <h4>Loan optinos</h4>
                        {shelfCurrentLoan.daysLeft > 0 && (
                          <p className="text-secondary">
                            Due in {shelfCurrentLoan.daysLeft} days.
                          </p>
                        )}
                        {shelfCurrentLoan.daysLeft == 0 && (
                          <p className="text-success">Due today.</p>
                        )}
                        {shelfCurrentLoan.daysLeft < 0 && (
                          <p className="text-danger">
                            Past due by {shelfCurrentLoan.daysLeft} days.
                          </p>
                        )}

                        <div className="list-group mt-3">
                          <button
                            className="list-group-item 
                                                list-group-item-action
                                                secondary-color
                                                btn-secondary-color"
                            aria-current="true"
                            data-bs-toggle="modal"
                            data-bs-target={`#modal${shelfCurrentLoan.book.id}`}
                          >
                            Manage Loan
                          </button>
                          <Link
                            to={"search"}
                            className="list-group-item
                                                list-group-item-action"
                          >
                            {" "}
                            Search more books
                          </Link>
                        </div>
                      </div>
                      <hr />
                      {userReviewedBooks.includes(shelfCurrentLoan.book.id)? 
                      <p>Thank you for your review!</p>
                      :
                       <div>
                        <p className="mt-3">
                        Help others by reviewing your loan!
                      </p>
                      <Link
                        className="btn accent-color"
                        to={`/checkout/${shelfCurrentLoan.book.id}`}
                      >
                        Leave a review
                      </Link>
                       </div>
                      }
                    </div>
                  </div>
                </div>
                <hr />
                <LoansModal shelfCurrentLoan={shelfCurrentLoan}
                mobile={false}
                returnBook={returnBook}
                renewLoan={renewLoan}></LoansModal>
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">Currently no loans</h3>
            <Link className="btn secondary-color" to={`search`}>
              {" "}
              Search for a new book
            </Link>
          </>
        )}
      </div>

      {/* Mobile  */}
      <div className="container d-lg-none mt-2">
        {shelfCurrentLoans.length > 0 ? (
          <>
            <h5 className="mb-3">Current loans: </h5>
            {shelfCurrentLoans.map((shelfCurrentLoan) => (
              <div key={shelfCurrentLoan.book.id}>

                  <div className="d-flex justify-content-center
                  align-items-center">
                    <img
                      src={`data:image/jpeg;base64,${shelfCurrentLoan.book?.img}`}
                      width="226"
                      height="349"
                      alt="book"
                    />
                  </div>
                  <div className="card d-flex mt-5 mb-3">
                    <div className="card-body container">
                      <div className="mt-3">
                        <h4>Loan optinos</h4>
                        {shelfCurrentLoan.daysLeft > 0 && (
                          <p className="text-secondary">
                            Due in {shelfCurrentLoan.daysLeft} days.
                          </p>
                        )}
                        {shelfCurrentLoan.daysLeft == 0 && (
                          <p className="text-success">Due today.</p>
                        )}
                        {shelfCurrentLoan.daysLeft < 0 && (
                          <p className="text-danger">
                            Past due by {shelfCurrentLoan.daysLeft} days.
                          </p>
                        )}

                        <div className="list-group mt-3">
                          <button
                            className="list-group-item 
                                                list-group-item-action
                                                secondary-color
                                                btn-secondary-color"
                            aria-current="true"
                            data-bs-toggle="modal"
                            data-bs-target={`#mobilemodal${shelfCurrentLoan.book.id}`}
                          >
                            Manage Loan
                          </button>
                          <Link
                            to={"search"}
                            className="list-group-item
                                                list-group-item-action"
                          >
                            {" "}
                            Search more books
                          </Link>
                        </div>
                      </div>
                      <hr />

                      {userReviewedBooks.includes(shelfCurrentLoan.book.id)? <></>:
                       <div>
                        <p className="mt-3">
                        Help others by reviewing your loan!
                      </p>
                      <Link
                        className="btn btn-primary"
                        to={`/checkout/${shelfCurrentLoan.book.id}`}
                      >
                        Leave a review
                      </Link>
                       </div>
                      }
                      
                    </div>
                  </div>

                <hr />
                <LoansModal shelfCurrentLoan={shelfCurrentLoan}
                mobile={true}
                returnBook={returnBook}
                renewLoan={renewLoan}></LoansModal>
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">Currently no loans</h3>
            <Link className="btn btn-primary" to={`search`}>
              {" "}
              Search for a new book
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
