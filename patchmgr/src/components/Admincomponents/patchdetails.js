// import React, { useEffect, useState } from 'react';
// import connectContract from '../Web3components/ContractConnector';
// import $ from 'jquery';
// import Web3 from 'web3';
// import 'datatables.net';

// const Patchdetails = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 await connectContract();
//                 if (!window.contract || !window.contract.methods) {
//                     throw new Error('Contract methods not available');
//                 }

//                 const newData = [];
//                 const ids = await window.contract.methods.dataarray().call();
//                 for (var i = 0; i < ids.length; i++) {
//                     const vals = await window.contract.methods.details(ids[i]).call();
//                     const row = [i + 1, vals[0], vals[1], vals[2], vals[3], timestampToDate(vals[7]),vals[5],vals[6]];
//                     newData.push(row);

//                 }

//                 setData(newData);
//                 $(function () {
//                     $('#myTable').DataTable();
//                 });
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//         fetchData()
//     }, []);

//     function timestampToDate(a) {
//         const timestamp = Number(a);
//         const milliseconds = timestamp * 1000;
//         const dateObject = new Date(milliseconds);
//         const formattedTime = dateObject.toLocaleString();
//         return formattedTime;
//     }






//     return (
//         <div>
//             <div className="container text-center" id="dd">
//                 <br /><br />
//                 <table className="table table-striped table-hover" id="myTable">
//                     <thead>
//                         <tr>
//                             <th>Sno</th>
//                             <th>Patch name</th>
//                             <th>Description</th>
//                             <th>Platform</th>
//                             <th>features</th>
//                             <th>Registered time</th>
//                             <th>verify</th>
//                             <th>status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((row, i) => (
//                             <tr key={i}>
//                                 <td>{row[0]}</td>
//                                 <td>{row[1]}</td>
//                                 <td>{row[2]}</td>
//                                 <td>{row[3]}</td>
//                                 <td>{row[4]}</td>
//                                 <td>{row[5]}</td>
//                                 <td>{row[6]}</td>
//                                 <td>{row[7]}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Patchdetails;

import React, { useEffect, useState } from 'react';
import connectContract from '../Web3components/ContractConnector';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';

const Patchdetails = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await connectContract();
        if (!window.contract || !window.contract.methods) {
          throw new Error('Contract methods not available');
        }

        const ids = await window.contract.methods.dataarray().call();
        const newData = await Promise.all(ids.map(async (id) => {
          const vals = await window.contract.methods.details(id).call();
          return [
            id,
            vals[0],
            vals[1],
            vals[2],
            vals[3],
            timestampToDate(vals[7]),
            vals[5],
            vals[6]
          ];
        }));

        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      $(document).ready(function () {
        $('#myTable').DataTable({
          data: data,
          destroy: true,
          dom: 'Bfrtip',
          buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
        });
      });
    }
  }, [data]);

  function timestampToDate(a) {
    const timestamp = Number(a);
    const milliseconds = timestamp * 1000;
    const dateObject = new Date(milliseconds);
    const formattedTime = dateObject.toLocaleString();
    return formattedTime;
  }

  return (
    <div>
      <div className="container text-center" id="dd">
        <br /><br />
        <table className="table table-striped table-hover" id="myTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patch name</th>
              <th>Description</th>
              <th>Platform</th>
              <th>Features</th>
              <th>Registered time</th>
              <th>Verify</th>
              <th>Status</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default Patchdetails;
