import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AccountContext from '../context/AccountContext';
import AlertModal from '../extras/modalpop';


const UserFeedback = () => {
    const [reports, setReports] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


    const { account, contract, roller, username } = useContext(AccountContext);


    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reporteddetails');
                const data = response.data;
                setReports(data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, [contract]);

    const handleStatusChange = async (reportId) => {
        try {
            await axios.put(`http://localhost:5000/api/reporteddetails/${reportId}`, { status: 'used' });
            setReports((prevReports) =>
                prevReports.map((report) =>
                    report._id === reportId ? { ...report, status: 'used' } : report
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleInputChange = (reportId, type, index, value) => {
        setReports((prevReports) =>
            prevReports.map((report) => {
                if (report._id === reportId) {
                    const updatedReport = { ...report };
                    updatedReport[type][index] = value;
                    return updatedReport;
                }
                return report;
            })
        );
    };

    const handleRemoveField = (reportId, type, index) => {
        setReports((prevReports) =>
            prevReports.map((report) => {
                if (report._id === reportId) {
                    const updatedReport = { ...report };
                    updatedReport[type].splice(index, 1);
                    return updatedReport;
                }
                return report;
            })
        );
    };







    const handleOutput = async (bugs, features, software) => {
        const modalMessage = [
            `bugArray: ${bugs.length > 0 ? bugs.join(', ') : 'null'}`,
            `featureArray: ${features.length > 0 ? features.join(', ') : 'null'}`,
            `Software: ${software || 'null'}`
        ].join('\n');


        console.log('Modal Message:', modalMessage);
        setModalMessage(modalMessage)
        setShowModal(true);
        try {
            const transaction = await window.contract.methods.addUserReport(software,bugs, features).send({ from: account});
            const latestTransactionHash = transaction.transactionHash;
            console.log('Transaction hash: ' + latestTransactionHash);
            await axios.post('http://localhost:5000/api/transactionhistory', { rolename: "labeller-feedback", transactionName:username,txhash: latestTransactionHash });
            console.log("hello");
        } catch (error) {
            const hashPattern = /"hash":"(.*?)"/;
            const match = error.message.match(hashPattern);
            const hash = match ? match[1] : null;
            console.error('Error:', error);
            await axios.post('http://localhost:5000/api/transactionhistory', { rolename: "labeller-feedback",transactionName:username, txhash: hash });
            console.log("hello");
        }
    };


    return (

        <div>
            <div className="container  border border-dark ">
                {showModal && (
                    <AlertModal message={modalMessage} hid={true} setShowModal={setShowModal} />
                )}
                <div className="accordion my-3" id="accordionExample">
                    {reports.map((report, index) => (
                        report.status !== 'used' &&
                        <div className="accordion-item" key={report._id}>
                            <h2 className="accordion-header" id={`heading-${report._id}`}>
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse-${report._id}`}
                                    aria-expanded="false"
                                    aria-controls={`collapse-${report._id}`}
                                >
                                    Username: {report.username}
                                </button>
                            </h2>
                            <div
                                id={`collapse-${report._id}`}
                                className="accordion-collapse collapse"
                                aria-labelledby={`heading-${report._id}`}
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    <div className="form-check form-switch end-0">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`edit-toggle-${report._id}`}
                                            checked={editMode}
                                            onChange={() => setEditMode(!editMode)}
                                        />
                                        <label htmlFor={`edit-toggle-${report._id}`} className="form-check-label">
                                            Edit
                                        </label>
                                    </div>
                                    <div className="form-floating">
                                        <h6>software</h6>
                                        <p>{report.software}</p>
                                        <h6>Bugs Reported:</h6>
                                        {report.bugs_reported.map((bug, bugIndex) => (
                                            <div className="input-group mb-3" key={bugIndex}>
                                                <input
                                                    type="text"
                                                    className={`form-control edit-input${editMode ? '' : ' readonly'}`}
                                                    value={bug}
                                                    onChange={(e) =>
                                                        handleInputChange(report._id, 'bugs_reported', bugIndex, e.target.value)
                                                    }
                                                    readOnly={!editMode}
                                                />
                                                <button
                                                    className="btn btn-outline-danger"
                                                    type="button"
                                                    onClick={() => handleRemoveField(report._id, 'bugs_reported', bugIndex)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="form-floating">
                                        <h6>Requested Features:</h6>
                                        {report.requested_features.map((feature, featureIndex) => (
                                            <div className="input-group mb-3" key={featureIndex}>
                                                <input
                                                    type="text"
                                                    className={`form-control edit-input${editMode ? '' : ' readonly'}`}
                                                    value={feature}
                                                    onChange={(e) =>
                                                        handleInputChange(report._id, 'requested_features', featureIndex, e.target.value)
                                                    }
                                                    readOnly={!editMode}
                                                />
                                                <button
                                                    className="btn btn-outline-danger"
                                                    type="button"
                                                    onClick={() => handleRemoveField(report._id, 'requested_features', featureIndex)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div>Status: {report.status}</div>
                                    <button
                                        className="btn btn-primary mt-2 mx-2"
                                        onClick={() => {
                                            handleStatusChange(report._id);
                                            handleOutput(report.bugs_reported, report.requested_features, report.software);
                                        }}
                                    >
                                        Submit & Get Data
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserFeedback;
