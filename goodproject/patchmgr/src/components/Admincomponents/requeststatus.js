import React, { useEffect, useState } from 'react';
import connectContract from '../Web3components/ContractConnector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { faUser} from '@fortawesome/free-solid-svg-icons';
const Patchrequeststatus = () => {
    const [data, setData] = useState([]);
    const [selectedSoftware, setSelectedSoftware] = useState('software');



    const getdata = async (e) => {
        const t = [];
        await connectContract();
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
    };

    useEffect(() => {
        getdata(selectedSoftware);
    }, [selectedSoftware]);

    return (
        <>
            <div className=' container col-10 p-3 text-center'>
                <select className="form-select" aria-label="Default select example" onChange={(e) => setSelectedSoftware(e.target.value)} value={selectedSoftware}>
                    <option value="software">software</option>
                    <option value="software1">software1</option>
                    <option value="software2">software2</option>
                    <option value="software3">software3</option>
                    <option value="software4">software4</option>
                    <option value="software5">software5</option>
                </select>
            </div>
            <div className="container d-flex justify-content-center ">

                <div className="card col-10 ">
                    <div className="row row-cols-5 g-4 p-2">
                        <div className="col">
                            <div className="card bg-light">
                                <div className="card-body text-center">
                                    <strong>Request no</strong>
                                </div>
                                <FontAwesomeIcon icon={faCircleInfo} spin />
                                <FontAwesomeIcon icon={faCircleInfo} bounce style={{ color: "#ff6161", }} />
                                <div>
                                    {/* Color Combination 1 */}
                                    <FontAwesomeIcon icon={faCircleInfo} style={{ color: '#64609a' }} />

                                    {/* Color Combination 2 */}
                                    <FontAwesomeIcon icon={faCircleInfo} style={{ color: '#817db5' }} />

                                    {/* Color Combination 3 */}
                                    <FontAwesomeIcon icon={faCircleInfo} style={{ color: '#ff0000' }} />

                                    {/* Color Combination 4 */}
                                    <FontAwesomeIcon icon={faCircleInfo} style={{ color: '#00ff00' }} />


                                    <FontAwesomeIcon icon={faCircleExclamation} style={{"--fa-primary-color": "#2e2173", "--fa-secondary-color": "#bac9e3",}} />

                                    

                                    <FontAwesomeIcon icon={faBug} style={{color: "#316cd3",}} />
                                    <FontAwesomeIcon icon={faUser} />

                                  



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
                                    <div className="card-body text-center">{Number(item.dversion)}</div>
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
        </>
    );
};

export default Patchrequeststatus;
