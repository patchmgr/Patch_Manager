import React, { useEffect, useState, useRef } from 'react';
import connectContract from '../Web3components/ContractConnector';
import $ from 'jquery';
import 'datatables.net';

const Patchdeploy = () => {
    const [data, setData] = useState([]);
    const [radioValue, setRadioValue] = useState('22');
    const tableRef = useRef(null);
    

    const fetchData = async (e) => {
        try {
            await connectContract();
            if (!window.contract || !window.contract.methods) {
                throw new Error('Contract methods not available');
            }
            const newData = [];
            const ids = await window.contract.methods.dataarray().call();
            let c = 0;
            for (var i = 0; i < ids.length; i++) {
                const vals = await window.contract.methods.details(ids[i]).call();
                if (e.target.value === '11' && vals[6] !== 'Ready to Deploy') {
                    const row = [c + 1, vals[0], vals[1], vals[2], vals[3], timestampToDate(vals[8])];
                    newData.push(row);
                } else if (e.target.value === '22' && vals[6] === 'Ready to Deploy') {
                    const row = [c + 1, vals[0], vals[1], vals[2], vals[3], timestampToDate(vals[8])];
                    newData.push(row);
                }
            }
            setData(newData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const init = async () => {
            try {
                await connectContract();
                if (!window.contract || !window.contract.methods) {
                    throw new Error('Contract methods not available');
                }
                const newData = [];
                const ids = await window.contract.methods.dataarray().call();
                let c = 0;
                for (var i = 0; i < ids.length; i++) {
                    const vals = await window.contract.methods.details(ids[i]).call();
                    if (vals[6] === 'Ready to Deploy') {
                        const row = [c + 1, vals[0], vals[1], vals[2], vals[3], timestampToDate(vals[8])];
                        newData.push(row);
                    }
                }
                setData(newData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        init();
    }, []);

    useEffect(() => {
        if (data.length > 0 ) {
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

    const handleRadioChange = (e) => {
        setRadioValue(e.target.value);
        fetchData(e);
    };

    const  func1=  async(t) =>{
        alert("Are you sure to depoy this patch " + t)
        await window.contract.methods.deploy(t).send({ from: "0xD50de603fD7B63624Fa27AcEc49A3a91b3E0177e"});
    }

    return (
        <div>
            <div className="form-check form-check-inline">
                <div className="p-2">
                    <input className="form-check-input wx-2" type="radio" name="deploy" value="11" onChange={handleRadioChange}/>
                    <label className="form-check-label">Deployed</label>
                </div>
                <div className="wx-5 p-2">
                    <input className="form-check-input wx-2" type="radio" name="deploy" value="22" onChange={handleRadioChange} defaultChecked/>
                    <label className="form-check-label">Not Deployed</label>
                </div>
            </div>

            <div className="container text-center" id="dd">
                <br /><br />
                <table className="table table-striped table-hover" id='myTable'>
                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>Patch name</th>
                            <th>Patch version</th>
                            <th>Patch Platform</th>
                            <th>Patch features</th>
                            <th>Verified time</th>
                            <th>Deploy</th>
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
                                <td>
                                    {radioValue === '11' ? (
                                        <p>Deployed</p>
                                    ) : (
                                        <button onClick={()=>func1(row[1])} className='btn btn-primary p-2'>Deploy</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Patchdeploy;
