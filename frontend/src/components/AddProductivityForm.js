// AddProductivityForm.js

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useSelector } from "react-redux";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import {AdapterDateFns}  from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


const AddProductivityForm = ({ open, onClose, onAddProductivity, getProductivityData }) => {
    const isAuthenticated = useSelector(
        (state) => state.auth.token
      );

  const [rows, setRows] = useState([{ subject: '', timing: '' }]);
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [loading, setLoading] = useState(false);

  const handleAddRow = () => {
    const newRow = { subject: '', timing: '' };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleSubmit = async () => {
    setLoading(true);
  
    // Extract subjects and timings from the rows
    const subjects = rows.map((row) => row.subject.trim());
    const timingStrings = rows.map((row) => row.timing.trim());
    const timings = timingStrings.map((timingStr) => Number(timingStr));
  
    // Validate data (you can add more validation logic as needed)
  
    if (subjects.some((subject) => subject === '') || timings.some((timing) => isNaN(timing))) {
      alert('Please fill in all subjects and provide valid timings.');
      setLoading(false);
      return;
    }
  
    // Construct the payload
    const payload = {
      dateOfEntry: selectedDate.toISOString(), 
      subjects,
      timing: timings,
    };
  
    // Make a network call to add productivity data (replace with your actual API URL)
    try {
      // Add your network call here with authorization headers
      const response = await axios.post('http://localhost:4000/userProductivity', payload, {
        headers: {
          Authorization: isAuthenticated, // Replace with your actual authorization token
        },
      });
  
      const endDate = new Date(); // Current date
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7); 
      endDate.setDate(endDate.getDate() + 2); 
      // One week ago
      const startDateString = startDate.toISOString().split("T")[0];
      const endDateString = endDate.toISOString().split("T")[0];
      await getProductivityData(startDateString, endDateString);

      // After a successful network call, you can close the modal and reset the form
      onAddProductivity(payload);
      setLoading(false);
      setRows([{ subject: '', timing: '' }]); // Reset the form
  
      // Display a beautiful alert upon successful addition
      alert('Productivity data added successfully!'); // Customize the alert as needed
    } catch (error) {
      console.error('Error adding productivity data:', error);
      setLoading(false);
      // You can also display an error alert here if needed
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Productivity</DialogTitle>
      <DialogContent>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DemoContainer components={['DateTimePicker']}>
      <DateTimePicker
            label="Date and Time"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
          />
      </DemoContainer>
    </LocalizationProvider>
     
  
        {rows.map((row, index) => (
          <Grid container spacing={2} alignItems="center" key={index}>
            <Grid item xs={5}>
              <TextField
                label="Subject"
                fullWidth
                variant="outlined"
                value={row.subject}
                onChange={(e) => {
                  const updatedRows = [...rows];
                  updatedRows[index].subject = e.target.value;
                  setRows(updatedRows);
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Timing (minutes)"
                fullWidth
                variant="outlined"
                value={row.timing}
                onChange={(e) => {
                  const updatedRows = [...rows];
                  updatedRows[index].timing = e.target.value;
                  setRows(updatedRows);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => handleRemoveRow(index)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button variant="outlined" onClick={handleAddRow}>
          Add Row
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? 'Adding...' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductivityForm;
