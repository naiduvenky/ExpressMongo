import React, { useState } from "react";
import ProductList from "./ProductList";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import AddProductivityForm from "./AddProductivityForm";
import ChartComponent from "./ChartComponent"; // Import the chart component
import axios from "axios";
import { useSelector } from "react-redux";

const ProductivityPage = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isChartOpen, setChartOpen] = useState(false); // State for chart modal
  const [data, setData] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.token);

  const getProductivityData = async (startDate, endDate) => {
    const apiUrl = "http://localhost:4000/userProductivity/records";

    // Make a GET request to fetch data from the API with headers
    axios
      .get(apiUrl, {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
        headers: {
          Authorization: isAuthenticated,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleOpenForm = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  const handleOpenChart = () => {
    setChartOpen(true);
  };

  const handleCloseChart = () => {
    setChartOpen(false);
  };

  const handleAddProductivity = (data) => {
    // Handle the added productivity data here (e.g., update the list)
    console.log("Added productivity data:", data);

    // Close the form modal
    setFormOpen(false);
  };

  return (
    <div>
      <h2>Productivity Page</h2>
      <Button variant="outlined" onClick={handleOpenForm}>
        Add Productivity
      </Button>
      <Button variant="outlined" onClick={handleOpenChart}>
        Show Chart
      </Button>
      <ProductList data={data} getProductivityData={getProductivityData} />
      <AddProductivityForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onAddProductivity={handleAddProductivity}
        getProductivityData={getProductivityData}
      />
      <Dialog open={isChartOpen} onClose={handleCloseChart} fullWidth maxWidth="md">
        <DialogTitle>Productivity Chart</DialogTitle>
        <DialogContent>
          <ChartComponent data={data} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChart} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductivityPage;

