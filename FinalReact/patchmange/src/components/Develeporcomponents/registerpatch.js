import React, { useEffect, useState, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Web3Storage } from 'web3.storage';
import AccountContext from '../context/AccountContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';


const Registerpatch = () => {

    const { account, contract ,roller,username} = useContext(AccountContext);
    const [file, setFile] = useState(null);
    const [uploadedCid, setUploadedCid] = useState(null);
    const [isRegisterDisabled, setIsRegisterDisabled] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
    };

    const handleUpload = async () => {
        if (file) {
            try {
                setUploading(true);
                setUploadProgress(0);

                const totalSize = file.size;
                let uploadedSize = 0;

                const client = new Web3Storage({ token: process.env.REACT_APP_getAccessToken });

                const cid = await client.put([file], {
                    onRootCidReady: (cid) => {
                        console.log('Root CID:', cid);
                    },
                    onStoredChunk: (bytes) => {
                        uploadedSize += bytes;
                        const progress = Math.round((uploadedSize / totalSize) * 100);
                        setUploadProgress(progress);
                    },
                    wrapWithDirectory: false, // Disable wrapping with directory to avoid additional chunking
                });

                console.log('stored files with cid:', cid);
                setUploadedCid(cid);
                setIsRegisterDisabled(false);

                setUploading(false);
                setUploadProgress(100);
            } catch (error) {
                console.error('Failed to store files:', error);
                setUploading(false);
                setUploadProgress(0);
            }
        }
    };






    useEffect(() => {
        let progressInterval;

        if (uploading) {
            progressInterval = setInterval(() => {
                setUploadProgress((prevProgress) => {
                    const newProgress = prevProgress + 1;
                    return newProgress > 100 ? 100 : newProgress;
                });
            }, 300);
        } else {
            clearInterval(progressInterval);
        }

        return () => clearInterval(progressInterval);
    }, [uploading]);



    const makeStorageClient = () => {
        return new Web3Storage({ token: process.env.REACT_APP_getAccessToken });
    };

    const [patches, setPatches] = useState([]);
    const [patchName, setPatchName] = useState('');
    const [patchDesc, setPatchDesc] = useState('');
    const [patchSoftware, setPatchSoftware] = useState('');
    const [patchFeatures, setPatchFeatures] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [patchNo, setPatchNo] = useState(1);
    const [bugId, setBugId] = useState(0);

    useEffect(() => {

        const createCard = async () => {
            if (contract) {
                const newPatches = [];

                try {
                    const result = await window.contract.methods.fall().call();
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].dstatus === 'not uploaded') {
                            const patch = {
                                id: result[i].dreqno,
                                details: result[i].dbugs,
                                software: result[i].dsoftware,
                                features: result[i].dfeatures,
                            };
                            newPatches.push(patch);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }

                setPatches(newPatches);
            }
        };

        createCard();
    }, [contract]);

    const handleUploadClick = (index) => {
        
        const patch = patches[index];
        setPatchName("");
        setPatchDesc(patch.details);
        setPatchSoftware(patch.software);
        setPatchFeatures(patch.features);
        setPatchNo(patches.length);
        setBugId(patch.id.toString());
        setSelectedFile(null);
    };


    const handleModalSubmit = async () => {
        if (contract) {
            try {
                console.log('hello');

                const transaction = await window.contract.methods
                    .register(
                        patchName,
                        JSON.stringify(patchDesc),
                        patchSoftware,
                        JSON.stringify(patchFeatures),
                        uploadedCid,
                        Number(bugId)
                    )
                    .send({ from: account });

                const latestTransactionHash = transaction.transactionHash;
                console.log('Transaction hash: ' + latestTransactionHash);

                
                
                await axios.post('http://localhost:5000/api/transactionhistory', {
                    rolename: 'develepor-register',
                    transactionName:username,
                    txhash: latestTransactionHash,
                });
                
                toast.success('Uploaded Successfully', {
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

                await axios.post('http://localhost:5000/api/transactionhistory', {
                    rolename: 'develepor-register',
                    transactionName:username,
                    txhash: hash,
                });

                console.log('hello');
            }
        }
    };

    return (
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
            {patches.map((patch, index) => (
                <div key={index} className="card my-3">
                    <div className="card-header bg-success text-white py-2">
                        <h4 className='p-2'>Request ID: {patch.id.toString()}</h4>
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">Patch Details:</h3>
                        <p className="card-text">{patch.details}</p>
                        <h3 className="card-title">Software:</h3>
                        <p className="card-text">{patch.software}</p>
                        <h3 className="card-title">Features:</h3>
                        <p className="card-text">{patch.features}</p>
                        <button
                            className="btn btn-success float-end"
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                            onClick={() => handleUploadClick(index)}
                        >
                            Upload Patch
                        </button>
                        
                    </div>
                </div>
            ))}
            <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Upload Patch</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>Enter Patch Name</h5>
                            <input type="text" className="form-control" value={patchName} onChange={(e) => setPatchName(e.target.value)} />
                            <h5>Patch Description</h5>
                            <input type="text" className="form-control" value={patchDesc} readOnly />
                            <h5>Software</h5>
                            <input type="text" className="form-control" value={patchSoftware} readOnly />
                            <h5>Patch Features</h5>
                            <input type="text" className="form-control" value={patchFeatures} readOnly />
                            <h5>Patch No</h5>
                            <input type="text" className="form-control" value={patchNo} readOnly />
                            <h5>Request ID</h5>
                            <input type="text" className="form-control" value={bugId} readOnly onChange={(e) => setBugId(e.target.value)} />
                            <br />
                            <br />
                            <button className="btn btn-lg btn-bd-primary float-end my-4" onClick={handleModalSubmit} disabled={isRegisterDisabled}>
                                Register Patch
                            </button>
                            <input type="file" id="patchfile" onChange={handleFileUpload} />
                            {uploading ? (
                                <div className='p-2'>
                                    <button className="btn btn-primary" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Uploading... {uploadProgress}%
                                    </button>
                                    
                                </div>
                            ) : (
                                <button className="btn btn-secondary my-3" onClick={handleUpload} disabled={!file}>
                                    Upload file
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registerpatch;
