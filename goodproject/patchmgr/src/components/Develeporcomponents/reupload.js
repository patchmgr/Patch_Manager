import React, { useEffect, useState } from 'react';
import connectContract from '../Web3components/ContractConnector';
import $ from 'jquery';
import Web3 from 'web3';
import 'datatables.net';
import { Outlet, Link } from 'react-router-dom';

const Reuploadpatch = () => {
    const [patches, setPatches] = useState([]);
    const [patchName, setPatchName] = useState('');
    const [patchDesc, setPatchDesc] = useState('');
    const [patchSoftware, setPatchSoftware] = useState('');
    const [patchFeatures, setPatchFeatures] = useState('');
    const [patchNo, setPatchNo] = useState(1);
    const [bugId, setBugId] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const createCard = async () => {
            try {
                await connectContract();
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
                            intent: i,
                            id: t[12].toString(),
                            details: t[2],
                            software: t[3],
                            features: t[4],
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
            } catch (error) {
                console.log(error);
            }
        };
    
        createCard();
    }, []);
    

    const handleUploadClick = (index) => {
        const patch = patches[index];
        setPatchName('');
        setPatchDesc(patch.details);
        setPatchSoftware(patch.software);
        setPatchFeatures(patch.features);
        setPatchNo(patches.length);
        setBugId(patch.id.toString());
        setSelectedFile(null);
    };

    // const handleModalSubmit = async () => {
    //     if (window.contract) {


    //         try {
    //             
    //         } catch (error) {
    //             console.error('Error calling register method:', error);
    //         }

    //     }
    // };

    const handleModalSubmit = async () => {
        if (window.contract) {
            const reader = new FileReader();
            reader.onload = async () => {
                const fileData = new Uint8Array(reader.result);
                try {
                    const t = document.getElementById('idiot').innerText
                    console.log(patchName)
                    console.log(t)


                    await window.contract.methods.reupload(Number(t), patchName, Array.from(fileData)).send({ from: "0xe293D6Eb4054ece8E1B6ffc7f9293dAD99dF48af" });;
                } catch (error) {
                    console.error("Error calling register method:", error);
                }
            };

            reader.readAsArrayBuffer(selectedFile);
        }
    };

    return (
        <div>
            {patches.map((patch, index) => (
                <div key={index} className="card">
                    <div className="card-header">
                        <h2>Request ID: {patch.id}</h2>
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">Patch Details:</h3>
                        <p className="card-text">{patch.details}</p>
                        <h3 className="card-title">Patch no:</h3>
                        <p className="card-text" id='idiot'>{patch.intent}</p>
                        <h3 className="card-title">Software:</h3>
                        <p className="card-text">{patch.software}</p>
                        <h3 className="card-title">Features:</h3>
                        <p className="card-text">{patch.features}</p>
                        <h3 className="card-title">Reason:</h3>
                        <p className="card-text">{patch.reasonFromQc}</p>
                        <button className="btn btn-success float-end" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => handleUploadClick(index)}>
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
                            <button className="btn btn-primary float-end" onClick={handleModalSubmit}>
                                Register
                            </button>
                            <input type="file" id="patchfile" onChange={(e) => setSelectedFile(e.target.files[0])} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reuploadpatch;



