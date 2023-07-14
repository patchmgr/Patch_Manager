import React, { useEffect, useState, useRef, useContext } from 'react';
import { Web3Storage } from 'web3.storage';
import $ from 'jquery';
import axios from 'axios';
import 'datatables.net';
import { Download } from 'react-feather';

import AccountContext from '../context/AccountContext';


const Verifystatus = () => {
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
                    const result = await window.contract.methods.details().call();
                    setResult(result)
                    var c = 0;
                    for (let i = 0; i < result.length; i++) {
                        const vals = result[i];
                       
                        const row = [c + 1, vals[1], vals[2], vals[3], vals[4], timestampToDate(vals[9]), vals[6]];
                        newData.push(row);
                        c += 1
                    
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



    return (
        <>
            <div className='container border border-dark '>
                <div>
                    <div className="container text-center my-3 table-responsive" id="dd">
                        <table className="table table-striped table-hover" id='myTable'>
                            <thead>
                                <tr>
                                    <th>Sno</th>
                                    <th>Patch name</th>
                                    <th>Patch description</th>
                                    <th>Patch Platform</th>
                                    <th>Patch features</th>
                                    <th>Verified time</th>
                                    <th>Verification status</th>
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
                                        <td>{row[6]}</td>
                                         <td>{<button className='btn btn-primary' onClick={() => func1(row[1],row[3])}>DOWNLOAD <Download/> </button>}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Verifystatus;
