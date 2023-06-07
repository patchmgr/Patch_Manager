import React from 'react';
import myImage from '../pictures/processflow.jpg';
// import { Up } from './Login';
import { useLocation } from 'react-router-dom';
const HomePage = () => {
    const location=useLocation();
    const id=location.state.id;
    
    return (
        <>
            <div className=' container textcenter'>
                <div>
                    <p>hello world this is home page</p>
                    {/* <Up/> */}
                    <h2>{id}</h2>
                </div>
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={myImage} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={myImage} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={myImage} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>

        </>
    );
};

export default HomePage;