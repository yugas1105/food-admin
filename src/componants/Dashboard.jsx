import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [counterData, setcounterData] = useState({});
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    let fetchCounterData = async () => {
      try {
        let result = await axios.get(`http://localhost:5000/api/fetchcounter`);
        setcounterData(result.data.data);
      } catch (error) {
        console.log(error);
      }
      // Get total revenue
      const revenueRes = await axios.get(
        "http://localhost:5000/api/fetchrevenue"
      );
      setTotalRevenue(revenueRes.data?.data[0]?.totalRevenue || 0);
    };
    fetchCounterData();
  }, []);

 
  const boxStyle = {
    // border: '2px solid #ddd',
    borderRadius: "16px",
    padding: 4, // more padding
    minWidth: "200px", // increased width
    minHeight: "120px", // increased height
    textAlign: "center",
    boxShadow: 4, // stronger shadow
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      <Box
        sx={{
          mt: 8,
          display: "flex",
          gap: 4,
          padding: 5,
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            ...boxStyle,
            backgroundImage:
              "linear-gradient( 109.6deg,  rgba(75,228,255,1) 11.2%, rgba(188,204,251,1) 100.6% )",
          }}
        >
          <Typography variant="body1">Total Revenue</Typography>
          <Typography variant="h4">₹{totalRevenue}</Typography>
        </Box>

        <Box
          sx={{
            ...boxStyle,
            backgroundImage:
              "linear-gradient( 89.2deg,  rgba(255,255,255,1) -1.3%, rgba(253,109,38,1) 281.6% )",
          }}
        >
          <Typography variant="body1">Total Customers</Typography>
          <Typography variant="h4">{counterData.customerCounter}</Typography>
        </Box>

        <Box
          sx={{
            ...boxStyle,
            backgroundImage:
              "radial-gradient( circle farthest-corner at 10% 20%,  rgba(235,183,241,1) 17.3%, rgba(228,145,235,1) 90% )",
          }}
        >
          <Typography variant="body1">Total Dishes</Typography>
          <Typography variant="h4">{counterData.foodCounter}</Typography>
        </Box>

        <Box
          sx={{
            ...boxStyle,
            backgroundImage:
              "linear-gradient( 359.5deg,  rgba(115,122,205,1) 8.8%, rgba(186,191,248,1) 77.4% )",
          }}
        >
          <Typography variant="body1">Total Orders</Typography>
          <Typography variant="h4">{counterData.orderCounter}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
