import React, { useEffect, useState, useContext } from 'react';
import $ from 'jquery';
import AccountContext from '../context/AccountContext';
import axios from 'axios';
import 'datatables.net';

import Web3 from 'web3';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const Transactionhistory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { account, contract, roller, username } = useContext(AccountContext);

  

    function timestampToDate(a) {
        const timestamp = Number(a);
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();
        return formattedTime;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (contract) {
                    const response = await axios.get('http://localhost:5000/api/transactionhistory');

                    const newData = [];

                    for (var i = 0; i < response.data.length; i++) {
                        for (var j = 0; j < response.data[i].transactionhashes.length; j++) {
                            const txHash = response.data[i].transactionhashes[j].hash;
                            const transactionDetails = await getTransactionDetails(txHash);
                            console.log(transactionDetails)
                            if (transactionDetails) {
                                const date = timestampToDate(transactionDetails.timestamp);
                                let status;
                                if(transactionDetails.status==0){
                                    status="Falied"
                                }
                                else{
                                    status="Success"
                                }
                                const row = [
                                    response.data[i].department,
                                    transactionDetails.transactionHash,
                                    transactionDetails.from,
                                    date,
                                    transactionDetails.gasUsed.toString(),
                                    status,
                                    transactionDetails.blockHash,
                                    transactionDetails.blockNumber.toString(),
                                    transactionDetails.cumulativeGasUsed.toString(),
                                ];

                                let a = response.data[i].department.split('-')[0];
                                console.log(a);
                                if (username == response.data[i].transactionhashes[j].name || roller == a) {
                                    
                                    newData.push(row);
                                }
                            }
                        }
                    }

                    setData(newData);
                    setLoading(false); 
                }
            } catch (error) {
                console.error('Error fetching data:');
                setLoading(false);
            }
        };

        fetchData();
    }, [contract]);

    const getTransactionDetails = async (txHash) => {
        try {
            const web3 = new Web3('http://localhost:6545');
            const receipt = await web3.eth.getTransactionReceipt(txHash);
    
            if (receipt) {
                const block = await web3.eth.getBlock(receipt.blockNumber);
                const timestamp = Number(block.timestamp);
                receipt.timestamp = timestamp.toString();
                return receipt;
            } else {
                throw new Error('Transaction receipt not found');
            }
        } catch (error) {
            return null;
        }
    };
    

    useEffect(() => {
        const initializeDataTable = () => {
            if (data.length > 0) {
                if ($.fn.DataTable.isDataTable('#myTable')) {
                    $('#myTable').DataTable().destroy();
                }
    
                const table = $('#myTable').DataTable({
                    data: data,
                    columns: [
                        { title: 'From', data: 2, className: 'table-info text-wrap text-break' },
                        { title: 'Date', data: 3, className: 'table-warning' },
                        { title: 'Gas Used', data: 4, className: 'table-secondary'  },
                        { title: 'Status', data: 5, className: 'table-danger' },
                    ],
                    order: [[1, 'asc']]
                    
                });
    
                // Add event listener for opening and closing details
                $('#myTable tbody').on('click', 'tr', function () {
                    const tr = $(this).closest('tr');
                    const row = table.row(tr);
    
                    if (row.child.isShown()) {
                        // This row is already open - close it
                        row.child.hide();
                        tr.removeClass('shown');
                    } else {
                        // Close other rows before opening this row
                        table.rows().every(function () {
                            const rowNode = this.node();
                            if ($(rowNode).hasClass('shown')) {
                                $(rowNode).removeClass('shown');
                                $(rowNode).next('.child').remove();
                            }
                        });
    
                        // Open this row
                        const rowData = row.data();
                        if (rowData) {
                            row.child(format(rowData)).show();
                            tr.addClass('shown');
                        }
                    }
                });
            }
        };
    
        initializeDataTable();
    }, [data]);
    
    function format(d) {
        if (d && d.length > 0) {
            return (
                '<dl>' +
                '<dt>Page:</dt>' +
                '<dd>' + d[0] + '</dd>' +
                '<dt>Transaction hash:</dt>' +
                '<dd>' + d[1] + '</dd>' +
                '<dt>Block hash:</dt>' +
                '<dd>' + d[6] + '</dd>' +
                '<dt>Block no:</dt>' +
                '<dd>' + d[7] + '</dd>' +

                '</dl>'
            );
        }
        return '';
    }
    

    return (
        <div className='container text-center p-3 border border-dark'>
        {loading ? ( 
          <h5>Loading.......</h5>
        ) : (
          <>
            <h5>Metamask account connected to this site is</h5>
            <h3> {account}</h3>
            <div className='container text-center table-responsive' id='dd'>
              <table className='table table-primary table-striped table-hover display my-3' width='100%' cellspacing='0' id='myTable'>
              </table>
            </div>
          </>
        )}
      </div>
    );
};

export default Transactionhistory;
