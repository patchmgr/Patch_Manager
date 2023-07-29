import React, { useEffect, useState, useContext } from 'react';
import Web3 from 'web3';
import { Web3Storage } from 'web3.storage';
import AccountContext from '../context/AccountContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Verification = () => {
    const { account, contract, roller, username } = useContext(AccountContext);
    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);
    const [reason, setReason] = useState('');
    const [name, setName] = useState('');

    const [hash, setHash] = useState('');

    function timestampToDate(a) {
        const timestamp = Number(a);
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();
        return formattedTime;
    }

    const [file, setFile] = useState(null);
    const [downloadCid, setDownloadCid] = useState('');

    const handleDownload = async () => {
        if (downloadCid) {
            try {
                await downloadFile(downloadCid);
            } catch (error) {
                console.error('Failed to download file:', error);
            }
        }
    };



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



    useEffect(() => {
        const fetchData = async () => {
            try {
                if (contract) {
                    const newData = [];
                    const result = await window.contract.methods.details().call();

                    setResult(result);
                    for (var i = 0; i < result.length; i++) {
                        const t = result[i];
                        if (t[6] === 'In progress') {
                            const row = [t[1], t[3], t[2], t[4], timestampToDate(t[8])];
                            newData.push(row);
                        }
                    }
                    setData(newData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [contract]);


    const func1 = async (t) => {
        try {
            const transaction = await window.contract.methods.verifySuccess(t).send({ from: account });
            const latestTransactionHash = transaction.transactionHash;
            console.log('Transaction hash: ' + latestTransactionHash);
            await axios.post('http://localhost:5000/api/transactionhistory', { rolename: "verifier-accept", transactionName: username, txhash: latestTransactionHash });

            toast.success(t + 'Verified Successfully', {
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
        } catch (error) {
            const hashPattern = /"hash":"(.*?)"/;
            const match = error.message.match(hashPattern);
            const hash = match ? match[1] : null;

            console.error('Error:', error);
            await axios.post('http://localhost:5000/api/transactionhistory', { rolename: "verifier-accept", transactionName: username, txhash: hash });
        }
    };

    const func2 = async (t, str) => {
        try {

            const transaction = await window.contract.methods.verifyFail(t, str).send({ from: account });
            const latestTransactionHash = transaction.transactionHash;
            await axios.post('http://localhost:5000/api/transactionhistory', { rolename: "verifier-reject", transactionName: username, txhash: latestTransactionHash });

            toast.success(t + 'Verified  Successfully', {
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
        } catch (error) {
            const hashPattern = /"hash":"(.*?)"/;
            const match = error.message.match(hashPattern);
            const hash = match ? match[1] : null;


            console.error('Error:', error);
            await axios.post('http://localhost:5000/api/transactionhistory', { rolename: "verifier-reject", transactionName: username, txhash: hash });
            console.log("hello");
        }
    };




    const download = async (patchName) => {
        try {
            for (let i = 0; i < result.length; i++) {
                const t = result[i];
                if (t[1] === patchName) {
                    downloadFile(t[11]);
                    break;
                }
            }
        } catch (error) {
            console.error('Error downloading patch:', error);
        }
    };





    return (
        <>
            <div className='container border border-dark'>
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

                <div className="modal fade" id="example" aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    {name}
                                </h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body d-flex justify-content-center">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                                <button className="btn btn-danger btn" type="button" onClick={() => func2(name, reason)}>
                                    Reject the patch
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container my-3">

                    <div className="accordion" id="accordionExample">


                        {data.length === 0 ? (
                            <h5 className='my-3 text-center'>No data available</h5>
                        ) : (
                           data.map((item, index) => (
                            <div className="accordion-item" key={index}>
                            <h2 className="accordion-header" id={`heading${index}`}>
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${index}`}
                                    aria-expanded={index === 0 ? 'true' : 'false'}
                                    aria-controls={`collapse${index}`}
                                >
                                    {item[0]} {/* Patch name */}
                                </button>
                            </h2>
                            <div id={`collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <h5 className="card-title">Patch platform</h5>
                                    <p className="card-text">{item[1]}</p> {/* Patch details */}
                                    <h5 className="card-title">Patch description</h5>
                                    <p className="card-text">{JSON.parse(item[2]).join(',')}</p> {/* Patch features */}
                                    <h5 className="card-title">Patch features</h5>
                                    <p className="card-text">{JSON.parse(item[3]).join(',')}</p> {/* Patch features */}
                                    <h5 className="card-title">Registered time</h5>
                                    <p className="card-text">{item[4]}</p> {/* Registered time */}
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <button className="btn btn-primary" type="button" onClick={() => download(item[0])}>
                                            Download
                                        </button>
                                        <div>
                                            <button className="btn btn-success btn me-2" type="button" onClick={() => func1(item[0])}>
                                                Accept
                                            </button>
                                            <button className="btn btn-danger btn" type="button" data-bs-toggle="modal" data-bs-target="#example" onClick={() => setName(item[0])}>
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            ))
                        )}
                        
                    </div>
                </div>
            </div>

        </>
    );
};

export default Verification;
