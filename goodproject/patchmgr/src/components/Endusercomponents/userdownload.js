import React, { useEffect, useState } from 'react';
import connectContract from '../Web3components/ContractConnector';
import $ from 'jquery';
import Web3 from 'web3';
import 'datatables.net';
import { Facebook, Mail, Twitter } from 'react-feather';
import { Download } from 'react-feather';
import axios from 'axios';


const Userdownload = () => {

    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);


  

    useEffect(() => {

        const getdatamongo = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                const names = response.data.map(obj => obj.username);
                console.log(names);
                setUser(names[names.length-1]);
                console.log("the current provider is"+names[names.length-1]);
    
            } catch (error) {
                console.error(error);
            }
        };
        getdatamongo();

        const fetchData = async () => {
            try {
                await connectContract();
                if (!window.contract || !window.contract.methods) {
                    throw new Error('Contract methods not available');
                }

                const result = await window.contract.methods.details().call();
                const newData = [];
                
                for (let i = 0; i < result.length; i++) {
                    const vals =  result[i];
                    if(vals[7]==="Deployed"){
                        const row = [i + 1, vals[1], vals[2], vals[3], vals[4], timestampToDate(vals[9])];
                        newData.push(row);
                    }
                }

                setData(newData);
                $(function () {
                    $('#myTable').DataTable();
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData()
    }, []);

    function timestampToDate(a) {
        const timestamp = Number(a);
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();
        return formattedTime;
    }

    const func1 = async (pn,ware) => {
        window.contract.methods.downloadPatch(pn).call().then((fileData) => {
            const fileBlob = new Blob([new Uint8Array(Web3.utils.hexToBytes(fileData))], { type: 'application/octet-stream' });
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(fileBlob);
            downloadLink.download = `${pn}.xlsx`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
        })
        await axios.post('http://localhost:5000/api/downloads', { fname: pn,uname: user ,softer:ware});
    }

    function helloworld(){
        alert("working..")
    }


    return (
        <div>
            <div className="container text-center" id="dd">

                <br /><br />
                <table className="table table-striped table-hover" id="myTable">
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
                                <td>{row[2]}</td>
                                <td>{row[3]}</td>
                                <td>{row[4]}</td>
                                <td>{row[5]}</td>
                                <td>{<button className='btn btn-primary' onClick={() => func1(row[1],row[3])}>DOWNLOAD  <Download/></button>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='text-center'>
                <button className='btn btn-primary'>   contact us on  <Twitter/> <Facebook/> <Mail/>  </button>
                
            </div>
        </div>
    );
};

export default Userdownload;
