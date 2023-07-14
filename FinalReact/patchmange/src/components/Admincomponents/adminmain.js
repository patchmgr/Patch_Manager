import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Adminmain = () => {
    const Navigate = useNavigate();
    const location = useLocation();

    const [selectedOption, setSelectedOption] = useState(''); // State to keep track of the selected dropdown option

    // Function to handle option click
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        Navigate(option); // Navigating to the selected option
    };

    return (
        <>
            <div>
                <br />
                <div className="container d-flex align-items-center" style={{ backgroundColor: '#2F1793', minHeight: '80px', height: 'auto' }}>
                    <ul className="nav nav-pills flex-grow-1 me-auto d-flex justify-content-evenly" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to="request"
                                style={{ color: 'white' }}
                            >
                                Request Patch
                            </NavLink>
                        </li>
                        <li className="nav-item" role="presentation">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to="status"
                                style={{ color: 'white' }}
                            >
                                Request status
                            </NavLink>
                        </li>
                        <li className="nav-item" role="presentation">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to="details"
                                style={{ color: 'white' }}
                            >
                                Get Details
                            </NavLink>
                        </li>
                        <li className="nav-item" role="presentation">
                            <NavLink
                                className={`nav-link ${selectedOption === 'deploy' ? 'active' : ''}`}
                                to="deploy"
                                style={{ color: 'white' }}
                            >
                                deploy patch
                            </NavLink>
                        </li>
                        <li className="nav-item" role="presentation">
                            <NavLink
                                className={`nav-link ${selectedOption === 'deploystatus' ? 'active' : ''}`}
                                to="deploystatus"
                                style={{ color: 'white' }}
                            >
                                deployed
                            </NavLink>
                        </li>
                        <li className="nav-item" role="presentation">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to="download"
                                style={{ color: 'white' }}
                            >
                                Download History
                            </NavLink>
                        </li>
                        <li className="nav-item" role="presentation">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                to="transaction"
                                style={{ color: 'white' }}
                            >
                                Transaction History
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

export default Adminmain;
