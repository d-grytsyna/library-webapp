import { Link } from "react-router-dom";

export const ExploreTopBooks =  () =>{
    return(
        <div className="p-5 bg-dark header">
            <div className="container container-fluid text-white d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column  align-items-center">
                    <h1 className="display-5 fw-bold text-center">
                    Elevate your mind, Explore the E-Library! 
                    </h1>
                    <p className="col-md-8 fs-4 text-center"> Unlock the World of Knowledge: explore, learn, and discover</p>
                    <Link type='button' className="btn secondary-color btn-lg text-white" to={"/search"}>
                        Start
                    </Link>
                </div>
            </div>
        </div>

    );
}