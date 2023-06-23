import React, { useEffect, useState } from 'react';
import connectContract from '../Web3components/ContractConnector';
import $ from 'jquery';
import Web3 from 'web3';
import 'datatables.net';
import { Outlet ,Link} from 'react-router-dom';

const Patchrequest = () => {

    const [data, setData] = useState([]);
    const [bArr, setBArr] = useState([]);
    const [bpArr, setBPArr] = useState([]);
    const [fArr, setFArr] = useState([]);
    const [fpArr, setFPArr] = useState([]);
    const [selectedBugs, setSelectedBugs] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [software,setsoftware]=useState('');

    const getdata = async (e) => {
        await connectContract();
        const temp = e;
        const result = await window.contract.methods.getbugs(temp).call();
        const resulter = await window.contract.methods.obtfeatures(temp).call();
        let b_arr = [];
        let bp_arr = [];
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].length; j++) {
                const a = await window.contract.methods.getbp(temp, result[i][j]).call();
                if(a!=='0'){
                    b_arr.push(result[i][j]);
                    bp_arr.push(a);
                }
            }
        }
        let f_arr = [];
        let fp_arr = [];
        for (let i = 0; i < resulter.length; i++) {
            for (let j = 0; j < resulter[i].length; j++) {
                const a = await window.contract.methods.getfp(temp, resulter[i][j]).call();
                if(a!=='0'){
                    f_arr.push(resulter[i][j]);
                    fp_arr.push(a);
                }
            }
        }
        setsoftware(e);
        setBArr(b_arr);
        setBPArr(bp_arr);
        setFArr(f_arr);
        setFPArr(fp_arr);

    }

    
    

    function handleCheckboxChange(event) {
        const value = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            if (event.target.dataset.type === 'bug') {
                setSelectedBugs(prevState => [...prevState, value]);
            } else if (event.target.dataset.type === 'feature') {
                setSelectedFeatures(prevState => [...prevState, value]);
            }
        } else {
            if (event.target.dataset.type === 'bug') {
                setSelectedBugs(prevState => prevState.filter(item => item !== value));
            } else if (event.target.dataset.type === 'feature') {
                setSelectedFeatures(prevState => prevState.filter(item => item !== value));
            }
        }
    }

    const submitter= async() => {
        alert('Selected Bugs:  '+ selectedBugs+"\n"+'Selected Features:  '+selectedFeatures);
        await window.contract.methods.addDevData(selectedBugs,selectedFeatures,software).send({ from: "0xD50de603fD7B63624Fa27AcEc49A3a91b3E0177e" });
    }

    return (
        <div>
            <p>hello request</p>
            <div className="col-4 p-2">
                <select className="form-select" aria-label="Default select example" onChange={(e) => getdata(e.target.value)}>
                    <option defaultValue={'software'}>software</option>
                    <option value="software1">software1</option>
                    <option value="software2">software2</option>
                    <option value="software3">software3</option>
                    <option value="software4">software4</option>
                    <option value="software5">software5</option>
                </select>
            </div>

            <div className="container text-center" id="carded">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Bugs and Priority</div>
                            <div className="card-body">
                                {bArr.map((bug, index) => (

                                    <div key={index} className="input-group mb-3">
                                        <div className="input-group mb-3">
                                            <div className="input-group-text">
                                                <input className="form-check-input mt-0 p-2" type="checkbox" 
                                                    value={bug}
                                                    aria-label="Checkbox for following text input"
                                                    data-type="bug"
                                                    onChange={handleCheckboxChange}/>
                                            </div>
                                            <input type="text" className="form-control " aria-label="Text input with checkbox" value={bug} readOnly/>
                                            <span className="input-group-text">Priority: {bpArr[index]}</span>
                                        </div>
                                    </div>

                                 
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Features and Priority</div>
                            <div className="card-body">
                                {fArr.map((feature, index) => (
                                    <div key={index} className="input-group mb-3">
                                        <div className="input-group mb-3">
                                            <div className="input-group-text">
                                                <input className="form-check-input mt-0 p-2" type="checkbox"
                                                    value={feature}
                                                    aria-label="Checkbox for following text input"
                                                    data-type="feature"
                                                    onChange={handleCheckboxChange} />
                                            </div>
                                            <input type="text" className="form-control " aria-label="Text input with checkbox" value={feature} readOnly />
                                            <span className="input-group-text">Priority: {fpArr[index]}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container text-center p-lg-5">
                <button onClick={submitter} className="btn btn-info">submit</button>
            </div>
            <div className="container ">
                <Outlet/>
            </div>
        </div>
    );
};

export default Patchrequest;
