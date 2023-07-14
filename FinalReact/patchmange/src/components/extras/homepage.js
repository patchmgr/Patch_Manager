import React from 'react'
import myImage from '../images/blockchain.jpg'
import NavigationBar from '../Navigation/NavBar';
const Homepage = () => {
    return (
        <div>
            <div className=' container textcenter'>
                <div>
                    <p>hello world this is home page</p>
                </div>
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{"height" : "60%", "width" : "50%"}}>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={myImage} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={myImage} className="d-block w-100"  alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={myImage} className="d-block w-100"  alt="..." />
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

        </div>
    )
}

export default Homepage;
