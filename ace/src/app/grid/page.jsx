'use client'
import { useState, useEffect } from 'react'; // Import useState and useEffect from React
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const Grid = () => {
    // Initialize rowData state with an empty array
    const [rowData, setRowData] = useState([]);
    
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        { field: "make", headerName: "Make", checkboxSelection: true },
        { field: "id", headerName: "ID", filter: true },
        { field: "username", headerName: "Username", filter: true },
        { field: "email", headerName: "Email", filter: true },
        { field: "gender", headerName: "Gender", filter: true },
        { field: "phone_number", headerName: "Phone Number", filter: true },
        { field: "subscription.plan", headerName: "Subscription Plan", editable: true, filter: true },
        { field: "subscription.status", headerName: "Subscription Status", editable: true, filter: true },
    ]);

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://thingproxy.freeboard.io/fetch/https://random-data-api.com/api/v2/users?size=10&is_xml=false");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRowData(data); // Update rowData state with fetched data
            } catch (error) {
                console.error('There was a problem fetching the data:', error);
            }
        };

        fetchData(); // Call the fetchData function
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    // Wrapping return inside the component
    return (
        // Wrapping container with theme & size
        <div className="h-screen flex justify-center items-center">
            <div className="ag-theme-quartz w-full max-w-4xl">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    rowSelection="multiple" // Enable row selection
                    pagination={true} // Enable pagination
                    paginationPageSize={500} // Set pagination page size
                    paginationPageSizeSelector={[200, 500, 1000]} // Set pagination page size selector options
                    enableSorting={true} // Enable sorting
                    enableFilter={true} // Enable filtering
                    floatingFilter={true} // Enable floating filters
                    enableCellEditing={true} // Enable cell editing
                />
            </div>
        </div>
    );
}

export default Grid; // Exporting the component
