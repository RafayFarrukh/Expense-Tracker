import AuthCheck from './AuthCheck'
import React, {useCallback, useEffect, useState,useMemo,useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import axiosInstance from '../services/axiosInstance'
import moment, * as moments from 'moment';
const dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('-');
    var cellDate = new Date(
      Number(dateParts[0]),
      Number(dateParts[1]) - 1,
      Number(dateParts[2]),
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
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
  //   { name: "Toyota", category: "Celica", amount: 35000, date: "09-02-2022" },
  //   { name: "Ford", category: "Mondeo", amount: 32000, date: "11-02-2022" },
  //   { name: "Porsche", category: "Boxter", amount: 72000, date: "10-02-2022" },
  //   { name: "rafay3", category: "Mers", amount: 92000, date: "2022-12-10" },
  //   { name: "rafay1", category: "Mers", amount: 92000, date: "12-09-2022" },
  //   { name: "rafay2", category: "Mers", amount: 92000, date: "2022-09-19" }
  // ];
 

 const [rowData,setRowData]=useState()


  const columns = [
    { headerName: "Date", field: "date", filter: 'agDateColumnFilter', filterParams: dateFilterParams, },
    
    { headerName: "Description", field: "name" },
  
  { headerName: "Credit",
  // , field: "category"
valueGetter: p=>{
console.log(p);


if ( p.data.category.includes('Income')) {
  return p.data.amount
}

}

},
  
  { headerName: "Debit", 
  
  valueGetter: p=>{
    console.log(p);
    
    
    if ( p.data.category.includes('Expenses')) {
      return p.data.amount
    }
    
    }


  // field: "amount" 

},
  
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
  useEffect(()=>{
    axiosInstance
    .get("http://localhost:4000" ,{ 'headers': { 'x-auth-token': token } })
  })
  useEffect(() => {
    axiosInstance
    .get("http://localhost:4000" ,{ 'headers': { 'x-auth-token': token } })
   .then((res)=>{
  //  console.log(moment(res.data.records[0].date.utc().format('YYYY-MM-DD')))
     setRowData(res.data.records)
     console.log(res.data.records)
    

    
    //  console.log(res.data.records[0].date)
 
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
 
console.log(startDate,endDate);
  }
  , 
  [startDate, endDate]
  )
  return (
    <AuthCheck>
     
     <div className="ag-theme-alpine" style={{ height: 600 }}>
      <div className='flex'>
     From : <input type="date"
     
         value={startDate}
          onChange={e => setStartDate(e.target.value)} />
        To : <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defColumnDefs}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={12}
        ></AgGridReact>
      </div>
      
    </AuthCheck>
  )
}

export default Report