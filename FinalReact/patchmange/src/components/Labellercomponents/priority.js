import React, { useEffect, useState, useContext } from 'react';
import $ from 'jquery';
import Web3 from 'web3';
import 'datatables.net';
import AccountContext from '../context/AccountContext';
import axios from 'axios';
import AlertModal from '../extras/modalpop';


const Priority = () => {
    const [bugData, setBugData] = useState([]);
    const [featureData, setFeatureData] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    const { account, contract, roller, username } = useContext(AccountContext);



    useEffect(() => {
        initializeDataTable();
    }, []);

    const initializeDataTable = () => {
        $('#MyTable').DataTable();
        $('#MyTable1').DataTable();
        const table = $('#MyTable').DataTable();
        table.search('Pending').draw();
        const table1 = $('#MyTable1').DataTable();
        table1.search('Pending').draw();
    };

    const getdata = async () => {
        const t = document.getElementById('softer').value;

        const b_arr = await window.contract.methods.barr(t).call();
        const f_arr = await window.contract.methods.farr(t).call();
        console.log(b_arr);
        console.log(f_arr);


        const bugData = [];
        for (let index = 0; index < b_arr.length; index++) {


            if (b_arr[index].software === t) {
                const bug = b_arr[index].bugs;
                let selectedValue;

                if (b_arr[index].bug_priority == '0') {
                    selectedValue = '';
                    for (let i = 0; i <= 5; i++) {
                        selectedValue += `<option key=${i} value=${i}>${i}</option>`;
                    }
                    selectedValue = `<select className="form-control">${selectedValue}</select>`;
                } else {
                    selectedValue = `<p>${b_arr[index].bug_priority}</p>`;
                }
                const labelStatus = b_arr[index].bug_status;
                bugData.push({
                    bug,
                    selectedValue,
                    labelStatus
                });
            }

        }

        const featureData = [];
        for (let index = 0; index < f_arr.length; index++) {


            if (f_arr[index].software === t) {
                const feature = f_arr[index].features;
                let selectedValue;
                if (f_arr[index].feature_priority == '0') {
                    selectedValue = '';
                    for (let i = 0; i <= 5; i++) {
                        selectedValue += `<option key=${i} value=${i}>${i}</option>`;
                    }
                    selectedValue = `<select className="form-control">${selectedValue}</select>`;
                } else {
                    selectedValue = `<p>${f_arr[index].feature_priority}</p>`;
                }
                const labelStatus = f_arr[index].feature_status;
                featureData.push({
                    feature,
                    selectedValue,
                    labelStatus
                });
            }

        }

        setBugData(bugData);
        setFeatureData(featureData);
    };

    useEffect(() => {
        populateTables();
    }, [bugData, featureData]);

    const populateTables = () => {
        const table = $('#MyTable').DataTable();
        table.clear().draw();
        bugData.forEach((bug) => {
            let labelStatus = 'Completed';
            if (bug.labelStatus === 'not labelled') {
                labelStatus = 'Pending';
            }
            const rowData = [
                bug.bug,
                bug.selectedValue,
                labelStatus,
            ];
            table.row.add(rowData).draw();
        });

        const table1 = $('#MyTable1').DataTable();
        table1.clear().draw();
        featureData.forEach((feature) => {
            let labelStatus = 'Completed';
            if (feature.labelStatus === 'not labelled') {
                labelStatus = 'Pending';
            }
            const rowData = [
                feature.feature,
                feature.selectedValue,
                labelStatus,
            ];
            table1.row.add(rowData).draw();
        });
    };











    const handleSubmit = async () => {
        const bugArray = [];
        const bugSelectedValues = [];
        const featureArray = [];
        const featureSelectedValues = [];

        const bugTableBody = document.getElementById('bugTableBody');
        const featureTableBody = document.getElementById('featureTableBody');

        Array.from(bugTableBody.rows).forEach((row) => {
            const bug = row.cells[0].innerText;
            const selectElement = row.cells[1].getElementsByTagName('select')[0];
            const selectedValue = selectElement ? selectElement.value : '';

            if (selectedValue && selectedValue !== '0') {
                bugArray.push(bug);
                bugSelectedValues.push(selectedValue);
            }
        });

        Array.from(featureTableBody.rows).forEach((row) => {
            const feature = row.cells[0].innerText;
            const selectElement = row.cells[1].getElementsByTagName('select')[0];
            const selectedValue = selectElement ? selectElement.value : '';

            if (selectedValue && selectedValue !== '0') {
                featureArray.push(feature);
                featureSelectedValues.push(selectedValue);
            }
        });



        const dropdownValue = document.getElementById('softer').value;
        console.log('Bug Array:', bugArray);
        console.log('Bug Selected Values:', bugSelectedValues);
        console.log('Feature Array:', featureArray);
        console.log('Feature Selected Values:', featureSelectedValues);
        console.log('Dropdown value:', dropdownValue);


        const modalMessage = [
            `bugArray: ${bugArray.length > 0 ? bugArray.join(', ') : 'null'}`,
            `bugSelectedValues: ${bugSelectedValues.length > 0 ? bugSelectedValues.join(', ') : 'null'}`,
            `featureArray: ${featureArray.length > 0 ? featureArray.join(', ') : 'null'}`,
            `featureSelectedValues: ${featureSelectedValues.length > 0 ? featureSelectedValues.join(', ') : 'null'}`,
            `dropdownValue: ${dropdownValue || 'null'}`
        ].join('\n');




        console.log('Modal Message:', modalMessage);
        setModalMessage(modalMessage)
        setShowModal(true);
        try {
            const transaction = await window.contract.methods.buglabel(dropdownValue, bugArray, bugSelectedValues, featureArray, featureSelectedValues).send({ from: account });
            const latestTransactionHash = transaction.transactionHash;
            console.log('Transaction hash: ' + latestTransactionHash);
            await axios.post('http://localhost:5000/api/transactionhistory', { rolename: "labeller-priority", transactionName: username, txhash: latestTransactionHash });
            console.log("hello");
        } catch (error) {
            const hashPattern = /"hash":"(.*?)"/;
            const match = error.message.match(hashPattern);
            const hash = match ? match[1] : null;
            console.error('Error:', error);
            await axios.post('http://localhost:5000/api/transactionhistory', { rolename: "labeller-priority", transactionName: username, txhash: hash });
            console.log("hello");
        }


    };

    function notlabel() {
        const table = $('#MyTable').DataTable();
        table.search('Pending').draw();
        const table1 = $('#MyTable1').DataTable();
        table1.search('Pending').draw();
    }

    function label() {
        const table = $('#MyTable').DataTable();
        table.search('Completed').draw();
        const table1 = $('#MyTable1').DataTable();
        table1.search('Completed').draw();
    }




    return (

        <div className='container  text-center border border-dark'>
            {showModal && (
                <AlertModal message={modalMessage} hid={true} setShowModal={setShowModal} />
            )}

            <div className=" d-flex inline col-4 my-3 mx-4">
                <select id="softer" className="form-select mx-3 " aria-label="Default select example" onChange={getdata}>
                    <option defaultValue>software</option>
                    <option value="software1">software1</option>
                    <option value="software2">software2</option>
                    <option value="software3">software3</option>
                    <option value="software4">software4</option>
                    <option value="software5">software5</option>
                </select>

                <button className='btn btn-primary mx-2' onClick={label}>Labelled</button>
                <button className='btn btn-secondary ' onClick={notlabel}>NotLabelled</button>
            </div>
            <div className="d-flex justify-content-evenly p-5 d-inline" id="hero">
                <div className='container p-2'>
                    <table className="table table-bordered table-striped table-hover mx-3 " id="MyTable">
                        <thead>
                            <tr>
                                <th>Bugs Name</th>
                                <th>Selected value</th>
                                <th>Label status</th>
                            </tr>
                        </thead>
                        <tbody id="bugTableBody"></tbody>
                    </table>
                </div>
                <div className='container p-2'>

                    <table className="table table-bordered table-striped table-hover mx-3" id="MyTable1">
                        <thead>
                            <tr>
                                <th>Feature Name</th>
                                <th>Selected value</th>
                                <th>Label status</th>
                            </tr>
                        </thead>
                        <tbody id="featureTableBody"></tbody>
                    </table>
                </div>
            </div>
            <div className=" text-center my-3 ">
                <input type="submit" value="Submit Value" className="btn btn-primary" onClick={handleSubmit} />
            </div>


        </div>
    );
};

export default Priority;

