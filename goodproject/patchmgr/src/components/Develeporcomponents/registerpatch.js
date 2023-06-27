import React, { useEffect, useState } from 'react';
import connectContract from '../Web3components/ContractConnector';
import $ from 'jquery';
import Web3 from 'web3';
import 'datatables.net';
import { Outlet, Link } from 'react-router-dom';

const Registerpatch = () => {
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
            await connectContract();
            const newPatches = [];

            await window.contract.methods.fall().call().then((result) => {
                for (let i = 0; i < result.length; i++) {
                    if(result[i].dstatus==="not uploaded"){
                        const patch = {
                            id: result[i].dreqno,
                            details: result[i].dbugs,
                            software: result[i].dsoftware,
                            features: result[i].dfeatures,
                        };
        
                        newPatches.push(patch);
                    }
                }
                
            }).catch((error) => {
                console.log(error);
            });

            setPatches(newPatches);
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

    const handleModalSubmit = async () => {
        if (window.contract) {
            const reader = new FileReader();
            reader.onload = async () => {
                const fileData = new Uint8Array(reader.result);
    
                try {
                    console.log("hell");
                    console.log(fileData);
                    console.log(typeof patchName, typeof JSON.stringify(patchDesc),  typeof patchSoftware,  typeof JSON.stringify(patchFeatures),typeof  fileData, typeof Number(bugId),Number(bugId));
    
                    await window.contract.methods.register(
                        patchName,
                        JSON.stringify(patchDesc),
                        patchSoftware,
                        JSON.stringify(patchFeatures),
                        Array.from(fileData),
                        Number(bugId)
                    ).send({ from: "0xe293D6Eb4054ece8E1B6ffc7f9293dAD99dF48af" });
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
                        <h2>Request ID: {patch.id.toString()}</h2>
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">Patch Details:</h3>
                        <p className="card-text">{patch.details}</p>
                        <h3 className="card-title">Software:</h3>
                        <p className="card-text">{patch.software}</p>
                        <h3 className="card-title">Features:</h3>
                        <p className="card-text">{patch.features}</p>
                        <button className="btn btn-success float-end" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => handleUploadClick(index)}>Upload Patch</button>
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
                            <button className="btn btn-bd-primary float-end" onClick={handleModalSubmit}>Register</button>
                            <input type="file" id="patchfile" onChange={(e) => setSelectedFile(e.target.files[0])} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registerpatch;
