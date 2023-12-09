import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Digital } from "react-activity";
import "react-activity/dist/library.css";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import TableComponent from '../../components/table-component';
import '../themes/App.css';

function App() {

	const COLUMN_DATA = useMemo(() => [
		{
			Header: " Employee Details",
			columns: [
			{
				Header: "ID",
				accessor: "id",
			},
			{
				Header: "First Name",
				accessor: "fname",
			},
			{
				Header: "Last Name",
				accessor: "lname",
			},
			{
				Header: "City",
				accessor: "city",
			},
			{
				Header: "Action",
				Cell: ({ cell }) => {
					return (
						<div className='action'>
							<button className='downloadBtn'
								value={cell.row.values.id} onClick={(props) => _handleDownload(cell.row.values)}>
								Download
							</button>
						</div>
					)
				}
			}]
		}
	]);

	const [loading, setLoading] = useState(false);
	const [empData, setEmpData] = useState([]);
	const [searchData, setSearchData] = useState([]);

	const[fileName, setFileName] = useState("Reports");
	const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	const fileExtension = '.xlsx';

	useEffect(() => {
		_getEmpData();
	}, []);

	// API - get data from api
	const _getEmpData = async () => {
		setLoading(true);
		const response = await axios.get(
			"https://6572e5e6192318b7db4139ea.mockapi.io/api/v1/emp"
		);
		setEmpData(response.data);
		setLoading(false);
	};

	// handle search
	const _handleSearch = (e) => {
		if (e?.target?.value) {
			setSearchData(empData.filter((item) => {
				return item.fname.toLowerCase().includes(e.target.value.toLowerCase());
			}));
		} else {
			setSearchData([]);
		}
	}

	// handle download
	function _handleDownload() {
		const ws = XLSX.utils.json_to_sheet(empData);
		const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
		const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
		
		const data = new Blob([excelBuffer], {type: fileType});
		FileSaver.saveAs(data, fileName + fileExtension);
	}

	return (
		<div className="container">
			{
				(loading) ?
					<div className='body'>

						{/* activity loader */}
						<Digital size={50}/>
					</div>
				:
					<div className='body'>

						{/* search label */}
						<label htmlFor="search" className='label'>
							Search by Name:

							{/* search input */}
							<input id="search"
								className='input'
								type="text"
								onChange={_handleSearch} />
						</label>

						{/* custom component */}
						<TableComponent columns={COLUMN_DATA}
							data={searchData?.length !== 0 ? searchData : empData}/>
					</div>
			}
		</div>
	);
}

export default App;
