import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import AccountContext from '../context/AccountContext';


const Userreport = () => {
    const [user, setUser] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [reportValuesModal, setReportValuesModal] = useState([]);
    const [featureValuesModal, setFeatureValuesModal] = useState([]);
    const [isReportSent, setIsReportSent] = useState(false);
    const [dropdownValueModal, setDropdownValueModal] = useState('');

    const { account, contract, roller, username } = useContext(AccountContext);

    useEffect(() => {
        const getdatamongo = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile', { withCredentials: true });
                const { role, username } = response.data;
                setUser(username);
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

    const handleSaveChanges = async () => {
        try {
            await axios.post('http://localhost:5000/api/reporteddetails', {
                uname: user,
                soft: dropdownValueModal,
                bugarray: reportValuesModal,
                ftarray: featureValuesModal
            });

            setIsReportSent(true);
            setModalIsOpen(false);
            setReportTextBoxes(['']);
            setFeatureTextBoxes(['']);
            // Handle success
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const nonEmptyReportValues = reportTextBoxes.filter(value => value.trim() !== '');
        const nonEmptyFeatureValues = featureTextBoxes.filter(value => value.trim() !== '');
        const dropdownValue = document.getElementById('softer').value;

        setReportValuesModal(nonEmptyReportValues);
        setFeatureValuesModal(nonEmptyFeatureValues);
        setDropdownValueModal(dropdownValue);

        setModalIsOpen(true); // Open the modal
    };

    const formRef = useRef(null);

    const handleFormReset = () => {
        formRef.current.reset();
    };

    return (
        <div>
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel1">User Report</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>Reported bugs: {reportValuesModal.join(', ')}</h5>
                            <h5>Optional Features: {featureValuesModal.join(', ')}</h5>
                            <h5>Software: {dropdownValueModal}</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSaveChanges}>
                                Send Report
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            <div className='container border border-dark'>
                <div className="container text-center" id="dd">
                    {isReportSent && <h5>Report sent successfully!</h5>}

                    <form ref={formRef} onSubmit={handleSubmit} onReset={handleFormReset}>
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
                            <div className="accordion" id="accordionExample1">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne1">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne1" aria-expanded="true" aria-controls="collapseOne1">
                                            Report on bugs
                                        </button>
                                    </h2>
                                    <div id="collapseOne1" className="accordion-collapse collapse show" aria-labelledby="headingOne1"
                                        data-bs-parent="#accordionExample1">
                                        <div className="accordion-body">
                                            {reportTextBoxes.map((textBox, index) => (
                                                <div className="row" key={index}>
                                                    <div className="col-8 my-1">
                                                        <div className='d-flex'>
                                                            <input type="text" className="form-control mx-1" value={textBox} placeholder='Enter bugs you are facing' onChange={e => handleReportTextBoxChange(index, e.target.value)} />
                                                            <button className="btn btn-info mx-1   " onClick={handleAddReportTextBox}> add </button>
                                                            <button className="btn btn-danger mx-1" onClick={() => handleRemoveTextBox(index, 'report')}>remove</button>
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
                            <div className="accordion" id="accordionExample2">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne2">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo2" aria-expanded="true" aria-controls="collapseTwo2">
                                            Optional features
                                        </button>
                                    </h2>
                                    <div id="collapseTwo2" className="accordion-collapse collapse show" aria-labelledby="headingOne2"
                                        data-bs-parent="#accordionExample2">
                                        <div className="accordion-body">
                                            {featureTextBoxes.map((textBox, index) => (
                                                <div className="row" key={index}>
                                                    <div className="col-8 my-1">
                                                        <div className='d-flex'>
                                                            <input type="text" className="form-control mx-1" value={textBox} placeholder='Enter optional features' onChange={e => handleFeatureTextBoxChange(index, e.target.value)} />
                                                            <button className="btn btn-info mx-1 " onClick={handleAddFeatureTextBox}>add</button>
                                                            <button className="btn btn-danger mx-1" onClick={() => handleRemoveTextBox(index, 'feature')}>remove</button>
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
                            <button type="submit" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                Submit
                            </button>

                        </div>
                    </form>

                    <span id="not"></span>
                </div>
            </div>
            <br /><br /><br /><br /><br /><br />
        </div>
    );
}

export default Userreport;
