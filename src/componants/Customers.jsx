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
    
    // { field: "_id", headerName: "ID", width: 60 },
    
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
          rowHeight={36} // compact row height
          pagination={false}
          hideFooter
          sx={{
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1976d2",
              // color: "#ffffff",
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
                fontSize: "1rem",
              },
            },

            "& .MuiDataGrid-cell": {
              whiteSpace: "normal",
              wordBreak: "break-word",
              fontSize: "0.9rem",
              padding: "10px 12px", // more vertical spacing
              lineHeight: "1.5rem",
            },

            "& .MuiDataGrid-cell": {
              whiteSpace: "normal",
              wordBreak: "break-word",
              fontSize: "0.85rem",
              padding: "6px 8px",
              lineHeight: "1.4rem",
            },

            "& .MuiDataGrid-row": {
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            },

            "& .MuiDataGrid-virtualScroller": {
              overflow: "auto !important",
            },
          }}
        />
      </Box>
    </>
  );
};

export default Customers;
