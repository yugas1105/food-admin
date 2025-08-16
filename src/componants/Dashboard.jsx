import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ALL_CATEGORIES = ["appetizer", "main-course", "dessert", "beverage"];

const Dashboard = () => {
  const [counterData, setcounterData] = useState({});
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [chartData, setChartData] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/fetchcategoryforchart`
      );
      // Fill missing categories with zero
      const map = new Map(
        res.data.map((item) => [item.category, item.totalAmount])
      );
      const completeData = ALL_CATEGORIES.map((cat) => ({
        category: cat,
        totalAmount: map.get(cat) || 0,
      }));
      setChartData(completeData);
    };
    fetchData();
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

      <Box sx={{ mt: 5 }}>
        <BarChart
          xAxis={[
            {
              id: "category",
              data: chartData.map((item) => item.category),
              label: "Category",
              scaleType: "band",
            },
          ]}
          yAxis={[
            {
              label: "Total ₹ Amount",
            },
          ]}
          series={[
            {
              data: chartData.map((item) => item.totalAmount),
              label: "Delivered ₹ Amount",
              color: "red",
            },
          ]}
          width={700}
          height={450}
          slotProps={{
            bar: {
              barCategoryGap: 0.5, // Default is 0.2 – higher value = more space = thinner bars
              barGap: 0.5, // Space between bars in a group
            },
          }}
        />
      </Box>
    </>
  );
};

export default Dashboard;
