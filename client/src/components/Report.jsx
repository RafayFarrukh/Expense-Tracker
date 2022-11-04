import AuthCheck from "./AuthCheck";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import axiosInstance from "../services/axiosInstance";

const dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("-");
    var cellDate = new Date(
      Number(dateParts[0]),
      Number(dateParts[1]) - 1,
      Number(dateParts[2])
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
const token = localStorage.getItem("Token");

const Report = () => {
  const [gridApi, setGridApi] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState("");

  const [rowData, setRowData] = useState();

  const columns = [
    {
      headerName: "Date",
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
    },

    { headerName: "Description", field: "name" },

    {
      headerName: "Credit",

      valueGetter: (p) => {
        if (p.data.category.includes("Income")) {
          return p.data.amount;
        }
      },
    },

    {
      headerName: "Debit",

      valueGetter: (p) => {
        if (p.data.category.includes("Expenses")) {
          return p.data.amount;
        }
      },
    },

    {
      headerName: "Current Balance",
      field: "currentBalance",
    },
  ];
  const defColumnDefs = { flex: 1 };

  const onGridReady = (params) => {
    setGridApi(params);
  };
  const getFilterType = () => {
    if (startDate !== "" && endDate !== "") return "inRange";
    else if (startDate !== "") return "greaterThan";
    else if (endDate !== "") return "lessThan";
  };

  useEffect(() => {
    axiosInstance
      // .get("http://localhost:4000/home", { headers: { "x-auth-token": token } })

      .get("/home", { headers: { "x-auth-token": token } })
      .then((res) => {
        setRowData(res.data.records);
      });

    if (gridApi) {
      if (startDate !== "" && endDate !== "" && startDate > endDate) {
        alert("Start Date should be before End Date");
        setEndDate("");
      } else {
        var dateFilterComponent = gridApi.api.getFilterInstance("date");
        dateFilterComponent.setModel({
          type: getFilterType(),
          dateFrom: startDate ? startDate : endDate,
          dateTo: endDate,
        });
        gridApi.api.onFilterChanged();
      }
    }
  }, [startDate, endDate]);
  return (
    <AuthCheck>
      <div className="mt-6 mb-6">
        <div className="ag-theme-alpine " style={{ height: 600 }}>
          <div className="flex mb-6  justify-center   items-center ">
            From : &nbsp;
            <input
              type="date"
              className="flex  items-center "
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            &nbsp; To : &nbsp;{" "}
            <input
              type="date"
              className="flex items-center "
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <AgGridReact
            style={{ width: "100%", height: "100%;" }}
            rowData={rowData}
            columnDefs={columns}
            defaultColDef={defColumnDefs}
            onGridReady={onGridReady}
            pagination={true}
            paginationPageSize={12}
          ></AgGridReact>
        </div>
      </div>
    </AuthCheck>
  );
};

export default Report;
