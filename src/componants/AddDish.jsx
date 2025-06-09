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
            height: '100%'
          }}
        >
          <Typography variant="h4"
                    align="center"
                    sx={{
                        fontWeight: 700,
                        fontSize: '2rem',
                        background: 'linear-gradient(90deg, #FF9800, #FFC107)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                        mb: 1,
                    }}
          >Add Dish</Typography>

          <TextField
            type='text'
            name='foodname'
            label='Dish Name'
            variant='outlined'
             />
 
          <TextField
            type='text'
            name='description'
            label='Description'
            variant='outlined'
             />

          <TextField
            type='number'
            name='price'
            label='Price'
            variant='outlined'
             />

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
             />

          <Button type='submit' variant='contained' color='warning' 
          sx={{
              borderRadius: '999px',
              textTransform: 'uppercase',
              minWidth: '120px',
              height: '45px',
              fontWeight: 'bold',
              fontSize: '20px',
              background: "#fd8d1d",
              background: "linear-gradient(90deg, rgb(253, 104, 29) 0%, rgb(249, 227, 29) 100%)",
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                translate: "0 6px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
              }
            }}>Add Dish</Button>
        </Box>
        
      </Box>


    </>
  )
}

export default AddDish