import React, { useEffect } from "react";
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

function App() {
    useEffect(() => {
        connectMetamask();
    }, []);

    return (
        <>
            <Router>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/home" element={<Homepage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<Contactpage />} />
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/user/home" element={<Usermain />} >
                        <Route path="download" element={<Userdownload />} />
                        <Route path="report" element={<Userreport />} />
                    </Route>

                    <Route path="/labeller/home" element={<Labellermain />} >
                        <Route path="feedback" element={<Userfeedback />} />
                        <Route path="priority" element={<Priority />} />
                    </Route>
                    
                    <Route path="/admin/home" element={<Adminmain />} >
                        <Route path="details" element={<Patchdetails />} />
                        <Route path="deploy" element={<Patchdeploy />} />
                        <Route path="status" element={<Patchrequeststatus />} />
                        <Route path="request" element={<Patchrequest />}/ >
                        <Route path="download" element={<InputComponent />} />
                    </Route>

                    <Route path="/develepor/home" element={<Develepormain />} >
                        <Route path="upload" element={<Registerpatch/>} />
                        <Route path="history" element={<Verifystatus />} />
                    </Route>

                    <Route path="/verifier/home" element={<Verifiermain />} >
                        <Route path="notverified" element={<Verification />} />
                        <Route path="verified" element={<Verifystatus />} />
                    </Route>


                    <Route path=":id/about"
                        element=
                        {
                            <>
                                <Endusernav />
                                <AboutPage />
                            </>
                        } />
                    <Route path=":id/contact"
                        element=
                        {
                            <>
                                <Endusernav />
                                <Contactpage />
                            </>
                        } />



                    <Route path="*" element={<Error404 />} />

                </Routes>
            </Router>
        </>
    );
}

export default App;
