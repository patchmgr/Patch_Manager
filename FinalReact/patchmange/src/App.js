import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import connectMetamask from "./components/Web3components/MetamaskConnector";


import Error404 from "./components/extras/error";

import Usermain from "./components/Endusercomponents/usermain";
import Adminmain from "./components/Admincomponents/adminmain";

import NavigationBar from "./components/Navigation/NavBar";
import LoginPage from "./components/Login/login";
import Homepage from "./components/extras/homepage";
import AboutPage from "./components/extras/about";
import Contactpage from "./components/extras/contact";
import Userdownload from "./components/Endusercomponents/userdownload";

import Userreport from "./components/Endusercomponents/userreport";
import Endusernav from "./components/Navigation/Endusernav";

import Patchdetails from "./components/Admincomponents/patchdetails";
import Patchdeploy from "./components/Admincomponents/patchdeploy";
import Verifiermain from "./components/VerifierComponents/verifiermain";
import Verification from "./components/VerifierComponents/verification";
import Verifystatus from "./components/VerifierComponents/verifiedstatus";
import Patchrequest from "./components/Admincomponents/adminrequest";
import InputComponent from "./components/Admincomponents/downloads";
import Labellermain from "./components/Labellercomponents/labellermain";
import Feedback from "react-bootstrap/esm/Feedback";
import Priority from "./components/Labellercomponents/priority";
import Userfeedback from "./components/Labellercomponents/feedback";
import Patchrequeststatus from "./components/Admincomponents/requeststatus";
import Develepormain from "./components/Develeporcomponents/developermain";
import Registerpatch from "./components/Develeporcomponents/registerpatch";
import Reuploadpatch from "./components/Develeporcomponents/reupload";
import Ipfsconnector from "./components/Develeporcomponents/timepass";
import AccountContext from "./components/context/AccountContext";
import connectContract from "./components/Web3components/ContractConnector";
import Transactionhistory from "./components/Develeporcomponents/transactionhistory";
import SignUp from "./components/Login/signup";

import axios from "axios";
import Cookies from 'js-cookie';
import PatchdeployStatus from "./components/Admincomponents/patchdeploystatus";


function App() {
    const [dup, setDup] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);

    const [roller, setRoller] = useState(null);
    const [loading, setLoading] = useState(null); // New loading state

    const fetchUserDetails = (role, username) => {
        setRoller(role);
        setLoggedIn(true);
        setUsername(username);
    }

    useEffect(() => {
        connectMetamask(setAccount);
        connectContract(setContract);
    }, []);

    useEffect(() => {
        if (Cookies.get('jwt')) {
            setLoggedIn(true);
            setLoading(true);
            const checkAuthenticationStatus = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/profile', { withCredentials: true });
                    const { role, username } = response.data;
                    setRoller(role);
                    setUsername(username);
                    setLoggedIn(true);
                } catch (error) {
                    setRoller('');
                    setUsername('');
                    setLoggedIn(false);
                    console.error(error);
                }
                finally {
                    setTimeout(() => {
                        setLoading(false); // Set loading state to false after 2 seconds
                    }, 1000);
                }
            };
            checkAuthenticationStatus();
        }
    }, [dup]);

    const update = (flag) => {
        setDup(flag);
        setLoading(flag);
    }



    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <h4 className="mx-3">Please wait till we get you ........ </h4>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>

            </div>
        );
    }

    return (
        <>
            <AccountContext.Provider
                value={{ account, contract ,roller,username }}>
                    <Router>
                        <Endusernav flag={loggedIn} />
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/home" element={<Homepage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<Contactpage />} />
                            <Route path="/login" element={<LoginPage flag={update} />} />
                            <Route path="/signup" element={<SignUp />} />

                            {roller === 'user' && (
                                <Route path="/user" element={<Usermain />} >
                                    <Route path="download" element={<Userdownload />} />
                                    <Route path="report" element={<Userreport />} />
                                </Route>
                            )}


                            {roller === 'labeller' && (
                                <Route path="/labeller" element={<Labellermain />} >
                                    <Route path="feedback" element={<Userfeedback />} />
                                    <Route path="priority" element={<Priority />} />
                                    <Route path="transaction" element={<Transactionhistory/>} />
                                </Route>
                            )}
                            {roller === 'admin' && (
                                <Route path="/admin" element={<Adminmain />} >
                                    <Route path="details" element={<Patchdetails />} />
                                    <Route path="deploy" element={<Patchdeploy />} />
                                    <Route path="deploystatus" element={<PatchdeployStatus />} />
                                    <Route path="status" element={<Patchrequeststatus />} />
                                    <Route path="request" element={<Patchrequest />} />
                                    <Route path="download" element={<InputComponent />} />
                                    <Route path="transaction" element={<Transactionhistory />} />

                                </Route>
                            )}

                            {roller === 'develepor' && (

                                <Route path="/develepor" element={<Develepormain />} >
                                    <Route path="upload" element={<Registerpatch />} />
                                    <Route path="reupload" element={<Reuploadpatch />} />
                                    <Route path="history" element={<Patchdetails />} />
                                    <Route path="transaction" element={<Transactionhistory />} />
                                </Route>


                            )}
                            {roller === 'verifier' && (

                                <Route path="/verifier" element={<Verifiermain />} >
                                    <Route path="notverified" element={<Verification />} />
                                    <Route path="verified" element={<Verifystatus />} />
                                    <Route path="transaction" element={< Transactionhistory/>} />
                                </Route>
                            )}
                           
                            <Route path="*" element={<Error404 />} />

                        </Routes>
                    </Router>
                    
            </AccountContext.Provider>
        </>
    );
}

export default App;
