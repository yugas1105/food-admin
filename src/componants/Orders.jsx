import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { useEffect, useState } from "react";
import { useAlert } from "../custom/CustomAlert";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BillPDF from "../template/BillPDF";

//Update Order Status Dialog Admin
//fetch orders using axios and material-react-table
const Orders = () => {
  const [allOrders, setallOrders] = useState([]);
  const { showAlert } = useAlert();
  const [isLoading, setisLoading] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [ordStatus, setordStatus] = useState("");
  const [ordId, setordId] = useState("");

  useEffect(() => {
    let fetchOrders = async () => {
      setisLoading(true);
      try {
        let result = await axios.get(`http://localhost:5000/api/fetchorder`);
        let data = result.data;
        setallOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    };
    fetchOrders();
  }, []);

  let updateOrderStatus = async (orderId, status) => {
    try {
      let result = await axios.put(`http://localhost:5000/api/updateorder`, {
        orderId,
        status,
      });
      showAlert("Order Status Updated Successfully", "success");
      setordId("");
      setordStatus("");
      setisOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  let columns = [
    {
      header: "Sr No.",
      accessorFn: (row, index) => index + 1,
      id: "rowNumber",
      size: 25, // very small width
      maxSize: 30, // restricts it from expanding
      enableSorting: false,
      enableColumnResizing: false, // optional: lock column width
      Cell: ({ cell }) => (
        <div style={{ textAlign: "center" }}>{cell.getValue()}</div>
      ),
      Header: () => <div style={{ textAlign: "center" }}>Sr No.</div>, // optional short header
    },

    {
      accessorKey: "createdAt",
      header: "Order Date",
      Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
    },
    {
      header: "Customer Name",
      accessorFn: (row) => row.customer?.name || "N/A",
    },
    // {
    //   accessorKey: "customer.email",
    //   header: "Customer Email",
    // },
    {
      accessorKey: "status",
      header: "Order Status",
    },
    {
      accessorKey: "totalPrice",
      header: "Order Total",
    },
    {
      accessorFn: (row) => row,
      header: "Actions",
      Cell: ({ cell }) => {
        let row = cell.getValue();
        return (
          <Tooltip title="Update Status">
            <UpgradeIcon
              variant="contained"
              color="primary"
              onClick={() => {
                console.log("DATA", row);
                setisOpen(true);
                setordId(row._id);
              }}
            />
          </Tooltip>
        );
      },
    },
    {
      accessorFn: (row) => row,
      header: "Bills",
      Cell: ({ cell }) => {
        let row = cell.getValue();
        console.log("ORDER ROW", row);
        return (
          <PDFDownloadLink
            fileName={`invoice_${row.customer?.name || "customer"}.pdf`}
            document={<BillPDF order={row} />}
          >
            {({ loading }) => (loading ? "Generating..." : "Print")}
          </PDFDownloadLink>
        );
      },
    },
  ];

  let orderTable = useMaterialReactTable({
    columns: columns,
    data: allOrders,
    enablePagination: false,

    // Optional: style header cells
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#1976d2",
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: "1rem",
      },
    },

    muiTableBodyRowProps: () => ({
      sx: {
        height: 36, // Reduce height
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      },
    }),

    muiTableBodyCellProps: {
      sx: {
        whiteSpace: "normal",
        wordBreak: "break-word",
        fontSize: "0.85rem", // smaller font
        padding: "4px 8px", // reduced padding
        verticalAlign: "middle",
      },
    },
  });

  if (isLoading) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

  return (
    <>
      {/* <Box>
        <Typography
          variant="h5"
          sx={{
            mt: 10,
            textAlign: "center",
          }}
        >
          Orders
        </Typography>
      </Box> */}

      <Box sx={{ mt: 2 }}>
        <MaterialReactTable table={orderTable} />
      </Box>

      <Box>
        <Dialog open={isOpen} onClose={() => setisOpen(false)} fullWidth>
          <DialogTitle>Update Status</DialogTitle>
          <DialogContent>
            <FormControl>
              <FormLabel>Order Status</FormLabel>
              <RadioGroup row onChange={(e) => setordStatus(e.target.value)}>
                <FormControlLabel
                  control={<Radio />}
                  value="Confirmed"
                  label="Confirmed"
                />
                <FormControlLabel
                  control={<Radio />}
                  value="Preparing"
                  label="Preparing"
                />
                <FormControlLabel
                  control={<Radio />}
                  value="Out-for-delivery"
                  label="Dispatch"
                />
                <FormControlLabel
                  control={<Radio />}
                  value="Delivered"
                  label="Delivered"
                />
              </RadioGroup>
            </FormControl>
            <DialogActions>
              <Button onClick={() => updateOrderStatus(ordId, ordStatus)}>
                Update
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default Orders;
