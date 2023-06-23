import React, { useEffect, useState } from 'react';
import connectContract from '../Web3components/ContractConnector';
import Web3 from 'web3';

const Verification = () => {
    const [data, setData] = useState([]);

    function timestampToDate(a) {
        const timestamp = Number(a);
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();
        return formattedTime;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await connectContract();
                if (!window.contract || !window.contract.methods) {
                    throw new Error('Contract methods not available');
                }
                const newData = [];
                const ids = await window.contract.methods.dataarray().call();
                for (var i = 0; i < ids.length; i++) {
                    const vals = await window.contract.methods.details(ids[i]).call();
                    if (vals[5] === 'In progress') {
                        const row = [ vals[0], vals[1], vals[2], vals[3], timestampToDate(vals[7]) ];
                        newData.push(row);
                    }
                }
                setData(newData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const  func1=  async(t) =>{
        alert("Are you sure the patch was tested correctly? " + t)
        await window.contract.methods.verify(1,t).send({ from: "0x774c6dA0E96047dd51aF754ab0744Ef913cE56D2"});
    }
    const  func2=  async(t) =>{
        alert("Are you sure the patch was tested correctly? " + t)
        await window.contract.methods.verify(0,t).send({ from: "0x774c6dA0E96047dd51aF754ab0744Ef913cE56D2"});
    }

    function download(pn) {
        window.contract.methods.downloadpatch(pn).call().then((fileData) => {
            const fileBlob = new Blob([new Uint8Array(Web3.utils.hexToBytes(fileData))], { type: 'application/octet-stream' });
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(fileBlob);
            downloadLink.download = `${pn}.xlsx`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
        })
    }


    return (
        <div className="container mt-4">
            <div className="accordion" id="accordionExample">
                {data.map((item, index) => (
                    <div className="accordion-item" key={index}>
                        <h2 className="accordion-header" id={`heading${index}`}>
                            <button className="accordion-button" type="button"  data-bs-toggle="collapse"  data-bs-target={`#collapse${index}`}  aria-expanded={index === 0 ? 'true' : 'false'} aria-controls={`collapse${index}`}  >
                                {item[0]} {/* Patch name */}
                            </button>
                        </h2>
                        <div id={`collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample"> 
                            <div className="accordion-body">
                                <h5 className="card-title">Patch platform</h5>
                                <p className="card-text">{item[1]}</p> {/* Patch details */}
                                <h5 className="card-title">Patch features</h5>
                                <p className="card-text">{item[2]}</p> {/* Patch features */}
                                <h5 className="card-title">Registered time</h5>
                                <p className="card-text">{item[3]}</p> {/* Registered time */}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <button className="btn btn-primary" type="button" onClick={()=> download(item[0])}> Download</button>
                                    <div>
                                        <button className="btn btn-success btn me-2" type="button" onClick={()=> func1(item[0])}>Accept </button>
                                        <button className="btn btn-danger btn" type="button" onClick={()=> func2(item[0])}>Reject</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Verification;
