import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DrawerAppBar = () => {
  let navigator = useNavigate();
  const [isDrawerOpen, setisDrawerOpen] = useState(false);

  let openDrawer = () => {
    setisDrawerOpen(true);
  };

  let closeDrawer = () => {
    setisDrawerOpen(false);
  };

  return (
    <>
      <Box>
        <AppBar position="fixed" color="warning" sx={{ background: "#0B0B45" }}>
          <Toolbar>
            <IconButton
              onClick={() => openDrawer()}
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <MenuIcon sx={{fontSize:28}}/>
            </IconButton>

            <Typography variant="h5">Admin Dashboard</Typography>

            <Drawer open={isDrawerOpen} onClose={closeDrawer}>
              <Typography
                variant="h5"
                sx={{
                  mt: 2,
                  ml: 4,
                  mb:2,
                  fontWeight: 800,
                  fontSize: 40,
                  color:"#0B0B45"
                }}
              >
                Food
              </Typography>

              <Divider></Divider>

              <Box sx={{ ml: 1 }}>
                <List
                  sx={{
                    width: 240,
                    ml: 1,
                    mt: 2,
                  }}
                >
                  <ListItem
                    onClick={() => {
                      navigator("/");
                      closeDrawer();
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "32px" }}>
                      <DashboardIcon sx={{ fontSize: 17, color: "#999" }} />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 17 }}
                      sx={{
                        color: "#999",
                        fontSize: 20,
                        "&:hover": {
                          color: "black",
                          transition: "0.3s ease",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Dashboard
                    </ListItemText>
                  </ListItem>

                  <ListItem
                    onClick={() => {
                      navigator("/addDish");
                      closeDrawer();
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "32px" }}>
                      <AddCircleIcon sx={{ fontSize: 17, color: "#999" }} />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 17 }}
                      sx={{
                        color: "#999",
                        "&:hover": {
                          color: "black",
                          transition: "0.3s ease",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Add Dish
                    </ListItemText>
                  </ListItem>

                  <ListItem
                    onClick={() => {
                      navigator("/alldishes");
                      closeDrawer();
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "32px" }}>
                      <FastfoodIcon sx={{ fontSize: 17, color: "#999" }} />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 17 }}
                      sx={{
                        color: "#999",
                        "&:hover": {
                          color: "black",
                          transition: "0.3s ease",
                          cursor: "pointer",
                        },
                      }}
                    >
                      All Dishes
                    </ListItemText>
                  </ListItem>

                  <ListItem
                    onClick={() => {
                      navigator("/orders");
                      closeDrawer();
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "32px" }}>
                      <ShoppingCartIcon sx={{ fontSize: 17, color: "#999" }} />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 17 }}
                      sx={{
                        color: "#999",
                        "&:hover": {
                          color: "black",
                          transition: "0.3s ease",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Orders
                    </ListItemText>
                  </ListItem>

                  <ListItem
                    onClick={() => {
                      navigator("/reviews");
                      closeDrawer();
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "32px" }}>
                      <ReviewsIcon sx={{ fontSize: 17, color: "#999" }} />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 17 }}
                      sx={{
                        color: "#999",
                        "&:hover": {
                          color: "black",
                          transition: "0.3s ease",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Reviews
                    </ListItemText>
                  </ListItem>

                  <ListItem
                    onClick={() => {
                      navigator("/customers");
                      closeDrawer();
                    }}
                    sx={{ maxWidth: "20px" }}
                  >
                    <ListItemIcon sx={{ minWidth: "32px" }}>
                      <AccountBoxIcon sx={{ fontSize: 17, color: "#999" }} />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 17 }}
                      sx={{
                        color: "#999",
                        "&:hover": {
                          color: "black",
                          transition: "0.3s ease",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Customers
                    </ListItemText>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default DrawerAppBar;
