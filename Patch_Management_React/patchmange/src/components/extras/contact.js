import React, { useState, useEffect } from 'react';

const Contactpage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className='text-center col-3'>
                <label>
                    First Name:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="form-control" />
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className='form-control' />
                </label>
                <br />
                <br />
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default Contactpage;
