import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = (props) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:5000/api/signupdetail', {
                params: {
                    identifier: identifier,
                    password: password
                },
                withCredentials: true
            });

            if (response.data.status === 'success') {
                axios.get('http://localhost:5000/api/profile', { withCredentials: true })
                    .then((response) => {
                        const { role, username } = response.data;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                props.flag(true);

                const { token, role, user } = response.data;
                
                navigate(`/${role}`);
                window.location.reload()

              

            } else {
                toast.error(' incorrect details', {
                    position: 'bottom-right',
                    autoClose: 1400,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="modal modal-signin position-static d-block py-2" tabIndex="-1" role="dialog" id="modalSignin">
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
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h1 className="fw-bold mb-0 fs-2">Login page</h1>
                    </div>
                    <div className="modal-body p-5 pt-0">
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    id="identifier"
                                    name="identifier"
                                    placeholder="Username"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                />
                                <label htmlFor="username">Username</label>
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

                            <div className="col-10 d-flex">
                                <input type="checkbox" className="form-check-input mx-2" id="showConfirmPassword" onChange={togglePasswordVisibility} />
                                <p>Show password</p>
                            </div>
                            <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">
                                Login
                            </button>
                        </form>

                        <br />
                        <br />
                        <h6 className="text-muted">
                            Don't have an account? <Link to="/signup">Signup</Link>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
