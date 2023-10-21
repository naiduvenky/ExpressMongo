import React, { useState, useEffect } from "react";
import styles from "./ProductList.module.css";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import UpdateProductivityForm from "./UpdateProductivityForm";

const ProductList = ({ data, getProductivityData }) => {
  const [loading, setLoading] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.token);
  const [updateData, setUpdateData] = useState({})

  const handleEditClick = (item) => {
    setSelectedItemId(item.id);
    setIsEditFormOpen(true);
    setUpdateData(item)
  };

  const handleDeleteClick = (id) => {
    setSelectedItemId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/userProductivity/${selectedItemId}`, {
        headers: {
          Authorization: isAuthenticated,
        },
      });

      if (response.status === 204) {
        getData();
        alert("Record deleted successfully");
      } else {
        console.error("Error deleting record. Status code: " + response.status);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }

    setDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setSelectedItemId(null);
    setDeleteConfirmationOpen(false);
  };

  const getData = async () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    endDate.setDate(endDate.getDate() + 2);
    const startDateString = startDate.toISOString().split("T")[0];
    const endDateString = endDate.toISOString().split("T")[0];
    await getProductivityData(startDateString, endDateString);
  };

  useEffect(() => {
    const fetchData = async () => {
      getData();
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer
              component={Paper}
              className={styles.tableContainer}
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <Table className={styles.table}>
                <TableHead className={styles.tableHeader}>
                  <TableRow className={styles.tableHeader}>
                    <TableCell>Date</TableCell>
                    <TableCell>Subjects</TableCell>
                    <TableCell>Timing (min)</TableCell>
                    <TableCell>Productivity</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.dateOfEntry}</TableCell>
                      <TableCell>{item.subjects.join(", ")}</TableCell>
                      <TableCell>{item.timing.join(", ")}</TableCell>
                      <TableCell>{item.productivity}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleEditClick(item)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDeleteClick(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}

      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {isEditFormOpen && (
        <UpdateProductivityForm
          open={isEditFormOpen}
          onClose={() => setIsEditFormOpen(false)}
          onUpdateProductivity={(updateData) => {
            // Handle the updated data here if needed
            // For example, update the data in your state or trigger a data refresh
            setIsEditFormOpen(false); // Close the form after successful update
          }}
          getProductivityData={getProductivityData}
          initialData={updateData}
        />
      )}
    </div>
  );
};

export default ProductList;
