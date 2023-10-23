import { Link } from "react-router-dom";
import BookModel from "../../../models/BookModel";

export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
  const imgDataUri = props.book.img
    ? `data:image/jpeg;base64,${props.book.img}`
    : "";
  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            <img src={imgDataUri} alt="Book" width="123" height="196" 
            style={{
              boxShadow: "3px 3px 5px 0 rgba(0, 0, 0, 0.5)",
            }}
            />
          </div>

          <div
            className="d-lg-none d-flex justify-content-center
          align-items-center"
          >
            <img src={imgDataUri} alt="Book" width="123" height="196" 
            style={{
              boxShadow: "3px 3px 5px 0 rgba(0, 0, 0, 0.5)",
            }}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{props.book.author}</h5>
            <h4>{props.book.title}</h4>
            <p className="card-text">{props.book.description}</p>
          </div>
        </div>

        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <Link className="btn btn-md main-color text-white" to={`/checkout/${props.book.id}`}>
            View details
          </Link>
        </div>
      </div>
    </div>
  );
};
