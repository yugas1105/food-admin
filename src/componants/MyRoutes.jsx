import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import AddDish from './AddDish'
import AllDishes from './AllDishes'
import Orders from './Orders'
import Reviews from './Reviews'
import Customers from './Customers'

const MyRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/addDish' element={<AddDish />} />
                <Route path='/alldishes' element={<AllDishes />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/reviews' element={<Reviews />} />
                <Route path='/customers' element={<Customers />} />
            </Routes>
        </>
    )
}

export default MyRoutes