// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const UserFeedback = () => {
// //     const [reports, setReports] = useState([]);
// //     const [editMode, setEditMode] = useState(false);

// //     useEffect(() => {
// //         const fetchReports = async () => {
// //             try {
// //                 const response = await axios.get('http://localhost:5000/api/reporteddetails');
// //                 const data = response.data;
// //                 setReports(data);
// //             } catch (error) {
// //                 console.error('Error fetching reports:', error);
// //             }
// //         };

// //         fetchReports();
// //     }, []);

// //     const handleStatusChange = async (reportId) => {
// //         try {
// //             await axios.put(`http://localhost:5000/api/reporteddetails/${reportId}`, { status: 'used' });
// //             setReports((prevReports) =>
// //                 prevReports.map((report) =>
// //                     report._id === reportId ? { ...report, status: 'used' } : report
// //                 )
// //             );
// //             alert('Status updated successfully.');
// //         } catch (error) {
// //             console.error('Error updating status:', error);
// //         }
// //     };



// //     const handleTextAreaChange = (reportId, field, event) => {
// //         const value = event.target.value;
// //         setReports((prevReports) =>
// //             prevReports.map((report) =>
// //                 report._id === reportId ? { ...report, [field]: value } : report
// //             )
// //         );
// //     };

// //     const handleOutput = (bugs, features) => {
// //         console.log([bugs.toString()]);
// //         console.log([features.toString()]);
// //     };

// //     return (
// //         <div>

// //             {reports.map((report) => (
// //                 report.status === 'notused' && (
// //                     <div key={report._id} className="card mb-3">
// //                         <div className='card-header'>
// //                             <h5 >Username: {report.username}</h5>



// //                         </div>
// //                         <div className="card-body">

// //                             <div className="form-check form-switch end-0 ">
// //                                 <input
// //                                     className="form-check-input"
// //                                     type="checkbox"
// //                                     id="edit-toggle"
// //                                     checked={editMode}
// //                                     onChange={() => setEditMode(!editMode)}
// //                                 />
// //                                 <h5 className=''>Edit</h5>
// //                             </div>


// //                             <div className="form-floating">
// //                                 <h6>Bugs Reported:</h6>
// //                                 <textarea
// //                                     className={`form-control edit-input${editMode ? '' : 'readonly'}`}
// //                                     rows="5"
// //                                     value={report.bugs_reported}
// //                                     onChange={(event) => handleTextAreaChange(report._id, 'bugs_reported', event)}
// //                                     readOnly={!editMode}

// //                                 ></textarea>
// //                             </div>
// //                             <div className="form-floating">
// //                                 <h6>Requested Features:</h6>
// //                                 <textarea
// //                                     className={`form-control edit-input${editMode ? '' : 'readonly'}`}
// //                                     rows="5"
// //                                     value={report.requested_features}
// //                                     onChange={(event) => handleTextAreaChange(report._id, 'requested_features', event)}
// //                                     readOnly={!editMode}

// //                                 ></textarea>
// //                             </div>
// //                             <div>Status: {report.status}</div>

// //                             <button className="btn btn-primary mt-2 mx-2" onClick={() => handleStatusChange(report._id)}>
// //                                 Submit it
// //                             </button>
// //                             <button className="btn btn-primary mt-2 mx-2" onClick={() => handleOutput(report.bugs_reported, report.requested_features)}>
// //                                 Get Data
// //                             </button>

// //                         </div>
// //                     </div>
// //                 )
// //             ))}
// //         </div>
// //     );
// // };

// // export default UserFeedback;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserFeedback = () => {
//     const [reports, setReports] = useState([]);
//     const [editMode, setEditMode] = useState(false);

//     useEffect(() => {
//         const fetchReports = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/reporteddetails');
//                 const data = response.data;
//                 setReports(data);
//             } catch (error) {
//                 console.error('Error fetching reports:', error);
//             }
//         };

//         fetchReports();
//     }, []);

