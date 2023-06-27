import React, { useEffect, useState } from 'react';
import connectContract from '../Web3components/ContractConnector';
import $ from 'jquery';

import 'datatables.net';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const Patchdetails = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await connectContract();
                if (!window.contract || !window.contract.methods) {
                    throw new Error('Contract methods not available');
                }

                const result = await window.contract.methods.details().call();
                const newData = [];

                for (var i = 0; i < result.length; i++) {
                    const vals = result[i];
                    const row = [vals[0], vals[12], vals[1], vals[2], vals[3], vals[4], timestampToDate(vals[8]), vals[6], vals[7]];
                    newData.push(row);
                }
                setData(newData);
                console.log(newData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    function timestampToDate(a) {
        const timestamp = Number(a);
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();
        return formattedTime;
    }


    const geterror = async (id) => {
        console.log(id)
        const failedId = await window.contract.methods.verificationfailed().call();
        const failedReason = await window.contract.methods.failedreason().call();
        for (let i = 0; i < failedId.length; i++) {
            if (failedId[i] ==id) {
                alert("Failed reason : " + failedReason[i]);
                break;
            }
        }
    }


        useEffect(() => {
            if (data.length > 0) {
                $('#myTable').DataTable();
            }
        }, [data]);

        return (
            <div>
                <FontAwesomeIcon icon={faCircleInfo} style={{ color: '#ff6161' }} />

                <div className="container text-center" id="dd">
                    <br />
                    <br />
                    <table className="table table-striped table-hover" id="myTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Request no</th>
                                <th>Patch name</th>
                                <th>Description</th>
                                <th>Platform</th>
                                <th>Features</th>
                                <th>Registered time</th>
                                <th>Verify</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, i) => (
                                <tr key={i}>
                                    <td>{row[0].toString()}</td>
                                    <td>{row[1].toString()}</td>
                                    <td>{row[2]}</td>
                                    <td>{row[3]}</td>
                                    <td>{row[4]}</td>
                                    <td>{row[5]}</td>
                                    <td>{row[6]}</td>

                                    <td>
                                        {row[7]}
                                        {row[7] === 'Verification failed' ? (
                                                <FontAwesomeIcon icon={faCircleInfo} style={{ color: '#ff6161' }} onClick={() => { geterror(row[0]) }}/>
                                        ) : null}
                                    </td>

                                    <td>{row[8]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    export default Patchdetails;
