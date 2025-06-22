import { Box, Typography } from '@mui/material'
import axios from 'axios'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import React, { useEffect, useState } from 'react'

const Reviews = () => {


  const [allReviews, setallReviews] = useState([])

  useEffect(() => {
    let fetchReviews = async () => {
      try {
        let result = await axios.get(`http://localhost:5000/api/fetchallreviews`);
        let data = result.data;
        setallReviews(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchReviews()
  }, [])

  let columns = [
    {
      accessorKey: "customer.name",
      header: "Customer Name"
    },
    {
      accessorKey: "food.foodname",
      header: "Dish Name"
    },
    {
      accessorKey: "rating",
      header: "Rating"
    },
    {
      accessorKey: "comment",
      header: "Comment"
    }
  ]

  let reviewTable = useMaterialReactTable({
    columns: columns,
    data: allReviews
  })

  return (
    <>
      <Box>
        <Typography variant='h5' sx={{
          mt: 10,
          textAlign: 'center'
        }}>Reviews</Typography>
      </Box>

      <MaterialReactTable table={reviewTable}/>
    </>
  )
}

export default Reviews