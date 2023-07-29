import React, { useEffect, useState, useContext } from 'react';
import 'datatables.net';
import { Outlet, Link } from 'react-router-dom';
import AccountContext from '../context/AccountContext';
import axios from 'axios';
import AlertModal from '../extras/modalpop';



const Patchrequest = () => {

    const [data, setData] = useState([]);
    const [bArr, setBArr] = useState([]);
    const [bpArr, setBPArr] = useState([]);
    const [fArr, setFArr] = useState([]);
    const [fpArr, setFPArr] = useState([]);
    const [selectedBugs, setSelectedBugs] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [software, setsoftware] = useState('');

    const { account, contract, roller, username } = useContext(AccountContext);


    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const getdata = async (e) => {

        const temp = e;
        const result = await window.contract.methods.barr(temp).call();
        const resulter = await window.contract.methods.farr(temp).call();
        let b_arr = [];
        let bp_arr = [];
        for (let i = 0; i < result.length; i++) {
            if (result[i].software == temp) {
                if (result[i].bug_priority != '0' && result[i].bug_reqstatus !== "sent") {
                    b_arr.push(result[i].bugs);
                    bp_arr.push(result[i].bug_priority)
                }
            }
        }
        let f_arr = [];
        let fp_arr = [];
        for (let i = 0; i < resulter.length; i++) {
            if (resulter[i].software == temp) {
                if (resulter[i].feature_priority != '0' && resulter[i].feature_reqstatus !== "sent") {
                    f_arr.push(resulter[i].features);
                    fp_arr.push(resulter[i].feature_priority)
                }
            }
        }
        setsoftware(e);
        setBArr(b_arr);
        setBPArr(bp_arr);
        setFArr(f_arr);
        setFPArr(fp_arr);

    }




    function handleCheckboxChange(event) {
        const value = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            if (event.target.dataset.type === 'bug') {
                setSelectedBugs(prevState => [...prevState, value]);
            } else if (event.target.dataset.type === 'feature') {
                setSelectedFeatures(prevState => [...prevState, value]);
            }
        } else {
            if (event.target.dataset.type === 'bug') {
                setSelectedBugs(prevState => prevState.filter(item => item !== value));
            } else if (event.target.dataset.type === 'feature') {
                setSelectedFeatures(prevState => prevState.filter(item => item !== value));
            }
        }
    }



    const submitter = async () => {
        const modalMessage = [
            `selectedBugs: ${selectedBugs.length > 0 ? selectedBugs.join(', ') : 'null'}`,
            `selectedFeatures: ${selectedFeatures.length > 0 ? selectedFeatures.join(', ') : 'null'}`,
        ].join('\n');
        try {
            const transaction = await window.contract.methods.addDevData(selectedBugs,selectedFeatures,software).send({ from: account });
            const latestTransactionHash = transaction.transactionHash;
            console.log('Transaction hash: ' + latestTransactionHash);
            await axios.post('http://localhost:5000/api/transactionhistory', { rolename: "admin-request",transactionName:username, txhash: latestTransactionHash });
            console.log("hello");
        } catch (error) {
            const hashPattern = /"hash":"(.*?)"/;
            const match = error.message.match(hashPattern);
            const hash = match ? match[1] : null;
           
            console.error('Error:', error);
            await axios.post('http://localhost:5000/api/transactionhistory', { rolename: "admin-request",transactionName:username, txhash: hash });
            console.log("hello");
        }

       




        console.log('Modal Message:', modalMessage);
        setModalMessage(modalMessage)
        setShowModal(true);
    }

    return (
        <div className=' container text-center p-3 border border-dark'>

            {showModal && (
                <AlertModal message={modalMessage} hid={true} setShowModal={setShowModal} />
            )}

            <div className="col-4 p-2">
                <select className="form-select" aria-label="Default select example" onChange={(e) => getdata(e.target.value)}>
                    <option defaultValue={'software'}>software</option>
                    <option value="software1">software1</option>
                    <option value="software2">software2</option>
                    <option value="software3">software3</option>
                    <option value="software4">software4</option>
                    <option value="software5">software5</option>
                </select>
            </div>

            <div className="container text-center" id="carded">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Bugs and Priority</div>
                            <div className="card-body">
                                {bArr.map((bug, index) => (

                                    <div key={index} className="input-group mb-3">
                                        <div className="input-group mb-3">
                                            <div className="input-group-text">
                                                <input className="form-check-input mt-0 p-2" type="checkbox"
                                                    value={bug}
                                                    aria-label="Checkbox for following text input"
                                                    data-type="bug"
                                                    onChange={handleCheckboxChange} />
                                            </div>
                                            <input type="text" className="form-control " aria-label="Text input with checkbox" value={bug} readOnly />
                                            <span className="input-group-text">Priority: {bpArr[index]}</span>
                                        </div>
                                    </div>


                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Features and Priority</div>
                            <div className="card-body">
                                {fArr.map((feature, index) => (
                                    <div key={index} className="input-group mb-3">
                                        <div className="input-group mb-3">
                                            <div className="input-group-text">
                                                <input className="form-check-input mt-0 p-2" type="checkbox"
                                                    value={feature}
                                                    aria-label="Checkbox for following text input"
                                                    data-type="feature"
                                                    onChange={handleCheckboxChange} />
                                            </div>
                                            <input type="text" className="form-control " aria-label="Text input with checkbox" value={feature} readOnly />
                                            <span className="input-group-text">Priority: {fpArr[index]}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container text-center p-lg-5">
                <button onClick={submitter} className="btn btn-info">submit</button>
            </div>
            <div className="container ">
                <Outlet />
            </div>
        </div>
    );
};

export default Patchrequest;
