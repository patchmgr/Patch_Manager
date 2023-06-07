// import React, { useState, useEffect } from 'react';

// const Form = () => {
// 	const [formData, setFormData] = useState({
// 		firstName: '',
// 		lastName: '',
// 	});

// 	const [allData, setAllData] = useState([]);

// 	const handleInputChange = (event) => {
// 		const { name, value } = event.target;
// 		setFormData((prevFormData) => ({
// 			...prevFormData,
// 			[name]: value
// 		}));
// 	};

// 	const handleSubmit = (event) => {
// 		event.preventDefault();
// 		setAllData((prevAllData) => [...prevAllData, formData]);
// 	};

// 	useEffect(() => {
// 		console.log(allData);
// 	}, [allData]);

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<div>
// 				<label>
// 					First Name:
// 					<input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="form-control" />
// 				</label>
// 				<br />
// 				<label>
// 					Last Name:
// 					<input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className='form-control' />
// 				</label>
// 				<br />
// 			</div>
// 			<button type="submit">Submit</button>
// 		</form>
// 	);
// };

// export default Form;


import React, { useState, useEffect } from 'react';

const Form = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
	});


	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formData);
	};
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>
					First Name:
					<input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="form-control" />
				</label>
				<br />
				<label>
					Last Name:
					<input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className='form-control' />
				</label>
				<br />
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

export default Form;
