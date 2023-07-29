import React, { useEffect, useState, useContext } from 'react';
import AccountContext from '../context/AccountContext';
import $ from 'jquery';

const Patchrequeststatus = () => {
    const [data, setData] = useState([]);
    const [reversedData, setReversedData] = useState([]);
    const [selectedSoftware, setSelectedSoftware] = useState('software');

    const { account, contract } = useContext(AccountContext);

    useEffect(() => {
        const sortedData = [...data].sort((a, b) =>Number(b.dreqno)- Number(a.dreqno));
        setReversedData(sortedData);
    }, [data]);

    const getdata = async (e) => {
        if (contract && e !== 'software') {
            let t = [];
            try {
                const result = await window.contract.methods.fall().call();
                t = result.filter(item => item.dsoftware === e);
            } catch (error) {
                console.log(error);
            }
            setData(t);

        }
    };

    useEffect(() => {
        if (data.length > 0) {
            $('#mytable').DataTable();
        }
    }, [data]);

    useEffect(() => {
        getdata(selectedSoftware);
    }, [selectedSoftware, contract]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-success text-white';
            case 'Ready-to-deploy':
                return 'bg-secondary text-white';
            case 'not uploaded':
                return 'bg-primary text-white';
            case 'failed re-developing':
                return 'bg-danger text-white';
            default:
                return '';
        }
    };

    return (
        <div>
            <div className='container border border-dark'>
                <div className='container p-3 text-center'>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => setSelectedSoftware(e.target.value)} value={selectedSoftware}>
                        <option value="software">Select software</option>
                        <option value="software1">software1</option>
                        <option value="software2">software2</option>
                        <option value="software3">software3</option>
                        <option value="software4">software4</option>
                        <option value="software5">software5</option>
                    </select>
                </div>
                {selectedSoftware !== 'software' && (
                    <div className="container p-3">
                        {reversedData.length > 0 ? (
                            <table className="table table-striped table-hover" id="mytable">
                                <thead>
                                    <tr>
                                        <th>Request no</th>
                                        <th>No of uploads</th>
                                        <th>Description</th>
                                        <th>Features</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reversedData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{Number(item.dreqno)}</td>
                                            <td>{item.dstatus === "not uploaded" ? 0 : Number(item.dversion)}</td>
                                            <td className={item.dbugs.length === 0 ? 'text-danger' : ''}>
                                                {item.dbugs.length !== 0 ? item.dbugs : 'empty or none'}
                                            </td>
                                            <td className={item.dfeatures.length === 0 ? 'text-danger' : ''}>
                                                {item.dfeatures.length !== 0 ? item.dfeatures : 'empty or none'}
                                            </td>
                                            <td className={getStatusColor(item.dstatus)}>
                                                {item.dstatus}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Patchrequeststatus;
