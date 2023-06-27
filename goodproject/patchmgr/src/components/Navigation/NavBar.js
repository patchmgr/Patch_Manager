import React from 'react';
import myImage from '../images/processflow.jpg';
import { Link } from "react-router-dom"
const NavigationBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg   navbar-light " id="mainNav" style={{ backgroundColor: "aquamarine" }}>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span
                            className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="nav nav-pills me-auto mb-2 mb-lg-0 w-100" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <Link to='/home'>
                                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                        aria-selected="true">Home</button>
                                </Link>

                            </li>
                            <li className="nav-item" role="presentation">
                                <Link to='/about'>
                                    <button className="nav-link " id="pills-home-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                        aria-selected="true">About us</button>
                                </Link>

                            </li>
                            <li className="nav-item" role="presentation">
                                <Link to='/contact'>
                                    <button className="nav-link " id="pills-contact-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                                        aria-selected="false" >Contact us</button>
                                </Link>
                            </li>
                            <li className="nav-item" role="presentation">
                                <Link to='/login'>
                                    <button className="nav-link " id="pills-contact-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                                        aria-selected="false" >Login</button>
                                </Link>
                            </li>
                        </ul>

                    </div>
                </div>




                <div className="nav-item">
                    <img src={myImage} alt="none" width="50px" data-bs-toggle="modal" data-bs-target="#exampleModal" />
                </div>



            </nav>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Process Flow</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center">
                            <img src={myImage} alt="none" width="90%" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br /> <br /><br />
            <div className=' text-center'>
                <h5 id='acc_area'></h5>
            </div>
        </div>
    );
};

export default NavigationBar;








