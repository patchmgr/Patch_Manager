import React, { useEffect, useState } from 'react';
import connectContract from '../Web3components/ContractConnector';
import $ from 'jquery';
import Web3 from 'web3';
import 'datatables.net';

const Priority = () => {
    const [bugData, setBugData] = useState([]);
    const [featureData, setFeatureData] = useState([]);

    useEffect(() => {
        initializeDataTable();
    }, []);

    const initializeDataTable = () => {
        $('#MyTable').DataTable();
        $('#MyTable1').DataTable();
    };

    const getdata = async () => {
        await connectContract();
        const t = document.getElementById('softer').value;
        const result = await window.contract.methods.getbugs(t).call();
        const resulter = await window.contract.methods.obtfeatures(t).call();

        let b_arr = [];
        let bp_arr = [];
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].length; j++) {
                const a = await window.contract.methods.getbp(t, result[i][j]).call();
                b_arr.push(result[i][j]);
                bp_arr.push(a);
            }
        }

        let f_arr = [];
        const fp_arr = [];
        for (let i = 0; i < resulter.length; i++) {
            for (let j = 0; j < resulter[i].length; j++) {
                const a = await window.contract.methods.getfp(t, resulter[i][j]).call();
                f_arr.push(resulter[i][j]);
                fp_arr.push(a);
            }
        }

        // Populate bug table
        const bugData = [];
        for (let index = 0; index < b_arr.length; index++) {
            const bug = b_arr[index];
            let selectedValue;
            if (bp_arr[index] === '0') {
                selectedValue = '';
                for (let i = 0; i <= 5; i++) {
                    selectedValue += `<option key=${i} value=${i}>${i}</option>`;
                }
                selectedValue = `<select className="form-control">${selectedValue}</select>`;
            } else {
                selectedValue = `<p>${bp_arr[index]}</p>`;
            }
            const labelStatus = await window.contract.methods.bugcheck(t, bug).call();
            bugData.push({
                bug,
                selectedValue,
                labelStatus
            });
        }

        const featureData = [];
        for (let index = 0; index < f_arr.length; index++) {
            const feature = f_arr[index];
            let selectedValue;
            if (fp_arr[index] === '0') {
                selectedValue = '';
                for (let i = 0; i <= 5; i++) {
                    selectedValue += `<option key=${i} value=${i}>${i}</option>`;
                }
                selectedValue = `<select className="form-control">${selectedValue}</select>`;
            } else {
                selectedValue = `<p>${fp_arr[index]}</p>`;
            }
            const labelStatus = await window.contract.methods.featurecheck(t, feature).call();
            featureData.push({
                feature,
                selectedValue,
                labelStatus
            });
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
            const rowData = [
                bug.bug,
                bug.selectedValue,
                JSON.stringify(bug.labelStatus), // Convert object to string
            ];
            table.row.add(rowData).draw();
        });

        const table1 = $('#MyTable1').DataTable();
        table1.clear().draw();
        featureData.forEach((feature) => {
            const rowData = [
                feature.feature,
                feature.selectedValue,
                JSON.stringify(feature.labelStatus), // Convert object to string
            ];
            table1.row.add(rowData).draw();
        });
    };

    const handleSubmit = () => {
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
    
        console.log('Bug Array:', bugArray);
        console.log('Bug Selected Values:', bugSelectedValues);
        console.log('Feature Array:', featureArray);
        console.log('Feature Selected Values:', featureSelectedValues);
        const dropdownValue = document.getElementById('softer').value;
        console.log('Dropdown value:', dropdownValue);
    };
    



    return (
        <div>
            <div className="col-4 p-2">
                <select id="softer" className="form-select" aria-label="Default select example" onChange={getdata}>
                    <option defaultValue>software</option>
                    <option value="software1">software1</option>
                    <option value="software2">software2</option>
                    <option value="software3">software3</option>
                    <option value="software4">software4</option>
                    <option value="software5">software5</option>
                </select>
            </div>
            <div className="container text-center d-flex justify-content-around p-5" id="hero">
                <table className="table table-striped table-hover" id="MyTable">
                    <thead>
                        <tr>
                            <th>Bugs Name</th>
                            <th>Selected value</th>
                            <th>Label status</th>
                        </tr>
                    </thead>
                    <tbody id="bugTableBody"></tbody>
                </table>
                <table className="table table-striped table-hover" id="MyTable1">
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
            <div className="container text-center p-5">
                <input type="submit" value="Submit Value" className="btn btn-primary" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default Priority;

