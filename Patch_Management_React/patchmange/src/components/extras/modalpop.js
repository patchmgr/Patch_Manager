import React, { useEffect, useState } from 'react';

function AlertModal({ message, hid, setShowModal }) {

    console.log(hid + "" + "magna")
    const [show, setShow] = useState(true);
    useEffect(() => {
        setShow(hid)
    }, []);

    const handleClose = () => {
        setShow(false);
        setShowModal(false);
        setTimeout(() => {
            window.location.reload() 
        }, 450);

    };

    return (
        <>
            {show && (
                <div className="card my-3">
                    <h5 className="card-header">Submitted request</h5>
                    <div className="card-body text-center">
                        <h5 style={{ whiteSpace: 'pre-line' }}>{message}</h5>
                        {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                        <button className='btn btn-primary' onClick={handleClose}>Close and exit</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AlertModal;

