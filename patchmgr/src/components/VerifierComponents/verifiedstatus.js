import React, { useEffect, useState, useRef } from 'react';
import connectContract from '../Web3components/ContractConnector';
import $ from 'jquery';
import 'datatables.net';

const Verifystatus = () => {
    const [data, setData] = useState([]);
    const [radioValue, setRadioValue] = useState('11');
    

    const fetchData = async (e) => {
        try {
            await connectContract();
            if (!window.contract || !window.contract.methods) {
                throw new Error('Contract methods not available');
            }
            const newData = [];
            const ids = await window.contract.methods.dataarray().call();
            var c = 0;
            for (var i = 0; i < ids.length; i++) {
                const vals = await window.contract.methods.details(ids[i]).call();
                if (e.target.value === '11' && vals[5] === 'Verified') {
                    const row = [c + 1, vals[0], vals[1], vals[2], vals[3], timestampToDate(vals[8]),vals[5]];
                    newData.push(row);
                } else if (e.target.value === '22' && vals[5] === 'Verification failed') {
                    const row = [c + 1, vals[0], vals[1], vals[2], vals[3], timestampToDate(vals[8]),vals[5]];
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
                var c = 0;
                for (var i = 0; i < ids.length; i++) {
                    const vals = await window.contract.methods.details(ids[i]).call();
                    if(vals[5]==='Verified'){
                        const row = [c + 1, vals[0], vals[1], vals[2], vals[3], timestampToDate(vals[8]),vals[5]];
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


    return (
        <div>
            
            <div className="form-check form-check-inline">
                <div className="p-2">
                    <input className="form-check-input wx-2" type="radio" name="deploy" value="11" onChange={handleRadioChange} defaultChecked/>
                    <label className="form-check-label">Verification passed</label>
                </div>
                <div className="wx-5 p-2">
                    <input className="form-check-input wx-2" type="radio" name="deploy" value="22" onChange={handleRadioChange} />
                    <label className="form-check-label">Verification failed</label>
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
                            <th>Verification status</th>
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
                                <td>{row[6]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Verifystatus;
