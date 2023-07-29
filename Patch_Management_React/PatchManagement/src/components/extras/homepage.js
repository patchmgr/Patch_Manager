import React from 'react'
import myImage from '../images/Blockchain1.jpg'
import myImage1 from '../images/eth3.jpg'
import myImage2 from '../images/blockchainflow.png'
const Homepage = () => {
    return (
        <div  className="d-flex justify-content-center align-items-center mx-5 p-5" >
            <div className=' container-fluid  my-3 text-center '>
                
                <div id="carouselExampleControls" className="carousel slide mx-4" data-bs-ride="carousel" style={{"height" : "25%", "width" : "95%"}}>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={myImage} className='d-block w-100'  alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={myImage1}   className='d-block w-100' alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={myImage2}  className='d-block w-100' alt="..." />
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
