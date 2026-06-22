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
          `http://localhost:5000/api/fetchallreviews`,
        );
        let data = result.data;
        setallReviews(data);
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    };
    fetchReviews();
  }, []);

  let columns = [
    {
      header: "Sr No.",
      accessorFn: (row, index) => index + 1,
      id: "rowNumber",
      size: 25, // very small width
      maxSize: 30, // restricts it from expanding
      enableSorting: false,
      enableColumnResizing: false, // optional: lock column width
      Cell: ({ cell }) => (
        <div style={{ textAlign: "center" }}>{cell.getValue()}</div>
      ),
      Header: () => <div style={{ textAlign: "center" }}>Sr No.</div>, // optional short header
    },

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

    muiTableBodyCellProps: {
      sx: {
        whiteSpace: "normal",
        wordBreak: "break-word",
        fontSize: "0.85rem", // smaller font
        padding: "4px 8px", // reduced padding
        verticalAlign: "middle",
      },
    },

    muiTableBodyRowProps: () => ({
      sx: {
        height: 48, // Reduce height
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      },
    }),

    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#1976d2",
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: "0.9rem", // slightly smaller
        padding: "6px 8px",
      },
    },
  });

  return (
    <>
      {/* <Box>
        <Typography
          variant="h5"
          sx={{
            mt: 10,
            textAlign: "center",
          }}
        >
          Reviews
        </Typography>
      </Box> */}
      <Box sx={{mt:2}}>
       
        <MaterialReactTable table={reviewTable} />
      </Box>
    </>
  );
};

export default Reviews;
