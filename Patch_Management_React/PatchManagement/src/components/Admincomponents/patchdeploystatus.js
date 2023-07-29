import React, { useEffect, useState, useContext } from 'react';
import $ from 'jquery';
import 'datatables.net';
import axios from 'axios';
import { Web3Storage } from 'web3.storage';
import { Download } from 'react-feather';

import AccountContext from '../context/AccountContext';

const PatchdeployStatus = () => {
    const { account, contract, roller, username } = useContext(AccountContext);

    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);
    const [deployedIds, setDeployedIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (contract) {
                    const deployedIds = await contract.methods.deployedarray().call();
                    const details = await contract.methods.details().call();
                    setResult(details);
                    setDeployedIds(deployedIds);
                    console.log(details)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [contract]);


    useEffect(() => {
        if (data.length > 0) {
            $('#myTable').DataTable();
        }
    }, [data]);

    useEffect(() => {
        if (result.length > 0) {
            const newData = [];
            for (let i = deployedIds.length - 1; i >= 0; i--) {
                const id = deployedIds[i];
                const detail = result.find(item => item[0] === id);
                console.log(detail)
                if (detail) {
                    const row = [
                        deployedIds.length - i,
                        detail[1],
                        detail[2],
                        detail[3],
                        detail[4],
                        timestampToDate(detail[9]),
                        'Deployed'
                    ];
                    newData.push(row);
                }
            }
            setData(newData);
            console.log(newData);
        }
    }, [result, deployedIds]);

    const makeStorageClient = () => {
        return new Web3Storage({ token: process.env.REACT_APP_getAccessToken });
    };

    async function downloadFile(cid) {
        const client = makeStorageClient();
        const res = await client.get(cid);
        const files = await res.files();
        if (files.length > 0) {
            const file = files[0];
            const downloadUrl = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = file.name;
            link.click();
            URL.revokeObjectURL(downloadUrl);
        }
    }

    function timestampToDate(a) {
        const timestamp = Number(a);
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();
        return formattedTime;
    }

    const func1 = async (patchName, ware) => {
        try {
            console.log("hello");

            for (let i = 0; i < result.length; i++) {
                const t = result[i];
                if (t[1] === patchName) {
                    console.log(t[11]);
                    downloadFile(t[11]);
                    break;
                }
            }
        } catch (error) {
            console.error('Error downloading patch:', error);
        }
    }

    return (
        <div>
            <div className="container text-center p-3 border border-dark" id="dd">
                <div className='table-responsive'>
                    <table className="table table-striped  cell-border table-hover my-3" id="myTable">
                        <thead>
                            <tr>
                                <th>Sno</th>
                                <th>Patch name</th>
                                <th>Patch Description</th>
                                <th>Patch Platform</th>
                                <th>Patch features</th>
                                <th>Deployed ytime</th>
                                <th>Status</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan="8">No data available</td>
                                </tr>
                            ) : (
                                data.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row[0]}</td>
                                        <td>{row[1]}</td>
                                        <td>{JSON.parse(row[2]).join(", ")}</td>
                                        <td>{row[3]}</td>
                                        <td>{JSON.parse(row[4]).join(", ")}</td>
                                        <td>{row[5]}</td>
                                        <td>{row[6]}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => func1(row[1], row[3])}
                                            >
                                                DOWNLOAD <Download />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PatchdeployStatus;
