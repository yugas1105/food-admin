import { Box, Typography } from "@mui/material";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useState } from "react";

const Reviews = () => {
  const [allReviews, setallReviews] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    let fetchReviews = async () => {
      setisLoading(true);
      try {
        let result = await axios.get(
          `http://localhost:5000/api/fetchallreviews`
        );
        let data = result.data;
        setallReviews(data);
      } catch (error) {
        console.log(error);
      }finally{
        setisLoading(false);
      }
    };
    fetchReviews();
  }, []);

  let columns = [
    {
      accessorKey: "customer.name",
      header: "Customer Name",
    },
    {
      accessorKey: "food.foodname",
      header: "Dish Name",
    },
    {
      accessorKey: "rating",
      header: "Rating",
    },
    {
      accessorKey: "comment",
      header: "Comment",
    },
  ];

  let reviewTable = useMaterialReactTable({
    columns: columns,
    data: allReviews,
    enablePagination: false,

    // Set consistent row height
  muiTableBodyRowProps: () => ({
    sx: {
      height: 70,
      '&:hover': {
        backgroundColor: '#f5f5f5',
      },
    },
  }),

  // Style body cells (including text wrapping)
  muiTableBodyCellProps: {
    sx: {
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      fontSize: '0.95rem',
      padding: '12px',
      verticalAlign: 'top',
    },
  },

  // Optional: style header cells
  muiTableHeadCellProps: {
    sx: {
      backgroundColor: '#1976d2',
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: '1rem',
    },
  },

  // Optional: add hover or border effects to the table container
  muiTableContainerProps: {
    sx: {
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
  }
  });

  return (
    <>
      <Box>
        <Typography
          variant="h5"
          sx={{
            mt: 10,
            textAlign: "center",
          }}
        >
          Reviews
        </Typography>
      </Box>

      <MaterialReactTable table={reviewTable} />
    </>
  );
};

export default Reviews;
