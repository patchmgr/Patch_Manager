import React, { useEffect, useState, useContext } from 'react';
import $ from 'jquery';
import 'datatables.net';
import AccountContext from '../context/AccountContext';
import { OverlayTrigger, Popover, Button, ButtonToolbar } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const Patchdetails = () => {
    const [data, setData] = useState([]);

    const [reason, setReason] = useState("hello");

    const [popoverVisible, setPopoverVisible] = useState(false); // State for popover visibility

    const { account, contract, roller, username } = useContext(AccountContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (contract) {
                    const result = await window.contract.methods.details().call();
                    const newData = [];
                    for (var i = 0; i < result.length; i++) {
                        const vals = result[i];
                        const row = [
                            vals[0],
                            vals[12],
                            vals[1],
                            vals[2],
                            vals[3],
                            vals[4],
                            timestampToDate(vals[8]),
                            vals[6],
                            vals[7],
                        ];
                        newData.push(row);
                    }
                    setData(newData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [contract,reason]);

    function timestampToDate(a) {
        const timestamp = Number(a);
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();
        return formattedTime;
    }

    const geterror = async (id) => {
        const failedId = await window.contract.methods.verificationfailed().call();
        const failedReason = await window.contract.methods.failedreason().call();
        for (let i = 0; i < failedId.length; i++) {
            if (failedId[i] == id) {
                setReason(failedReason[i])
            }
        }
    };


    useEffect(() => {
        if (data.length > 0) {
            $('#myTable').DataTable();
        }
    }, [data]);

    const popoverClickRootClose =  (
        <Popover id="popover-trigger-click-root-close">
            <Popover.Header as="h3">Reason</Popover.Header>
            <Popover.Body>
                <strong>{reason}</strong> 
            </Popover.Body>
        </Popover>
    );


    // Toggle popover visibility
    const togglePopover = () => {
        setPopoverVisible(!popoverVisible);
    };

    return (
        <>
            <div>
                <div className=" container text-center p-3 border border-dark table-responsive">
                        <table className="table cell-border table-striped table-hover " id="myTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Request no</th>
                                    <th>Patch name</th>
                                    <th>Description</th>
                                    <th>Platform</th>
                                    <th>Features</th>
                                    <th>Registered time</th>
                                    <th>Verify</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row[0].toString()}</td>
                                        <td>{row[1].toString()}</td>
                                        <td>{row[2]}</td>
                                        <td>{JSON.parse(row[3]).join(', ')}</td>
                                        <td>{row[4]}</td>
                                        <td>{JSON.parse(row[5]).join(', ')}</td>
                                        <td>{row[6]}</td>
                                        <td>
                                            {row[7]+"  "}
                                            {row[7] === 'Verification failed' ? (
                                                <OverlayTrigger
                                                    trigger="click"
                                                    rootClose
                                                    placement="right"
                                                    overlay={popoverClickRootClose}
                                                    onClick={() => {
                                                        togglePopover(); // Toggle popover visibility
                                                    }}
                                                >
                                                    <FontAwesomeIcon  onClick= {()=>geterror(row[0]) }icon={faCircleInfo} style={{ color: '#ff6161' }} />
                                                </OverlayTrigger>
                                            ) : null}
                                        </td>
                                        <td>{row[8].toString()}</td>
                                        <br />
                                        <br />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </>
    );
};

export default Patchdetails;
