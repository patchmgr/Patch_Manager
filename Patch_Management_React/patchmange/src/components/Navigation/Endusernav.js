import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import AccountContext from '../context/AccountContext';
import detectEthereumProvider from '@metamask/detect-provider';
import axios from 'axios';
import myImage from '../images/workflow333.jpg';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Endusernav = (props) => {
    const { account, contract, roller, username } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    async function switchAccount() {
        try{

            const provider = await detectEthereumProvider();
            if (provider) {
                await provider.request({
                    method: 'wallet_requestPermissions',
                    params: [{ eth_accounts: {} }],
                });
                window.location.reload();
            }
        }
        catch(error){
            // console.log(error)
        }
    }

    const handleLogoutClick = () => {
        setLoggedIn(false);
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            const cookieName = cookie.split('=')[0];
            document.cookie = `${cookieName}=; Max-Age=-1; path=/;`;
        }
        navigate('/login');
        setLoggedIn(false);
        toast.success(' Logout Sucessful', {
            position: 'bottom-right',
            autoClose: 1400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };

    useEffect(() => {
        if (props.flag) {
            setLoggedIn(true);
        }
    }, [props.flag]);

    useEffect(() => {
        const checkAuthenticationStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile', { withCredentials: true });
                setLoggedIn(true);
            } catch (error) {
                setLoggedIn(false);
                console.error(error);
            }
        };
        if (loggedIn) {
            checkAuthenticationStatus();
        }
    }, [loggedIn]);

    const handleDashboardClick = () => {
        navigate(`/${roller}`);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-unique" style={{ backgroundColor: '#282E34' }}>
                <div className="container-fluid">
                    <ToastContainer
                        position="bottom-right"
                        autoClose={1400}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse p-2" id="navbarResponsive">
                        <ul className="nav nav-pills me-auto mb-2 mb-lg-0 w-100" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <NavLink
                                    className="nav-link btn-info text-white"
                                    activeClassName="active"
                                    to="home"
                                    onClick={() => navigate('home')}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item" role="presentation">
                                <NavLink
                                    className="nav-link btn-info text-white"
                                    activeClassName="active"
                                    to="about"
                                    onClick={() => navigate('about')}
                                >
                                    About Us
                                </NavLink>
                            </li>
                            
                            {loggedIn ? (
                                <li className="nav-item" role="presentation">
                                    <NavLink
                                        className="nav-link btn-info text-white"
                                        activeClassName="active"
                                        to={`/${roller}`}
                                        onClick={handleDashboardClick}
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                            ) : (
                                <li className="nav-item" role="presentation">
                                    <NavLink
                                        className="nav-link btn-info text-white"
                                        activeClassName="active"
                                        to="login"
                                        onClick={() => navigate('login')}
                                    >
                                        Login
                                    </NavLink>
                                </li>
                            )}
                            {loggedIn && (
                                <li className="nav-item" role="presentation">
                                    <div className="d-flex align-items-center" >
                                        <h5 className="text-white mx-4 p-2 " style={{ margin: 0 }}>Role: {roller}</h5>
                                        {/* <h5 className="text-bg-secondary mx-4 p-2">Name: {username}</h5> */}
                                    </div>
                                </li>
                            )}
                        </ul>
                        <div className="nav-item">
                            {loggedIn && (
                                <button className="btn btn-danger mx-3" onClick={handleLogoutClick}>
                                    Logout
                                </button>
                            )}
                        </div>
                        <div className=" nav  nav-pills nav-item">
                            <button
                                className="nav-link btn-info text-white float-end"
                                id="pills-contact-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-contact"
                                type="button"
                                role="tab"
                                aria-controls="pills-contact"
                                aria-selected="false"
                                onClick={switchAccount}
                            >
                                Switch
                            </button>
                        </div>
                        <div className="ml-auto mx-4">
                            <img data-bs-toggle="modal" data-bs-target="#exampleModal" src={myImage} alt="none" width="50px" />
                        </div>
                    </div>
                </div>
            </nav>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Process Flow</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center">
                            <img src={myImage} alt="none" width="90%" />
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Endusernav;
