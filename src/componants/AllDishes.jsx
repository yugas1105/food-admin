import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "../custom/CustomAlert";

const AllDishes = () => {
  const [allDishes, setallDishes] = useState([]);
  const { showAlert } = useAlert();
  const [selectedCategory, setselectedCategory] = useState("All");
  const [filterDishes, setfilterDishes] = useState([]);
  const [isOpenDialog, setisOpenDialog] = useState(false);
  const [selectedDish, setselectedDish] = useState(null);
  const [newPrice, setnewPrice] = useState(0);

  useEffect(() => {
    let fetchDishes = async () => {
      try {
        let result = await axios.get("http://localhost:5000/api/fetchfood");
        console.log("DATA", result.data.data);
        setallDishes(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDishes();
  }, []);

  useEffect(() => {
    let filterDish = allDishes.filter(
      (dish) => dish.category == selectedCategory
    );
    setfilterDishes(filterDish);

    if (selectedCategory == "All") {
      setfilterDishes(allDishes);
    }
  }, [selectedCategory, allDishes]);

  let openDialog = (Dish) => {
    setselectedDish(Dish);
    setisOpenDialog(true);
  };

  let closeDialog = () => {
    setselectedDish(null);
    setisOpenDialog(false);
  };

  let updateDishreq = async () => {
    try {
      let result = await axios.put("http://localhost:5000/api/updatefood", {
        price: newPrice,
        foodId: selectedDish._id,
      });
      closeDialog();
      setnewPrice(0);
      setselectedDish(null);
      showAlert("Dish Updated Successfully", "success");
    } catch (error) {
      console.log(error);
    }
  };

  let deleteDishreq = async (dishId) => {
    try {
      let result = await axios.delete("http://localhost:5000/api/deletefood", {
        data: { foodId: dishId },
      });
      closeDialog();
      setnewPrice(0);
      setselectedDish(null);
      showAlert("Dish Deleted Successfully", "error");
    } catch (error) {
      console.log(error);
    }
  };

  const chipStyle = (category) => ({
    backgroundColor: selectedCategory === category ? "#1CB5E0" : "transparent",
    color: selectedCategory === category ? "#fff" : "inherit",
    borderColor: "#1CB5E0",
    fontSize: "13px",
    "&:hover": {
      backgroundColor:
        selectedCategory === category ? "#1CB5E0" : "rgba(255,167,38,0.1)",
    },
  });

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

        <Grid container sx={{ margin: "14px 20px 15px 20px" }}>
          {filterDishes.map((dish) => (
            <Grid
              item
              size={{
                sm: 12,
                md: 6,
                lg: 3,
              }}
              key={dish._id}
            >
              <Box sx={{ padding: "3px" }}>
                <Card sx={{ height: "400px"}}>
                  <CardMedia
                    component="img"
                    image={`http://localhost:5000/${dish.image}`}
                    alt={dish.foodname}
                    sx={{ height: "200px" }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {dish.foodname}
                    </Typography>
                    <Typography variant="subtitle2">₹{dish.price}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {dish.category}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0px 10px 5px 10px",
                      }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        color="info"
                        onClick={() => openDialog(dish)}
                        sx={{
                          height: "35px",
                          width: "150px",
                          fontSize: "13px",
                          background:
                            "linear-gradient(to right, #1CB5E0, #000851)",
                          color: "#fff",
                          textTransform: "capitalize",
                          "&:hover": {
                            background:
                              "linear-gradient(to right, #1a91da, #000544)",
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                          },
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        size="100px"
                        variant="contained"
                        color="error"
                        onClick={() => deleteDishreq(dish._id)}
                        sx={{
                          height: "35px",
                          width: "100px",
                          fontSize: "12px",
                          backgroundColor: "brownred",
                          "&:hover": { backgroundColor: "darkred" },
                        }}
                      >
                        DELETE
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={isOpenDialog} onClose={closeDialog}>
        <DialogTitle>Update Food Details</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedDish?.foodname}</DialogContentText>

          <DialogContentText>{selectedDish?.description}</DialogContentText>

          <DialogContentText>{selectedDish?.price}</DialogContentText>

          <DialogContentText sx={{ mb: 1 }}>
            {selectedDish?.category}
          </DialogContentText>

          <TextField
            type="number"
            name="price"
            label="Enter New Price"
            variant="outlined"
            value={newPrice}
            onChange={(e) => setnewPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            onClick={() => updateDishreq()}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => closeDialog()}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllDishes;
