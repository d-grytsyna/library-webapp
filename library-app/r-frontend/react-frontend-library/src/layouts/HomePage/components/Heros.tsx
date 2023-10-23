import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const Heros = () => {
  const { authState } = useOktaAuth();
  return (
    <div className="my-5">
      <div className="d-none d-lg-block d-md-block">
        <div className="row g-0">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>

          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div>
              <h2>What have you been reading?</h2>
              <p className="lead">
                The library team would love to know what are you reading Lorem,
                ipsum dolor sit amet consectetur adipisicing elit. Nisi, enim
                sint nemo corrupti voluptatem optio, impedit provident.
              </p>

              {authState?.isAuthenticated ? (
                <Link
                  type="button"
                  className="btn main-color btn-lg text-white"
                  to="search"
                >
                  Explore top books
                </Link>
              ) : (
                <Link className="btn main-color btn-lg text-white" to='/login'>
                  Sign up
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="row g-0">
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h2>Our collection is always changing</h2>
              <p className="lead">
                Try to check it out Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Eius soluta odit numquam esse consequuntur,
                omnis ea. Culpa minus.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/* Mobile */}

      <div className="d-large-none d-md-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h1>What have you been reading?</h1>
              <p className="lead">
                The library team would love to know what are you reading Lorem,
                ipsum dolor sit amet consectetur adipisicing elit. Nisi, enim
                sint nemo corrupti voluptatem optio, impedit provident quo
                earum, sequi tenetur architecto animi eius asperiores
                dignissimos nihil ratione? Placeat, laudantium!
              </p>

              {authState?.isAuthenticated ? (
                <Link
                  type="button"
                  className="btn main-color btn-lg text-white"
                  to="shelf"
                >
                  Leave a review
                </Link>
              ) : (
                <Link className="btn main-color btn-lg text-white" to='/login'>
                  Sign up
                </Link>
              )}
            </div>
          </div>
          <div className="m-2">
            <div className="col-image-right"> </div>
            <div className="mt-2">
              <h1>Our collection is always changing</h1>
              <p className="lead">
                Try to check it out Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Eius soluta odit numquam esse consequuntur,
                omnis ea. Culpa minus, minima inventore sit quod omnis quidem
                dolorem quos cum eligendi est enim!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
