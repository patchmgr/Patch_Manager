import React, { useEffect, useState, useContext } from 'react';
import 'datatables.net';
import { Outlet, Link } from 'react-router-dom';
import AccountContext from '../context/AccountContext';
import { Web3Storage } from 'web3.storage';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reuploadpatch = () => {
    const [patches, setPatches] = useState([]);
    const [patchName, setPatchName] = useState('');
    const [patchDesc, setPatchDesc] = useState('');
    const [patchSoftware, setPatchSoftware] = useState('');
    const [patchFeatures, setPatchFeatures] = useState('');
    const [patchNo, setPatchNo] = useState(1);
    const [bugId, setBugId] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const { account, contract, roller, username } = useContext(AccountContext);




    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);


    const [file, setFile] = useState(null);
    const [downloadCid, setDownloadCid] = useState('');
    const [uploadedCid, setUploadedCid] = useState(null);
    const [isRegisterDisabled, setIsRegisterDisabled] = useState(true);

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
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


    const makeStorageClient = () => {
        return new Web3Storage({ token: process.env.REACT_APP_getAccessToken });
    };

    async function storeFiles(files) {
        const client = makeStorageClient();
        const cid = await client.put(files);
        console.log('stored files with cid:', cid);
        return cid;
    }


    useEffect(() => {
        const createCard = async () => {
            try {
                if (contract) {
                    const newPatches = [];
                    const failedReason = await window.contract.methods.failedreason().call();
                    const failedId = await window.contract.methods.verificationfailed().call();
                    const details = await window.contract.methods.details().call();
                    const madatme = await window.contract.methods.fall().call();

                    const reqNoMap = new Map(); // Map to store reqno as key and maxVersion as value

                    for (let i = 0; i < details.length; i++) {
                        const t = details[i];
                        const rem = failedId.indexOf(t[0]);

                        const matchingRequest = madatme.reduce((maxReq, req) => {
                            if (req.dreqno === t[12]) {
                                if (!maxReq || req.dversion > maxReq.dversion) {
                                    return req;
                                }
                            }
                            return maxReq;
                        }, null);

                        if (matchingRequest.dstatus === "failed re-developing" && rem !== -1 && t[6] === 'Verification failed') {
                            const patch = {
                                name: t[1],
                                intent: i,
                                id: t[12].toString(),
                                details: JSON.parse(t[2]),
                                software:  t[3],
                                features: JSON.parse(t[4]),
                                reasonFromQc: failedReason[rem],
                            };

                            const reqNo = t[12];
                            const maxVersion = matchingRequest.dversion;

                            if (!reqNoMap.has(reqNo) || maxVersion > reqNoMap.get(reqNo)) {
                                reqNoMap.set(reqNo, maxVersion); // Update the maxVersion for the reqno

                                patch.maxVersion = maxVersion; // Store the maximum dversion
                                newPatches.push(patch);
                            }
                        }
                    }

                    setPatches(newPatches);
                    console.log(newPatches)
                }
            } catch (error) {
                console.log(error);
            }
        };

        createCard();
    }, [contract]);


    const handleUploadClick = (index) => {
        const patch = patches[index];

        setPatchName(patch.name);
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
                const t = document.getElementById('idiot').innerText
                console.log(patchName)
                console.log(t)


                const transaction = await window.contract.methods.reupload(Number(t), patchName, uploadedCid).send({ from: account });
                const latestTransactionHash = transaction.transactionHash;
                console.log('Transaction hash: ' + latestTransactionHash);
                await axios.post('http://localhost:5000/api/transactionhistory', { rolename: "develepor-reupload", transactionName: username, txhash: latestTransactionHash });
                toast.success(patchName + 'Uploaded Successfully', {
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
                console.error("Error calling register method:", error);
                const hashPattern = /"hash":"(.*?)"/;
                const match = error.message.match(hashPattern);
                const hash = match ? match[1] : null;

                console.error('Error:', error);
                await axios.post('http://localhost:5000/api/transactionhistory', { rolename: "develepor-reupload", transactionName: username, txhash: hash });
                console.log("hello");
            }


        }
    };

    return (
        <div className=' container border border-dark'>

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


            {patches.length === 0 ? (
                <h5 className='my-3 text-center'>No data available</h5>
            ) : (

                patches.map((patch, index) => (
                    <div key={index} className="card my-3">

                        <div className="card-header bg-primary text-white py-3    " >
                            <h4>Request ID: {patch.id}</h4>
                        </div>
                        <div className="card-body ">
                            <div className="row">
                                <div className="col-md-6 d-flex align-items-center">
                                    <h4 className="card-title">Patch Name:</h4>
                                    <p className="card-text mx-3">{patch.name}</p>
                                </div>
                                <div className="col-md-6 d-flex align-items-center">
                                    <h4 className="card-title">Patch no:</h4>
                                    <p id='idiot' className="card-text mx-3">{patch.intent}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 d-flex align-items-center">
                                    <h4 className="card-title">Software:</h4>
                                    <p className="card-text mx-3">{patch.software}</p>
                                </div>
                                <div className="col-md-6 d-flex align-items-center">
                                    <h4 className="card-title">Patch Description:</h4>
                                    <p className="card-text mx-3">{patch.details}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 d-flex align-items-center">
                                    <h4 className="card-title">Features:</h4>
                                    <p className="card-text mx-3">{patch.features}</p>
                                </div>
                                <div className="col-md-6 d-flex align-items-center">
                                    <h4 className="card-title">Reason:</h4>
                                    <p className="card-text mx-3">{patch.reasonFromQc}</p>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary float-end"
                                data-bs-toggle="modal"
                                data-bs-target="#myModal"
                                onClick={() => handleUploadClick(index)}
                            >
                                Upload Patch
                            </button>
                        </div>
                    </div>
                ))

            )}

            <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Upload Patch</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h4>Enter Patch Name</h4>
                            <input type="text" className="form-control" value={patchName} onChange={(e) => setPatchName(e.target.value)} />
                            <h4>Patch Description</h4>
                            <input type="text" className="form-control" value={patchDesc} readOnly />
                            <h4>Software</h4>
                            <input type="text" className="form-control" value={patchSoftware} readOnly />
                            <h4>Patch Features</h4>
                            <input type="text" className="form-control" value={patchFeatures} readOnly />
                            <h4>Patch No</h4>
                            <input type="text" className="form-control" value={patchNo} readOnly />
                            <h4>Request ID</h4>
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

export default Reuploadpatch;



