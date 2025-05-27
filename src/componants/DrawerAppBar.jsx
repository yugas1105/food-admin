import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DrawerAppBar = () => {

    let navigator = useNavigate()
    const [isDrawerOpen, setisDrawerOpen] = useState(false)

    let openDrawer = () => {
        setisDrawerOpen(true)
    }

    let closeDrawer = () => {
        setisDrawerOpen(false)
    }

    return (
        <>
            <Box>
                <AppBar>
                    <Toolbar>
                        <IconButton onClick={() => openDrawer()} edge="start" color="inherit" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>

                        <Drawer open={isDrawerOpen} onClose={closeDrawer}>
                            <Typography variant='h4' sx={{
                                textAlign: 'center',
                                mt: 1.5,
                                fontWeight: 500
                            }}>Food</Typography>

                            <List>

                                <ListItem onClick={() => {
                                    navigator("/")
                                    closeDrawer()
                                }}
                                    sx={{
                                        '&:hover': {
                                            bgcolor: 'lightblue',
                                            transition: '0.3s ease'
                                        },
                                        px: 3
                                    }}
                                >
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText>Dashboard</ListItemText>
                                </ListItem>

                                <ListItem onClick={() => {
                                    navigator("/addDish")
                                    closeDrawer()
                                }}
                                    sx={{
                                        '&:hover': {
                                            bgcolor: 'lightblue',
                                            transition: '0.3s ease'
                                        },
                                        px: 3
                                    }}
                                >
                                    <ListItemIcon>
                                        <AddCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText>Add Dish</ListItemText>
                                </ListItem>

                                <ListItem onClick={() => {
                                    navigator("/alldishes")
                                    closeDrawer()
                                }}
                                    sx={{
                                        '&:hover': {
                                            bgcolor: 'lightblue',
                                            transition: '0.3s ease'
                                        },
                                        px: 3
                                    }}
                                >
                                    <ListItemIcon>
                                        <FastfoodIcon />
                                    </ListItemIcon>
                                    <ListItemText>All Dishes</ListItemText>
                                </ListItem>

                                <ListItem onClick={() => {
                                    navigator("/orders")
                                    closeDrawer()
                                }}
                                    sx={{
                                        '&:hover': {
                                            bgcolor: 'lightblue',
                                            transition: '0.3s ease'
                                        },
                                        px: 3
                                    }}
                                >
                                    <ListItemIcon>
                                        <ShoppingCartIcon />
                                    </ListItemIcon>
                                    <ListItemText>Orders</ListItemText>
                                </ListItem>

                                <ListItem onClick={() => {
                                    navigator("/reviews")
                                    closeDrawer()
                                }}
                                    sx={{
                                        '&:hover': {
                                            bgcolor: 'lightblue',
                                            transition: '0.3s ease'
                                        },
                                        px: 3
                                    }}
                                >
                                    <ListItemIcon>
                                        <ReviewsIcon />
                                    </ListItemIcon>
                                    <ListItemText>Reviews</ListItemText>
                                </ListItem>

                                <ListItem onClick={() => {
                                    navigator("/customers")
                                    closeDrawer()
                                }}
                                    sx={{
                                        '&:hover': {
                                            bgcolor: 'lightblue',
                                            transition: '0.3s ease'
                                        },
                                        px: 3
                                    }}
                                >
                                    <ListItemIcon>
                                        <AccountBoxIcon />
                                    </ListItemIcon>
                                    <ListItemText>Customers</ListItemText>
                                </ListItem>

                            </List>
                        </Drawer>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default DrawerAppBar