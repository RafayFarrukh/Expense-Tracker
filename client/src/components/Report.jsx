import AuthCheck from './AuthCheck'
import React, {useCallback, useEffect, useState,useMemo,useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import axiosInstance from '../services/axiosInstance'
import moment from "moment";
const dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('-');
   
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      // Number(dateParts[0])
    );
    // if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //   return 0;
    // }
    // if (cellDate < filterLocalDateAtMidnight) {
    //   return -1;
    // }
    // if (cellDate > filterLocalDateAtMidnight) {
    //   return 1;
    // }
  },
  browserDatePicker: true,
};
const token = localStorage.getItem('Token') //Or however you choose to get it

const Report = () => {
const [data,setData]=useState('')
  const [gridApi, setGridApi] = useState()
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const rowData = [
  //   { make: "Toyota", model: "Celica", price: 35000, date: "09-02-2022" },
  //   { make: "Ford", model: "Mondeo", price: 32000, date: "11-02-2022" },
  //   { make: "Porsche", model: "Boxter", price: 72000, date: "10-02-2022" },
  //   { make: "Mers", model: "Mers", price: 92000, date: "12-02-2022" }
  // ];
 

 const [rowData,setRowData]=useState()


  const columns = [{ headerName: "Name", field: "name" },
  { headerName: "Category", field: "category" },
  { headerName: "Amount", field: "amount" },
  { headerName: "Date", field: "date", filter: 'agDateColumnFilter', filterParams: dateFilterParams, }
  ]
  const defColumnDefs = { flex: 1, }

  const onGridReady = (params) => {

  
    setGridApi(params)
  }
  const getFilterType = () => {
    if (startDate !== '' && endDate !== '') return 'inRange';
    else if (startDate !== '') return 'greaterThan'
    else if (endDate !== '') return 'lessThan'
  };
  useEffect(() => {
    axiosInstance
    .get("http://localhost:4000" ,{ 'headers': { 'x-auth-token': token } })
   .then((res)=>{
    console.log(moment(res.data.records[0].date).utc().format('YYYY-MM-DD'));
     setRowData(res.data.records)
   })
   
    if (gridApi) {
      if (startDate !== '' && endDate !== '' && startDate > endDate) {
        alert("Start Date should be before End Date")
        setEndDate('')
      } else {
        var dateFilterComponent = gridApi.api.getFilterInstance('date');
        dateFilterComponent.setModel({
          type: getFilterType(),
          dateFrom: startDate ? startDate : endDate,
          dateTo: endDate,
        });
        gridApi.api.onFilterChanged();
      }

    }
    console.log(
      // moment(startDate).format('YYYY-MM-DD').utc()
    )

  }, [startDate, endDate])
  return (
    <AuthCheck>
     
     <div className="ag-theme-alpine " style={{ height: 400 }}>
      <div className='flex'>
     From : <input type="date"
     
         value={(startDate)}
          onChange={e => setStartDate(e.target.value)} />
        To : <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defColumnDefs}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
      
    </AuthCheck>
  )
}

export default Report