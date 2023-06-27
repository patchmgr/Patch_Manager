import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [id, setId] = useState('');
    const navigate = useNavigate();

    const handleButtonClick = async () => {
        try {
            await axios.post('http://localhost:5000/api/items', { filler: id });
            localStorage.setItem('role', id);
            navigate(`/${id}/home`);
        } catch (error) {
            console.error(error);
        }
    };

    const getdatamongo = async () => {
        try {
            // console.log(response.data);
            // response.data.forEach(obj => {
            //     if (obj.hasOwnProperty('name')) {
            //         console.log(obj.name);
            //     }
            // });

            // const response = await axios.get('http://localhost:5000/api/items');
            // const names = response.data.map(obj => obj.username);
            // console.log(names);

            const response = await axios.get('http://localhost:5000/api/reporteddetails');
            console.log(response.data);


        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="col-3">
                <p>Enter user name</p>
                <input
                    type="text"
                    id="user"
                    name="id"
                    className="form-control"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <br />
                <button className="btn btn-info" onClick={handleButtonClick}>
                    Set User
                </button>
                <br />
                <br />

                <button className="btn btn-info" onClick={getdatamongo}>
                    Get data
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
