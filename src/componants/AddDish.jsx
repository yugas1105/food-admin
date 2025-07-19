import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Card,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useAlert } from "../custom/CustomAlert";

const AddDish = () => {
  const [selectedImage, setselectedImage] = useState(null);
  const { showAlert } = useAlert();

  let submitDishData = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let reqFormData = Object.fromEntries(formData.entries());
    console.log("FDATA", reqFormData);

    try {
      let result = await axios.post(
        "http://localhost:5000/api/createfood",
        {
          ...reqFormData,
          foodimage: selectedImage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showAlert("Food Saved Successfully", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          overflow: "hidden",
          mt: 10,
          height: "83vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card>
          <Box
            component={"form"}
            onSubmit={submitDishData}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              p: 3,
              height: "100%",
              width: "550px",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 600,
                fontSize: "40px",
                color: "#1CB5E0",
                mb: 1,
              }}
            >
              Add Dish
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                size="small"
                type="text"
                name="foodname"
                label="Dish Name"
                variant="outlined"
              />

              <TextField
                size="small"
                type="number"
                name="price"
                label="Price"
                variant="outlined"
              />
            </Box>
            <TextField
              size="small"
              type="text"
              name="description"
              label="Description"
              variant="outlined"
            />

            <FormControl sx={{ fontSize: 14 }}>
              <FormLabel sx={{ fontSize: 17 }}>Select Category</FormLabel>
              <RadioGroup row name="category" defaultValue="beverage">
                <FormControlLabel
                  label="Appetizer"
                  value="appetizer"
                  control={<Radio sx={{ transform: "scale(0.8)" }} />}
                  sx={{ "& .MuiFormControlLabel-label": { fontSize: 16 } }}
                />
                <FormControlLabel
                  label="Beverage"
                  value="beverage"
                  control={<Radio sx={{ transform: "scale(0.8)" }} />}
                  sx={{ "& .MuiFormControlLabel-label": { fontSize: 16 } }}
                />
                <FormControlLabel
                  label="Main-course"
                  value="main-course"
                  control={<Radio sx={{ transform: "scale(0.8)" }} />}
                  sx={{ "& .MuiFormControlLabel-label": { fontSize: 16 } }}
                />
                <FormControlLabel
                  label="Dessert"
                  value="dessert"
                  control={<Radio sx={{ transform: "scale(0.8)" }} />}
                  sx={{ "& .MuiFormControlLabel-label": { fontSize: 16 } }}
                />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel sx={{ fontSize: 16 }}>Dish Image</FormLabel>
              <TextField
                type="file"
                onChange={(e) => setselectedImage(e.target.files[0])}
                name="foodimage"
                variant="outlined"
              />
            </FormControl>

            <Box
              sx={{ height: "100%", display: "flex", justifyContent: "center",p:2 }}
            >
              <Button
                type="submit"
                variant="contained"
                color="warning"
                sx={{
                  height: "35px",
                  width: "150px",
                  fontSize: "13px",
                  background: "linear-gradient(to right, #1CB5E0, #000851)",
                  color: "#fff",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "linear-gradient(to right, #1a91da, #000544)",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  },
                }}
              >
                Add Dish
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default AddDish;
