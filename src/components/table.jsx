import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const Table = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "Desert(100g serving)",
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { field: "calories", filter: true },
    { field: "fat", filter: true },
    { field: "carbs(g)", filter: true },
    { field: "Protein(g)", filter: true },
  ]);
  var rowDataA = [
    {
      "Desert(100g serving)": "Marshmalo",
      calories: 300,
      fat: 2,
      "carbs(g)": 4,
      "Protein(g)": 0,
    },
    {
      "Desert(100g serving)": "Honey",
      calories: 4000,
      fat: 0,
      "carbs(g)": 67,
      "Protein(g)": 4,
    },
    {
      "Desert(100g serving)": "cupcake",
      calories: 600,
      fat: 57,
      "carbs(g)": 6,
      "Protein(g)": 10,
    },
    {
      "Desert(100g serving)": "Jelly",
      calories: 3478,
      fat: 300,
      "carbs(g)": 4,
      "Protein(g)": 5,
    },
  
  ];
  useEffect(() => {
    setRowData(rowDataA);
  }, []);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  const paginationNumberFormatter = useCallback((params) => {
    return "[" + params.value.toLocaleString() + "]";
  }, []);
  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById("page-size").value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);
  return (
    <div>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ Width: "500px", height: 500 }}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection={"multiple"} // Options - allows click selection of rows
          rowMultiSelectWithClick={true}
          pagination={true}
          paginationPageSize={10}
          paginationNumberFormatter={paginationNumberFormatter}
        />
        <div className="">
          Page Size:
          <select onChange={onPageSizeChanged} id="page-size">
            <option value="5" selected={true}>
              5
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="100">1000</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Table;
