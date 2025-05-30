import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AllDishes = () => {
  let [allDishes, setallDishes] = useState([])
  const [selectedCategory, setselectedCategory] = useState("All");
  const [filterDishes, setfilterDishes] = useState([])
  const [isOpenDialog, setisOpenDialog] = useState(false)
  const [selectedDish, setselectedDish] = useState(null)

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

  return (
    <>
      <Box sx={{ mt: 11 }}>

        <Stack sx={{ justifyContent: "center" }} direction="row" spacing={2}>
          <Chip
            label="All"
            onClick={() => setselectedCategory("All")}
            color={selectedCategory === "All" ? "info" : "default"}
            variant={selectedCategory === "All" ? "filled" : "outlined"}
          />
          <Chip
            label="Appetizer"
            onClick={() => setselectedCategory("appetizer")}
            color={selectedCategory === "appetizer" ? "info" : "default"}
            variant={selectedCategory === "appetizer" ? "filled" : "outlined"}
          />
          <Chip
            label="Dessert"
            onClick={() => setselectedCategory("dessert")}
            color={selectedCategory === "dessert" ? "info" : "default"}
            variant={selectedCategory === "dessert" ? "filled" : "outlined"}
          />
          <Chip
            label="Beverage"
            onClick={() => setselectedCategory("beverage")}
            color={selectedCategory === "beverage" ? "info" : "default"}
            variant={selectedCategory === "beverage" ? "filled" : "outlined"}
          />
          <Chip
            label="Main-course"
            onClick={() => setselectedCategory("main-course")}
            color={selectedCategory === "main-course" ? "info" : "default"}
            variant={selectedCategory === "main-course" ? "filled" : "outlined"}
          />
        </Stack>

        <Grid container sx={{ gap: 2, mt: 2 }}>
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
                      image={`http://localhost:5000/${dish.image}`} />
                    <CardContent>
                      <Typography variant='h4'>{dish.foodname}</Typography>
                      <Typography variant='body2'>{dish.description}</Typography>
                      <Typography variant='subtitle1'>{dish.price}</Typography>
                      <Typography variant='caption'>{dish.category}</Typography>
                      {/* <Typography variant='caption'>{dish.image}</Typography> */}
                    </CardContent>
                    <CardActions>
                      <Button variant='contained' color='secondary' onClick={() => openDialog(dish)}>Update</Button>
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
        <DialogContent>
          <DialogContentText>
            {selectedDish?.foodname}
          </DialogContentText>
          <DialogContentText>
            {selectedDish?.description}
          </DialogContentText>
          <DialogContentText>
            {selectedDish?.price}
          </DialogContentText>
          <DialogContentText>
            {selectedDish?.category}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={() => closeDialog()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AllDishes