import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import App from '../App';


export const Up = () => {
    let { id } = useParams();
    return (
        <div>
            <h4>The user name is {id}</h4>
        </div>
    );
};

export const Upper = () => {
    let { id } = useParams();
    return id;
  };
  


const LoginPage = (props) => {
    const [id, setid] = useState();
    let navigate = useNavigate();
    let location = useLocation();


    return (
        <>
            <div className="container">
                <div className="col-3">
                    <p>Enter user name</p>
                    <input type="text" onChange={(event) => { setid(event.target.value); }} id="user" className="form-control" />
                    <br />
                    {/* <button className="btn btn-info" onClick={() => { navigate('/home' + '/' + id); }}>Set User</button> */}
{/* 
                    <button className="btn btn-info" onClick={() => { navigate(`/home/${id}`); }}>
                        Set User
                    </button> */}
                    
                    <button className="btn btn-info" onClick={() => { navigate(`/home`, {state:{id:id}})}}>
                        Set User
                    </button> 

                </div>
            </div>

            
        </>
    );
};

export default LoginPage;

