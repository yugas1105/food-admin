import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AllDishes = () => {
  let [allDishes, setallDishes] = useState([])
  const [selectedCategory, setselectedCategory] = useState("All");
  const [filterDishes, setfilterDishes] = useState([])
  const [isOpenDialog, setisOpenDialog] = useState(false)
  const [selectedDish, setselectedDish] = useState(null)
  const [newPrice, setnewPrice] = useState(0)

  useEffect(() => {
    let fetchDishes = async () => {
      try {
        let result = await axios.get("http://localhost:5000/api/fetchfood")
        console.log("DATA", result.data.data);
        setallDishes(result.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchDishes()
  }, [])

  useEffect(() => {
    let filterDish = allDishes.filter((dish) => dish.category == selectedCategory)
    setfilterDishes(filterDish)

    if (selectedCategory == "All") {
      setfilterDishes(allDishes)
    }
  }, [selectedCategory, allDishes])


  let openDialog = (Dish) => {
    setselectedDish(Dish)
    setisOpenDialog(true)
  }

  let closeDialog = () => {
    setselectedDish(null)
    setisOpenDialog(false)
  }

  let updateDishreq = async () => {
    try {
      let result = await axios.put('http://localhost:5000/api/updatefood',
        { price: newPrice, foodId: selectedDish._id })
      closeDialog()
      setnewPrice(0)
      setselectedDish(null)
      alert("Dish Updated Successfully")
    } catch (error) {
      console.log(error);
    }

  }

  let deleteDishreq = async (dishId) => {
    try {
      let result = await axios.delete('http://localhost:5000/api/deletefood',
        {
          data: { foodId: dishId }
        })
      closeDialog()
      setnewPrice(0)
      setselectedDish(null)
      alert("Dish Deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  }

  const chipStyle = (category) => ({
    backgroundColor: selectedCategory === category ? "#ffa726" : "transparent",
    color: selectedCategory === category ? "#fff" : "inherit",
    borderColor: "#ffa726",
    '&:hover': {
      backgroundColor: selectedCategory === category ? "#fb8c00" : "rgba(255,167,38,0.1)"
    }
  })

  return (
    <>
      <Box sx={{ mt: 11 }}>

        <Stack sx={{ justifyContent: "center" }} direction="row" spacing={2}>
          <Chip
            label="All"
            onClick={() => setselectedCategory("All")}
            variant={selectedCategory === "All" ? "filled" : "outlined"}
            sx={chipStyle("All")}
          />
          <Chip
            label="Appetizer"
            onClick={() => setselectedCategory("appetizer")}
            variant={selectedCategory === "appetizer" ? "filled" : "outlined"}
            sx={chipStyle("appetizer")}
          />
          <Chip
            label="Dessert"
            onClick={() => setselectedCategory("dessert")}
            variant={selectedCategory === "dessert" ? "filled" : "outlined"}
            sx={chipStyle("dessert")}
          />
          <Chip
            label="Beverage"
            onClick={() => setselectedCategory("beverage")}
            variant={selectedCategory === "beverage" ? "filled" : "outlined"}
            sx={chipStyle("beverage")}
          />
          <Chip
            label="Main-course"
            onClick={() => setselectedCategory("main-course")}
            variant={selectedCategory === "main-course" ? "filled" : "outlined"}
            sx={chipStyle("main-course")}
          />
        </Stack>

        <Grid container sx={{ mt: 1 }}>
          {
            filterDishes.map((dish) => {
              return (
                <Grid item size={{
                  sm: 12,
                  md: 6,
                  lg: 3
                }}
                >

                  <Card>
                    <CardMedia component="img"
                      image={`http://localhost:5000/${dish.image}`}
                      sx={{
                        height: '200px',

                      }} />
                    <CardContent>
                      <Typography variant='h5'>{dish.foodname}</Typography>
                      {/* <Typography variant='body2'>{dish.description}</Typography> */}
                      <Typography variant='subtitle1'>{dish.price}</Typography>
                      <Typography variant='caption'>{dish.category}</Typography>
                      {/* <Typography variant='caption'>{dish.image}</Typography> */}
                    </CardContent>
                    <CardActions>
                      <Button variant='contained' color='secondary' onClick={() => openDialog(dish)}>Update</Button>
                      <Button variant='contained' color='warning' onClick={() => {
                        deleteDishreq(dish._id)
                      }}>Delete</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })

          }
        </Grid>
      </Box>

      <Dialog open={isOpenDialog} onClose={closeDialog}>
        <DialogTitle>Update Food Details</DialogTitle>
        <DialogContent >

          <DialogContentText>
            {selectedDish?.foodname}
          </DialogContentText>

          <DialogContentText>
            {selectedDish?.description}
          </DialogContentText>

          <DialogContentText>
            {selectedDish?.price}
          </DialogContentText>

          <DialogContentText sx={{ mb: 1 }}>
            {selectedDish?.category}
          </DialogContentText>

          <TextField
            type='number'
            name='price'
            label='Enter New Price'
            variant='outlined'
            value={newPrice}
            onChange={(e) => setnewPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={() => updateDishreq()}>Update</Button>
          <Button variant='contained' color='error' onClick={() => closeDialog()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AllDishes