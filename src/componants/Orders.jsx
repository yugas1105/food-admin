import { Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import UpgradeIcon from '@mui/icons-material/Upgrade';
import React, { useEffect, useState } from 'react'

//Update Order Status Dialog Admin
//fetch orders using axios and material-react-table
const Orders = () => {

  const [allOrders, setallOrders] = useState([])

  const [isLoading, setisLoading] = useState(false)

  const [isOpen, setisOpen] = useState(false)

  const [ordStatus, setordStatus] = useState("")
  const [ordId, setordId] = useState("")

  useEffect(() => {
    let fetchOrders = async () => {
      setisLoading(true)
      try {
        let result = await axios.get(`http://localhost:5000/api/fetchorder`);
        let data = result.data;
        setallOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false)
      }
    }
    fetchOrders()
  }, [])

  let updateOrderStatus = async (orderId, status) => {
    try {
      let result = await axios.put(`http://localhost:5000/api/updateorder`, {
        orderId,
        status
      })
      alert("Order Status Updated Successfully")
      setordId("")
      setordStatus("")
      setisOpen(false)
    } catch (error) {
      console.log(error);
    }
  }

  let columns = [
    {
      accessorKey: "createdAt",
      header: "Order Date",
      Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString()
    },
    {
      accessorKey: "customer.name",
      header: "Customer Name"
    },
    {
      accessorKey: "customer.email",
      header: "Customer Email"
    },
    {
      accessorKey: "status",
      header: "Order Status"
    },
    {
      accessorKey: "totalPrice",
      header: "Order Total"
    },
    {
      accessorFn: (row) => row,
      header: "Actions",
      Cell: ({ cell }) => {
        let row = cell.getValue()
        return (
          <Tooltip title="Update Status">
            <UpgradeIcon
              variant='contained'
              color='primary'
              onClick={() => {
                console.log("DATA", row);
                setisOpen(true)
                setordId(row._id)
              }}
            />
          </Tooltip>
        )
      }
    }
  ]

  let orderTable = useMaterialReactTable({
    columns: columns,
    data: allOrders
  })

  if (isLoading) {
    return (
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant='h5'>Loading...</Typography>
      </Box>
    )
  }

  return (
    <>
      <Box>
        <Typography variant='h5' sx={{
          mt: 10,
          textAlign: 'center'
        }}>Orders</Typography>
      </Box>

      <MaterialReactTable table={orderTable} />

      <Box>
        <Dialog open={isOpen} onClose={() => setisOpen(false)} fullWidth>
          <DialogTitle>Update Status</DialogTitle>
          <DialogContent>
            <FormControl>
              <FormLabel>Order Status</FormLabel>
              <RadioGroup row onChange={(e) => setordStatus(e.target.value)}>
                <FormControlLabel control={<Radio />} value='Confirmed' label='Confirmed' />
                <FormControlLabel control={<Radio />} value='Preparing' label='Preparing' />
                <FormControlLabel control={<Radio />} value='Out-for-delivery' label='Dispatch' />
                <FormControlLabel control={<Radio />} value='Delivered' label='Delivered' />
              </RadioGroup>
            </FormControl>
            <DialogActions>
              <Button onClick={() => {
                updateOrderStatus(ordId, ordStatus)
              }}>
                Update
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  )
}

export default Orders