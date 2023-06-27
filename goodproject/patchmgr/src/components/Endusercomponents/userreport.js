import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Userreport = () => {
    const [user, setUser] = useState([]);


    useEffect(() => {

        const getdatamongo = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                const names = response.data.map(obj => obj.username);
                console.log(names);
                setUser(names[names.length-1]);
                console.log("the current provider is"+names[names.length-1]);
    
            } catch (error) {
                console.error(error);
            }
        };
        getdatamongo();
    }, []);



    const [reportTextBoxes, setReportTextBoxes] = useState(['']); // State to store the report text boxes
    const [featureTextBoxes, setFeatureTextBoxes] = useState(['']); // State to store the feature text boxes

    // Function to handle removing a text box
    const handleRemoveTextBox = (index, section) => {
        if (section === 'report' && reportTextBoxes.length === 1) {
            return; // Skip removal if it's the only report text box
        }
        if (section === 'feature' && featureTextBoxes.length === 1) {
            return; // Skip removal if it's the only feature text box
        }

        if (section === 'report') {
            setReportTextBoxes(prevTextBoxes => prevTextBoxes.filter((_, i) => i !== index));
        } else if (section === 'feature') {
            setFeatureTextBoxes(prevTextBoxes => prevTextBoxes.filter((_, i) => i !== index));
        }
    };


    // Function to handle adding a new report text box
    const handleAddReportTextBox = () => {
        setReportTextBoxes(prevTextBoxes => [...prevTextBoxes, '']);
    };


    // Function to handle report text box value change
    const handleReportTextBoxChange = (index, value) => {
        setReportTextBoxes(prevTextBoxes => {
            const updatedTextBoxes = [...prevTextBoxes];
            updatedTextBoxes[index] = value;
            return updatedTextBoxes;
        });
    };

    // Function to handle adding a new feature text box
    const handleAddFeatureTextBox = () => {
        setFeatureTextBoxes(prevTextBoxes => [...prevTextBoxes, '']);
    };



    // Function to handle feature text box value change
    const handleFeatureTextBoxChange = (index, value) => {
        setFeatureTextBoxes(prevTextBoxes => {
            const updatedTextBoxes = [...prevTextBoxes];
            updatedTextBoxes[index] = value;
            return updatedTextBoxes;
        });
    };

    const handleSubmit = async() => {
        
        const nonEmptyReportValues = reportTextBoxes.filter(value => value.trim() !== '');
        const nonEmptyFeatureValues = featureTextBoxes.filter(value => value.trim() !== '');
        const dropdownValue = document.getElementById('softer').value;

        console.log('Report values:', nonEmptyReportValues);
        console.log('Feature values:', nonEmptyFeatureValues);
        console.log('Dropdown value:', dropdownValue);

        await axios.post('http://localhost:5000/api/reporteddetails', { uname: user, soft: dropdownValue, bugarray: nonEmptyReportValues,ftarray :nonEmptyFeatureValues});

    };


    return (
        <div>
            <div className="container text-center" id="dd">
                <div className="col-4 p-2">
                <p>Select platform:</p>
                    <select id="softer" className="form-select" aria-label="Default select example">
                        <option defaultValue={"software1"}>software1</option>
                        <option value="software2">software2</option>
                        <option value="software3">software3</option>
                        <option value="software4">software4</option>
                        <option value="software5">software5</option>
                    </select>
                </div>

                <div className="container my-3">
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Report on bugs
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    {reportTextBoxes.map((textBox, index) => (
                                        <div className="row" key={index}>
                                            <div className="col-8 my-1">
                                                <div className='d-flex'>
                                                    <input  type="text" className="form-control mx-1" value={textBox} placeholder='Enter bugs you are facing' onChange={e => handleReportTextBoxChange(index, e.target.value)} />
                                                    <button className="btn btn-info mx-1 " onClick={handleAddReportTextBox}>+</button>
                                                    <button className="btn btn-danger mx-1" onClick={() => handleRemoveTextBox(index, 'report')}>-</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container my-3">
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne1">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                    Optional features
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingOne1"
                                data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    {featureTextBoxes.map((textBox, index) => (
                                        <div className="row" key={index}>
                                            <div className="col-8 my-1">
                                                <div className='d-flex'>
                                                    <input type="text" className="form-control mx-1" value={textBox}  placeholder='Enter optional features ' onChange={e => handleFeatureTextBoxChange(index, e.target.value)}/>
                                                    <button className="btn btn-info mx-1 " onClick={handleAddFeatureTextBox}>+</button>
                                                    <button className="btn btn-danger mx-1" onClick={() => handleRemoveTextBox(index, 'report')}>-</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container my-5'>
                    <input type="submit" className="btn btn-primary" onClick={handleSubmit} />
                </div>
                <span id="not"></span>
            </div>
        </div>
    );
}

export default Userreport;
