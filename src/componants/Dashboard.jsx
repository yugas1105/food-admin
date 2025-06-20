import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {

  const [counterData, setcounterData] = useState({})

  useEffect(() => {
    let fetchCounterData = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/fetchcounter')
        setcounterData(result.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchCounterData()

  }, [])


  return (
    <>
      <Box>
        <Typography variant='h5' sx={{
          mt: 10,
          textAlign: 'center'
        }}>Dashboard</Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt: 10,
        mb: 10,
        alignItems: 'center'
      }}>
        <Box>
          <Typography variant='h6'>Total Orders</Typography>
          <Typography variant='h4'>{counterData.orderCounter}</Typography>
        </Box>

        <Box>
          <Typography variant='h6'>Total Customer</Typography>
          <Typography variant='h4'>{counterData.customerCounter}</Typography>
        </Box>

        <Box>
          <Typography variant='h6'>Total Dishes</Typography>
          <Typography variant='h4'>{counterData.fooDCounter}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default Dashboard