import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import ConfirmationDialog from "./ConfirmationDialog";

const SignOutButton = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const openSignOutDialog = () => {
    setOpenDialog(true);
  };

  const closeSignOutDialog = () => {
    setOpenDialog(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth");
  };

  return (
    <div>
      <Box>
        <Button variant="contained" color="error" onClick={openSignOutDialog}>
          Sign Out
        </Button>
        <ConfirmationDialog
          open={openDialog}
          onClose={closeSignOutDialog}
          onConfirm={handleSignOut}
          title="Sign Out"
          content="Are you sure you want to sign out?"
        />
      </Box>
    </div>
  );
};

export default SignOutButton;
