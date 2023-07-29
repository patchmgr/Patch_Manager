import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Develepormain = () => {
    const Navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <div>
                <br />
                <div className="container d-flex align-items-center" style={{ backgroundColor: '#2F1793', minHeight: '80px', height: 'auto' }}>
                    <ul className="nav nav-pills flex-grow-1 me-auto mb-3 mb-lg-0 d-flex justify-content-evenly" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to="upload"
                                style={{ color: 'white' }}
                            >
                                Register/upload
                            </NavLink>
                        </li>
                        <li className="nav-item" role="presentation">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to="reupload"
                                style={{ color: 'white' }}
                            >
                                Re-upload
                            </NavLink>
                        </li>
                        <li className="nav-item" role="presentation">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to="history"
                                style={{ color: 'white' }}
                            >
                                Status
                            </NavLink>
                        </li>
                        <li className="nav-item" role="presentation">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to="transaction"
                                style={{ color: 'white' }}
                            >
                                Transaction history
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    );
};

export default Develepormain;
