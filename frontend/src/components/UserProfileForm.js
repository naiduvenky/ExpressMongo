import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const UserProfileForm = ({ open, onClose, onAddProfile }) => {
  const [newProfileData, setNewProfileData] = useState({
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    adharNumber: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setNewProfileData({
      ...newProfileData,
      [name]: value,
    });
  };

  const validateProfileData = () => {
    const errors = {};

    if (!newProfileData.mobileNumber) {
      errors.mobileNumber = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(newProfileData.mobileNumber)) {
      errors.mobileNumber = 'Mobile Number must be 10 digits';
    }

    // Add more validations as needed

    return errors;
  };

  const handleSubmitProfile = () => {
    const errors = validateProfileData();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    onAddProfile(newProfileData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add User Profile</DialogTitle>
      <DialogContent>
        <TextField
          name="mobileNumber"
          label="Mobile Number"
          variant="outlined"
          value={newProfileData.mobileNumber}
          onChange={handleProfileChange}
          error={!!validationErrors.mobileNumber}
          helperText={validationErrors.mobileNumber}
          required
        />
        <TextField
          name="address"
          label="Address"
          variant="outlined"
          value={newProfileData.address}
          onChange={handleProfileChange}
        />
        <TextField
          name="city"
          label="City"
          variant="outlined"
          value={newProfileData.city}
          onChange={handleProfileChange}
        />
        <TextField
          name="state"
          label="State"
          variant="outlined"
          value={newProfileData.state}
          onChange={handleProfileChange}
        />
        <TextField
          name="country"
          label="Country"
          variant="outlined"
          value={newProfileData.country}
          onChange={handleProfileChange}
        />
        <TextField
          name="adharNumber"
          label="Aadhar Number"
          variant="outlined"
          value={newProfileData.adharNumber}
          onChange={handleProfileChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmitProfile} color="primary">
          Add Profile
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfileForm;
