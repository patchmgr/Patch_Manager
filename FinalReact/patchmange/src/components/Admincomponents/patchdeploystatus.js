import React, { useEffect, useState, useRef, useContext } from 'react';
import $ from 'jquery';
import 'datatables.net';
import axios from 'axios';
import { Web3Storage } from 'web3.storage';
import { Download } from 'react-feather';

import AccountContext from '../context/AccountContext';

const PatchdeployStatus = () => {
    

    const { account, contract ,roller,username } = useContext(AccountContext);

    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);


    const [file, setFile] = useState(null);
    const [downloadCid, setDownloadCid] = useState('');


    useEffect(() => {
        const init = async () => {
            try {
                if (contract) {
                    const newData = [];
                    const result = await contract.methods.details().call();
                    setResult(result)
                    let c = 0;
                    for (var i = 0; i < result.length; i++) {
                        const vals = result[i];
                        if (vals[7] === 'Deployed') {
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



    const func1 = async (patchName,ware) => {
        try {
            console.log("hello")
            

            for (let i = 0; i < result.length; i++) {
                const t = result[i]
                if (t[1] == patchName) {
                    console.log(t[11]);
                    downloadFile(t[11]);
                    break;
                }
            }

        } catch (error) {
            console.error('Error downloading patch:', error);
        }
        

    }





    const deployPatch = async (patchName) => {
        try {
            if (contract && account) {
                const transaction = await contract.methods.deploy(patchName).send({ from: account });
                const latestTransactionHash = transaction.transactionHash;
                console.log('Transaction hash: ' + latestTransactionHash);
                await axios.post('http://localhost:5000/api/transactionhistory', { rolename: "admin-deploy", txhash: latestTransactionHash });

            }
        } catch (error) {
            const hashPattern = /"hash":"(.*?)"/;
            const match = error.message.match(hashPattern);
            const hash = match ? match[1] : null;
            alert('Transaction failed: ' + error.message);
            alert('Hash: ' + hash);
            console.error('Error:', error);
            await axios.post('http://localhost:5000/api/transactionhistory', { rolename: "admin-deploy", txhash: hash });
            console.log("hello");
        }
    };

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
                                <th>Verified time</th>
                                <th>Deploy</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, i) => (
                                <tr key={i}>
                                    <td>{row[0]}</td>
                                    <td>{row[1]}</td>
                                    <td>{JSON.parse(row[2]).join(', ')}</td>
                                    <td>{row[3]}</td>
                                    <td>{JSON.parse(row[4]).join(', ')}</td>
                                    <td>{row[5]}</td>
                                    <td>
                                        { <p>Deployed</p> }
                                    </td>
                                    <td>{<button className='btn btn-primary' onClick={() => func1(row[1],row[3])}>DOWNLOAD <Download/> </button>}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PatchdeployStatus;
