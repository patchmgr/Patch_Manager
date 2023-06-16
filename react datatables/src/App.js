import React, { useEffect, useState } from 'react';
import './App.css';
// import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';

import jsonData from './componets/products.json';

function App() {
	const [data, setData] = useState([]);

	useEffect(() => {
		setData(jsonData.table.rows);
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

	return (
		<div>
			<div className="container text-center" id="dd">
				<br /><br />
				<table className="table table-striped table-hover" id="myTable">
					<thead>
						<tr>
							{jsonData.table.headers.map((header, index) => (
								<th key={index}>{header}</th>
							))}
						</tr>
					</thead>
				</table>
			</div>
		</div>
	);

}

export default App;


