import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

const AddDish = () => {

  const [selectedImage, setselectedImage] = useState(null)

  let submitDishData = async (e) => {
    e.preventDefault()
    let formData = new FormData(e.target);
    let reqFormData = Object.fromEntries(formData.entries());
    console.log("FDATA", reqFormData);

    try {
      let result = await axios.post("http://localhost:5000/api/createfood", {
        ...reqFormData, foodimage: selectedImage
      }, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      )
      alert("Food Saved Successfully")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      <Box sx={{
        height: '85vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        mt: 9
      }}>


        <Box
          component={"form"}
          onSubmit={submitDishData}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            p: 3,
            boxShadow: 3,
            borderRadius: 2
          }}
        >
          <Typography variant='h5' sx={{ textAlign: 'center' }}>Add Dish</Typography>

          <TextField
            type='text'
            name='foodname'
            label='Dish Name'
            variant='outlined'
            fullWidth />

          <TextField
            type='text'
            name='description'
            label='Description'
            variant='outlined'
            fullWidth />

          <TextField
            type='number'
            name='price'
            label='Price'
            variant='outlined'
            fullWidth />

          <FormControl>
            <FormLabel>Select Category</FormLabel>
            <RadioGroup row name='category' defaultValue='beverage'>
              <FormControlLabel label="Appetizer" value="appetizer" control={<Radio />} />
              <FormControlLabel label="Beverage" value="beverage" control={<Radio />} />
              <FormControlLabel label="Main-course" value="main-course" control={<Radio />} />
              <FormControlLabel label="Dessert" value="dessert" control={<Radio />} />
            </RadioGroup>
          </FormControl>

          <TextField
            type='file'
            onChange={(e) => setselectedImage(e.target.files[0])}
            name="foodimage"
            label='Dish Image'
            variant='outlined'
            fullWidth />

          <Button type='submit' variant='contained' color='warning' sx={{
            mt: 2
          }}>Add Dish</Button>
        </Box>
        
      </Box>


    </>
  )
}

export default AddDish