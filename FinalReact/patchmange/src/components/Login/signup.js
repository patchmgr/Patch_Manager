import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const bcrypt = require("bcryptjs")
    const navigate = useNavigate();

    
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };



    function bycrypter(pass) {
        const password = pass
        const saltRounds = 10

        bcrypt.genSalt(saltRounds, function (saltError, salt) {
            if (saltError) {
                throw saltError
            } else {
                bcrypt.hash(password, salt, function (hashError, hash) {
                    if (hashError) {
                        throw hashError
                    } else {
                        console.log(hash)
                        return hash
                    }
                })
            }
        })
    }

    const handleSubmit = () => {
        console.log(bycrypter(password))
        if (password === confirmPassword) {
            axios
                .post('http://localhost:5000/api/signupdetail', { uname: username, mail: email, key:password })
                .then((response) => {
                    console.log('Saved item:', response.data);
                })
                .catch((error) => {
                    console.error('Error saving item:', error);
                });
            alert("registered successfully")
             navigate('/login');

        } else {
            console.error('Password and confirm password do not match');
        }
    };

    return (
        <div className="modal modal-signin position-static d-block py-2" tabIndex="-1" role="dialog" id="modalSignin">
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h1 className="fw-bold mb-0 fs-2">Sign up for free</h1>
                    </div>
                    <div className="modal-body p-5 pt-0">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control rounded-3"
                                id="username"
                                name="uname"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control rounded-3"
                                id="email"
                                name="mail"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                className="form-control rounded-3"
                                id="password"
                                name="key"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                className="form-control rounded-3"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                        </div>
                        <div className="col-10 d-flex">
                            <input type="checkbox" className="form-check-input mx-2" id="showConfirmPassword" onChange={togglePasswordVisibility} />
                            <p>Show password</p>
                        </div>
                        <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="button" onClick={handleSubmit}>
                            Sign up
                        </button>
                        <small className="text-muted">By clicking Sign up, you agree to the terms of use.</small>
                        <br />
                        <small className="text-muted">
                            Already have an account? <Link to="/login">Login</Link>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
