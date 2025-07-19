import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Customers = () => {
  const [allCustomers, setallCustomers] = useState([]);

  useEffect(() => {
    let fetchCustomers = async () => {
      try {
        let result = await axios.get(
          "http://localhost:5000/api/fetchcustomers"
        );
        console.log("DATA", result.data);
        setallCustomers(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomers();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 60 },
    {
      field: "name",
      headerName: "Customer Name",
      width: 250,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 260,
      editable: true,
    },
    {
      field: "Phone",
      headerName: "Mobile No.",
      width: 200,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      width: 450,
      editable: true,
      renderCell: (address) => (
        <Typography variant="body2">
          {address.value?.street}, {address.value?.city},{" "}
          {address.value?.postalCode}
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "100%", mt: 10 }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 2,
          }}
        >
          Customers
        </Typography>
        <DataGrid
          getRowId={(row) => row._id}
          rows={allCustomers}
          columns={columns}
          rowHeight={55}
          pagination={false}
          hideFooter
          sx={{
            // Header row background
            
             "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#1976d2 !important",
  },
            // Header text color and bold
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#000",
              // bgcolor:"#1976d2 !important",
              fontWeight: "bold",
            },
            // Row text color
            "& .MuiDataGrid-cell": {
              color: "#000",
              //  backgroundColor: "#1976d2 ", // black
            },
            // Optional: white column separators
            "& .MuiDataGrid-columnSeparator": {
              color: "#fff",
            },
          }}
        />
      </Box>
    </>
  );
};

export default Customers;
