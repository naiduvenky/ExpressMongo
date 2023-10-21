import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Paper, Typography, Button, Box } from '@mui/material';
import UserProfileForm from './UserProfileForm';

const UserProfilePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.token);
  const [userData, setUserData] = useState(null);
  const [addProfileDialogOpen, setAddProfileDialogOpen] = useState(false);

  const openAddProfileDialog = () => {
    setAddProfileDialogOpen(true);
  };

  const closeAddProfileDialog = () => {
    setAddProfileDialogOpen(false);
  };

  const handleAddProfile = (newProfileData) => {
    axios
      .post('http://localhost:4000/userProfile', newProfileData, {
        headers: {
          Authorization: isAuthenticated,
        },
      })
      .then((response) => {
        console.log('User profile added successfully:', response.data);
        closeAddProfileDialog();
        fetchUserProfile();
      })
      .catch((error) => {
        console.error('Error adding user profile:', error);
      });
  };

  const handleDeleteProfile = (id) => {
    axios
      .delete(`http://localhost:4000/userProfile/${id}`, {
        headers: {
          Authorization: isAuthenticated,
        },
      })
      .then(() => {
        console.log('User profile deleted successfully');
        fetchUserProfile();
      })
      .catch((error) => {
        console.error('Error deleting user profile:', error);
      });
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:4000/userProfile', {
        headers: {
          Authorization: isAuthenticated,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [isAuthenticated]);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>User Profile Page</h2>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
        {userData ? (
          <>
            <Typography variant="body1">
              <strong>Mobile Number:</strong> {userData.mobileNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {userData.address}
            </Typography>
            <Typography variant="body1">
              <strong>City:</strong> {userData.city}
            </Typography>
            <Typography variant="body1">
              <strong>State:</strong> {userData.state}
            </Typography>
            <Typography variant="body1">
              <strong>Country:</strong> {userData.country}
            </Typography>
            <Typography variant="body1">
              <strong>Aadhar Number:</strong> {userData.adharNumber}
            </Typography>
            <Button variant="contained" color="secondary" onClick={() => handleDeleteProfile(userData.id)}>
              Delete Profile
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={openAddProfileDialog}>
            Add Profile
          </Button>
        )}
      </Paper>
      <UserProfileForm
        open={addProfileDialogOpen}
        onClose={closeAddProfileDialog}
        onAddProfile={handleAddProfile}
      />
    </div>
  );
};

export default UserProfilePage;
