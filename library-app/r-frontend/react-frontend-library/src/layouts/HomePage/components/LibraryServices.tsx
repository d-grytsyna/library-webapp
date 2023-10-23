import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const LibraryServices = () => {

  const {authState} = useOktaAuth();

  return (
    <div className=" container my-5">
      <div className="row p-4 align-items center border shadow-lg">
        <div className="col-lg-7 p-3">
          <h3 className="display-5 fw-bold">
            Have some questions? Send message to an admin!
          </h3>
          <p className="lead">
            Send message to an admin! Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Sed, error. Debitis aspernatur sint sed aperiam
            similique earum, aliquid commodi tempore quibusdam aut, iusto
            repudiandae cupiditate eligendi, ipsum veniam praesentium hic.
          </p>
          <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
              {authState?.isAuthenticated ? (
                <Link
                  type="button"
                  className="btn main-color btn-lg px-4 me-md-2
                  fw-bold text-white"
                  to="/messages"
                >
                  Library Services
                </Link>
              ) : (
                <Link className="btn main-color btn-lg text-white" to='/login'>
                  Sign up
                </Link>
              )}
          </div>
        </div>

        <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div>
      </div>
    </div>
  );
};