//     const handleStatusChange = async (reportId) => {
//         try {
//             await axios.put(`http://localhost:5000/api/reporteddetails/${reportId}`, { status: 'used' });
//             setReports((prevReports) =>
//                 prevReports.map((report) =>
//                     report._id === reportId ? { ...report, status: 'used' } : report
//                 )
//             );
//             alert('Status updated successfully.');
//         } catch (error) {
//             console.error('Error updating status:', error);
//         }
//     };

//     const handleTextAreaChange = (reportId, field, event) => {
//         const value = event.target.value;
//         setReports((prevReports) =>
//             prevReports.map((report) =>
//                 report._id === reportId ? { ...report, [field]: value } : report
//             )
//         );
//     };

//     const handleOutput = (bugs, features) => {
//         console.log([bugs.toString()]);
//         console.log([features.toString()]);
//     };

//     return (
//         <div>
//             <div className="container mt-4">
//                 <div className="accordion" id="accordionExample">
//                     {reports.map((report, index) => (
//                         report.status === 'notused' && (
//                             <div className="accordion-item" key={report._id}>
//                                 <h2 className="accordion-header" id={`heading${index}`}>
//                                     <button
//                                         className="accordion-button"
//                                         type="button"
//                                         data-bs-toggle="collapse"
//                                         data-bs-target={`#collapse${index}`}
//                                         aria-expanded={index === 0 ? 'true' : 'false'}
//                                         aria-controls={`collapse${index}`}
//                                     >
//                                         Username: {report.username}
//                                     </button>
//                                 </h2>
//                                 <div
//                                     id={`collapse${index}`}
//                                     className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
//                                     aria-labelledby={`heading${index}`}
//                                     data-bs-parent="#accordionExample"
//                                 >
//                                     <div className="accordion-body">
//                                         <div className="form-check form-switch end-0 ">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="checkbox"
//                                                 id="edit-toggle"
//                                                 checked={editMode}
//                                                 onChange={() => setEditMode(!editMode)}
//                                             />
//                                             <h5 className=''>Edit</h5>
//                                         </div>
//                                         <div className="form-floating">
//                                             <h6>Bugs Reported:</h6>
//                                             <textarea
//                                                 className={`form-control edit-input${editMode ? '' : 'readonly'}`}
//                                                 rows="5"
//                                                 value={report.bugs_reported}
//                                                 onChange={(event) => handleTextAreaChange(report._id, 'bugs_reported', event)}
//                                                 readOnly={!editMode}
//                                             ></textarea>
//                                         </div>
//                                         <div className="form-floating">
//                                             <h6>Requested Features:</h6>
//                                             <textarea
//                                                 className={`form-control edit-input${editMode ? '' : 'readonly'}`}
//                                                 rows="5"
//                                                 value={report.requested_features}
//                                                 onChange={(event) => handleTextAreaChange(report._id, 'requested_features', event)}
//                                                 readOnly={!editMode}
//                                             ></textarea>
//                                         </div>
//                                         <div>Status: {report.status}</div>
//                                         <button className="btn btn-primary mt-2 mx-2" onClick={() => handleStatusChange(report._id)}>
//                                             Submit it
//                                         </button>
//                                         <button className="btn btn-primary mt-2 mx-2" onClick={() => handleOutput(report.bugs_reported, report.requested_features)}>
//                                             Get Data
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserFeedback;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserFeedback = () => {
  const [reports, setReports] = useState([]);
  const [editMode, setEditMode] = useState(false);

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
  }, []);

  const handleStatusChange = async (reportId) => {
    try {
      await axios.put(`http://localhost:5000/api/reporteddetails/${reportId}`, { status: 'used' });
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === reportId ? { ...report, status: 'used' } : report
        )
      );
      alert('Status updated successfully.');
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

  const handleOutput = (bugs, features) => {
    console.log('Bugs:', bugs);
    console.log('Features:', features);
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="accordion" id="accordionExample">
          {reports.map((report, index) => (
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
                    onClick={() => handleStatusChange(report._id)}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-primary mt-2 mx-2"
                    onClick={() => handleOutput(report.bugs_reported, report.requested_features)}
                  >
                    Get Data
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
