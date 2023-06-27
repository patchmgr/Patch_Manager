import React from 'react'
import Endusernav from '../Navigation/Endusernav';
import { useNavigate } from "react-router-dom";
import connectContract from '../Web3components/ContractConnector';
import { Outlet } from 'react-router-dom';

const Verifiermain = () => {
    const Navigate = useNavigate();
    return (
        <>
            <div>
                <br />
                <Endusernav />
                <div className="container  d-flex  align-items-center " style={{ backgroundColor: 'rgba(242, 124, 70, 0.289)', minHeight: '80px', height: 'auto' }} >
                    <ul className="nav nav-pills flex-grow-1 me-auto mb-3 mb-lg-0 d-flex justify-content-evenly " id="pills-tab" role="tablist">
                        <li className="nav-item " role="presentation">
                            <button className="nav-link active" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact"
                                type="button" role="tab" aria-controls="pills-contact" aria-selected="false"onClick={() => { Navigate("notverified") }} >Not verified</button>
                        </li>
                        <li className="nav-item " role="presentation">
                            <button className="nav-link " id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile"
                                type="button" role="tab" aria-controls="pills-profile" aria-selected="false"onClick={() => { Navigate("verified") }} >Completed</button>
                        </li> 
                    </ul>
                </div>
            </div>
            <div className='container'>
                <Outlet />
            </div>
        </>
    )
}

export default Verifiermain;


