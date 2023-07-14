import React, { useEffect, useState, useContext } from 'react';
import AccountContext from '../context/AccountContext';

const Patchrequeststatus = () => {
    const [data, setData] = useState([]);
    const [selectedSoftware, setSelectedSoftware] = useState('software');

    const { account, contract } = useContext(AccountContext);




    const getdata = async (e) => {
        if (contract) {
            const t = [];

            const result = await window.contract.methods.fall().call().then((result) => {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].dsoftware === e) {
                        t.push(result[i])
                    }
                }
            }).catch((error) => {
                console.log(error);
            });
            setData(t);
        }
    };

    useEffect(() => {
        getdata(selectedSoftware);
    }, [selectedSoftware, contract]);

    return (
        <div className='container border border-dark'>
            <div className=' container  p-3 text-center'>
                <select className="form-select" aria-label="Default select example" onChange={(e) => setSelectedSoftware(e.target.value)} value={selectedSoftware}>
                    <option value="software">software</option>
                    <option value="software1">software1</option>
                    <option value="software2">software2</option>
                    <option value="software3">software3</option>
                    <option value="software4">software4</option>
                    <option value="software5">software5</option>
                </select>
            </div>
            <div className="container p-3 d-flex justify-content-center ">

                <div className="card col-10 ">
                    <div className="row row-cols-5 g-4 p-2">
                        <div className="col">
                            <div className="card bg-light">
                                <div className="card-body text-center">
                                    <strong>Request no</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-light">
                                <div className="card-body text-center">
                                    <strong>No of uploads</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-light">
                                <div className="card-body text-center">
                                    <strong>Bugs</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-light">
                                <div className="card-body text-center">
                                    <strong>Features</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-light">
                                <div className="card-body text-center">
                                    <strong>Status</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    {data.map((item, index) => (
                        <div className="row row-cols-5 g-4 p-2" key={index}>
                            <div className="col">
                                <div className="card bg-light">
                                    <div className="card-body text-center">{Number(item.dreqno)}</div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card bg-light">
                                    <div className="card-body text-center">
                                        {item.dstatus === "not uploaded" ? 0:Number(item.dversion)}
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className={`card bg-light ${item.dbugs.length === 0 ? 'text-danger' : ''}`}>
                                    <div className="card-body text-center">
                                        {item.dbugs.length !== 0 ? item.dbugs : 'empty or none'}
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className={`card bg-light ${item.dfeatures.length === 0 ? 'text-danger' : ''}`}>
                                    <div className="card-body text-center">
                                        {item.dfeatures.length !== 0 ? item.dfeatures : 'empty or none'}
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className={`card  text-white ${item.dstatus === "uploaded" ? 'bg-primary' : 'bg-danger'}`}>
                                    <div className="card-body text-center">{item.dstatus}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Patchrequeststatus;
