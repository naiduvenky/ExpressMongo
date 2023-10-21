import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    // Show the logout confirmation dialog
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    // Perform logout and close the dialog
    dispatch(logoutUser(null));
    setLogoutDialogOpen(false);
  };

  const cancelLogout = () => {
    // Cancel logout and close the dialog
    setLogoutDialogOpen(false);
  };

  const activeLinkStyle = {
    color: 'yellow',
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/">
          Productivity Tracker
        </Typography>
        <div style={{ flexGrow: 1 }}></div>
        <>
          <Button color="inherit" component={Link} to="/userProfile">
            User Profile
          </Button>
          <Button color="inherit" component={Link} to="/productivity">
            Productivity
          </Button>
          {isAuthenticated && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </>
      </Toolbar>
      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onClose={cancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
