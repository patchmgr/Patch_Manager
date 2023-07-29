import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";

const DownloadHistory = () => {
    const [downloadData, setDownloadData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (downloadData.length > 0) {
            $(function () {
                $("#myTable").DataTable(
                    
                );
            });
        }
    }, [downloadData]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/downloads");
            const flattenedData = response.data.reduce((acc, item) => {
                return [...acc, ...item.downloaddetails.map((detail) => ({
                    ...item,
                    username: detail.username,
                    downloadedtime: detail.downloadedtime
                }))];
            }, []);
            console.log(flattenedData);
            const sortedData = flattenedData.sort((a, b) => {
                return new Date(b.downloadedtime) - new Date(a.downloadedtime);
            });
    
            setDownloadData(sortedData);
            // console.log(sortedData);
        } catch (error) {
            console.log(error);
        }
    };
    

    function formatDate(a) {
        const t=Date.parse(a) / 1000;
        const timestamp = Number(t);
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();
        return formattedTime;
    }


    return (
        <div className="container text-center p-3 border border-dark table-responsive ">
            <table id="myTable" className="table table-hover text-capitalize  ">
                <thead className="table-dark">
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>User</th>
                        <th>Software</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {downloadData.length > 0 ? (
                        downloadData.map((item, index) => (
                            // <tr className="table-primary" key={index}>
                            <tr className={ "table-success"} key={index}>

                                <td>{index + 1}</td>
                                <td>{item.patchname}</td>
                                <td>{item.username}</td>
                                <td>{item.software}</td>
                                <td>{formatDate(item.downloadedtime)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DownloadHistory;
