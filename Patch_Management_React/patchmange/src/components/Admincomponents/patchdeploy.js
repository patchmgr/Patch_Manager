import React, { useEffect, useState, useRef, useContext } from 'react';
import $ from 'jquery';
import 'datatables.net';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AccountContext from '../context/AccountContext';

const Patchdeploy = () => {
    const [data, setData] = useState([]);
    const tableRef = useRef(null);
    const { account, contract, roller, username } = useContext(AccountContext);

    useEffect(() => {
        const init = async () => {
            try {
                if (contract) {
                    const newData = [];
                    const result = await contract.methods.details().call();
                    let c = 0;
                    for (var i = result.length - 1; i >= 0; i--) {
                        const vals = result[i];
                        if (vals[7] === 'Ready to Deploy') {
                            const row = [c + 1, vals[1], vals[2], vals[3], vals[4], timestampToDate(vals[9])];
                            newData.push(row);
                            c++;
                        }
                    }

                    setData(newData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        init();
    }, [contract]);

    useEffect(() => {
        if (data.length > 0) {
            $('#myTable').DataTable();
        }
    }, [data]);

    function timestampToDate(a) {
        const timestamp = Number(a);
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();
        return formattedTime;
    }


    const deployPatch = async (patchName) => {
        try {
            if (contract && account) {
                const transaction = await contract.methods.deploy(patchName).send({ from: account });
                const latestTransactionHash = transaction.transactionHash;
                console.log('Transaction hash: ' + latestTransactionHash);
                await axios.post('http://localhost:5000/api/transactionhistory', {
                    rolename: 'admin-deploy',
                    transactionName: username,
                    txhash: latestTransactionHash,
                });
                console.log('hello');
                toast.success(patchName + " is deployed", {
                    position: 'bottom-right',
                    autoClose: 1400,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });

                setTimeout(() => {
                    window.location.reload()
                }, 2000);

            }
        } catch (error) {
            const hashPattern = /"hash":"(.*?)"/;
            const match = error.message.match(hashPattern);
            const hash = match ? match[1] : null;

            console.error('Error:', error);
            await axios.post('http://localhost:5000/api/transactionhistory', {
                rolename: 'admin-deploy',
                transactionName: username,
                txhash: hash,
            });
            console.log('hello');
        }
    };

    return (
        <div>
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



            <div className="container text-center  p-3 border border-dark" id="dd">
                <table className="table table-striped  cell-border table-hover my-3" id="myTable">
                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>Patch name</th>
                            <th>Patch Description</th>
                            <th>Patch Platform</th>
                            <th>Patch features</th>
                            <th>Verified time</th>
                            <th>Deploy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="7">No data available</td>
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
                                    <td>
                                        <button onClick={() => deployPatch(row[1])} className="btn btn-primary p-2">
                                            Deploy
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Patchdeploy;
