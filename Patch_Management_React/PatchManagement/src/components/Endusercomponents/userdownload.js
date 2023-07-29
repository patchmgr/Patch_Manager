import React, { useEffect, useState, useContext } from 'react';
import $ from 'jquery';
import 'datatables.net';
// import { Facebook, Mail, Twitter } from 'react-feather';
import { Download } from 'react-feather';
import axios from 'axios';
import { Web3Storage } from 'web3.storage';

import AccountContext from '../context/AccountContext';


const Userdownload = () => {

    const { account, contract, roller, username } = useContext(AccountContext);

    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);


    useEffect(() => {



        const fetchData = async () => {
            try {

                if (contract) {


                    const result = await window.contract.methods.details().call();
                    setResult(result);
                    const newData = [];

                    for (let i = 0; i < result.length; i++) {
                        const vals = result[i];
                        if (vals[7] === "Deployed") {
                            const row = [i + 1, vals[1], vals[2], vals[3], vals[4], timestampToDate(vals[9])];
                            newData.push(row);
                        }
                    }

                    setData(newData);
                    $(function () {
                        $('#myTable').DataTable();
                    });
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData()
    }, [contract]);

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
    

    const func1 = async (patchName, ware) => {
        try {

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
        await axios.post('http://localhost:5000/api/downloads', { patchname: patchName, software: ware, username: username });

    }

    function helloworld() {
        alert("working..")
    }


    return (
        <div>

            <div className="container  border border-dark" id="dd">
                <div className='tabble-responsive container my-3'>
                    <table className="table table-striped table-hover " id="myTable">
                        <thead>
                            <tr>
                                <th>Sno</th>
                                <th>Patch name</th>
                                <th>Patch Description</th>
                                <th>Patch platform</th>
                                <th>Patch features</th>
                                <th>Released Date</th>
                                <th>Download file</th>
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
                                    <td>{<button className='btn btn-primary' onClick={() => func1(row[1], row[3])}>DOWNLOAD  <Download /></button>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
           <br /><br /><br /><br /><br /><br />
        </div>


    );
};

export default Userdownload;
