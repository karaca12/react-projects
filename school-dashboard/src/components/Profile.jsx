import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useUser } from "./UserContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ConfirmationDialog from "./ConfirmationDialog";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

const Profile = () => {
  const { user, setUser } = useUser();
  const [isView, setIsView] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [cancelEditingDialogOpen, setCancelEditingDialogOpen] = useState(false);
  const [updateProfileDialogOpen, setUpdateProfileDialogOpen] = useState(false);
  const [cancelPasswordDialogOpen, setCancelPasswordDialogOpen] =
    useState(false);
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
    useState(false);
  const initialUserData = {
    UserName: user.userName,
    UserNationalIdentity: user.userNationalIdentity,
    UserSchoolNumber: user.userSchoolNumber,
    UserBirthdate: user.userBirthdate,
    UserEmail: user.userEmail,
    UserPhone: user.userPhone,
    UserRole: user.userRole,
    UserPassword: user.userPassword,
  };
  const [courseCount, setCourseCount] = useState();
  const [userData, setUserData] = useState(initialUserData);
  const [passwordData, setPasswordData] = useState({
    UserPasswordValidation: "",
    UserPassword: "",
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState({ show: false, message: "" });
  const userId = user?.id;
  useEffect(() => {
    axios
      .get(`https://localhost:44305/users/getLectureCountOf/${userId}`)
      .then((response) => {
        setCourseCount(response.data);
      })
      .catch((error) => {
        console.error("Error fetching count:", error);
      });
  }, [userId]);

  const handleOpenCancelPasswordDialog = () => {
    setCancelPasswordDialogOpen(true);
  };
  const handleCloseCancelPasswordDialog = () => {
    setCancelPasswordDialogOpen(false);
  };
  const handleOpenChangePasswordDialog = () => {
    setChangePasswordDialogOpen(true);
  };
  const handleCloseChangePasswordDialog = () => {
    setChangePasswordDialogOpen(false);
  };
  const handleOpenCancelEditingDialog = () => {
    setCancelEditingDialogOpen(true);
  };

  const handleCloseCancelEditingDialog = () => {
    setCancelEditingDialogOpen(false);
  };

  const handleOpenUpdateProfileDialog = () => {
    setUpdateProfileDialogOpen(true);
  };

  const handleCloseUpdateProfileDialog = () => {
    setUpdateProfileDialogOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlePassword = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setUserData((prevState) => ({
      ...prevState,
      UserBirthdate: date.format("YYYY-MM-DD"),
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `https://localhost:44305/users/updatebyid/${user.id}`,
        userData
      );

      if (response.status === 200) {
        setUser(response.data);
        setIsView(true);
        setIsEditing(false);
        setShowSuccessAlert(true);
        setSuccessMessage("Profile updated successfully!");
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const validationData = {
        UserSchoolNumber: userData.UserSchoolNumber,
        UserPassword: passwordData.UserPasswordValidation,
      };
      const validationResponse = await axios.post(
        `https://localhost:44305/users/signincheck`,
        validationData
      );
      if (validationResponse.status === 200) {
        const response = await axios.put(
          `https://localhost:44305/users/changepasswordbyid/${user.id}`,
          passwordData
        );

        if (response.status === 200) {
          setUser(response.data);
          setIsView(true);
          setIsEditing(false);
          setShowSuccessAlert(true);
          setSuccessMessage("Password changed successfully!");
        } else {
          console.error("Change password failed");
        }
      } else {
        console.error("Validation failed");
      }
    } catch (error) {
      setError({
        show: true,
        message:
          "Password change failed! Password already in use isn't correct.",
      });
    }
  };

  const toggleViewToEdit = () => {
    setIsView(false);
    setIsEditing(true);
  };
  const toggleViewToPassword = () => {
    setIsView(false);
    setIsEditing(false);
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection={"column"}
        maxWidth={400}
        alignItems={"center"}
        justifyContent={"center"}
        margin={"auto"}
        marginTop={5}
        padding={3}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
        sx={{
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isView ? (
          <>
            <Typography sx={{ margin: 5 }} variant="h2" textAlign="center">
              User Profile
            </Typography>
            <SuccessAlert show={showSuccessAlert} message={successMessage} />
            <Typography variant="body1">
              <strong>Name:</strong> {user.userName}
            </Typography>
            <Typography variant="body1">
              <strong>National Identity:</strong> {user.userNationalIdentity}
            </Typography>
            <Typography variant="body1">
              <strong>School Number:</strong> {user.userSchoolNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Birth Date:</strong>{" "}
              {new Date(user.userBirthdate).toLocaleDateString("en-GB")}
            </Typography>
            <Typography variant="body1">
              <strong>E-Mail:</strong> {user.userEmail}
            </Typography>
            <Typography variant="body1">
              <strong>Phone Number:</strong> {user.userPhone}
            </Typography>
            <Typography variant="body1">
              <strong>Role:</strong> {user.userRole}
            </Typography>
            <Typography variant="body1">
              <strong>Number of Courses:</strong> {courseCount}
            </Typography>
            <Button
              onClick={toggleViewToEdit}
              sx={{ marginTop: 3, borderRadius: 3 }}
              variant="contained"
              color="primary"
            >
              Edit Profile
            </Button>
            <Button
              onClick={toggleViewToPassword}
              sx={{ marginTop: 3, borderRadius: 3 }}
              variant="contained"
              color="primary"
            >
              Change Password
            </Button>
          </>
        ) : isEditing ? (
          <>
            <Typography variant="h2" textAlign="center" sx={{ margin: 5 }}>
              Edit Profile
            </Typography>
            <form
              onSubmit={handleUpdateProfile}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "225px",
              }}
            >
              <TextField
                required
                onChange={handleChange}
                name="UserName"
                margin="normal"
                variant="outlined"
                placeholder="Full Name"
                helperText="Please enter your name if you want to change it"
              />
              <TextField
                required
                onChange={handleChange}
                name="UserNationalIdentity"
                margin="normal"
                variant="outlined"
                placeholder="National Identity Number"
                helperText="Please enter your national identity number if you want to change it"
              />
              <TextField
                required
                onChange={handleChange}
                name="UserEmail"
                margin="normal"
                type="email"
                variant="outlined"
                placeholder="E-Mail"
                helperText="Please enter your E-Mail if you want to change it"
              />
              <TextField
                required
                onChange={handleChange}
                name="UserPhone"
                margin="normal"
                type="phone"
                variant="outlined"
                placeholder="Phone Number"
                helperText="Please enter your phone number if you want to change it"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  required
                  onChange={handleDateChange}
                  sx={{ marginTop: "10px", width: "225px" }}
                  label={"Birth Date"}
                  slotProps={{
                    textField: {
                      helperText:
                        "Please enter your birth date if you want to change it",
                    },
                  }}
                />
              </LocalizationProvider>
              <Button
                onClick={() => {
                  handleOpenUpdateProfileDialog();
                  setShowSuccessAlert(false);
                }}
                sx={{ marginTop: 3, borderRadius: 3 }}
                variant="contained"
                color="primary"
              >
                Update Profile
              </Button>
              <Button
                onClick={handleOpenCancelEditingDialog}
                sx={{ marginTop: 3, borderRadius: 3 }}
                variant="outlined"
                color="secondary"
              >
                Cancel Editing
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h2" textAlign="center" sx={{ margin: 5 }}>
              Change Password
            </Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChangePassword();
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "225px",
              }}
            >
              <ErrorAlert show={error.show} message={error.message} />
              <TextField
                required
                onChange={handlePassword}
                name="UserPasswordValidation"
                margin="normal"
                type="password"
                variant="outlined"
                placeholder="Password Already In Use"
                helperText="Please enter your already in use password"
              />
              <TextField
                required
                onChange={handlePassword}
                name="UserPassword"
                margin="normal"
                variant="outlined"
                type="password"
                placeholder="New Password"
                helperText="Please enter your new password"
              />
              <Button
                onClick={() => {
                  handleOpenChangePasswordDialog();
                  setShowSuccessAlert(false);
                  setError({
                    show: false,
                    message: "",
                  });
                }}
                sx={{ marginTop: 3, borderRadius: 3 }}
                variant="contained"
                color="primary"
              >
                Change Password
              </Button>
              <Button
                onClick={handleOpenCancelPasswordDialog}
                sx={{ marginTop: 3, borderRadius: 3 }}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            </form>
          </>
        )}
        <ConfirmationDialog
          open={cancelEditingDialogOpen}
          onClose={handleCloseCancelEditingDialog}
          onConfirm={() => {
            handleCloseCancelEditingDialog();
            setIsView(true);
            setIsEditing(false);
          }}
          title={"Cancel Editing"}
          content={"Are you sure you want to cancel editing?"}
        />

        <ConfirmationDialog
          open={updateProfileDialogOpen}
          onClose={handleCloseUpdateProfileDialog}
          onConfirm={() => {
            handleCloseUpdateProfileDialog();
            handleUpdateProfile();
          }}
          title={"Update Profile"}
          content={"Are you sure you want to update your profile?"}
        />
        <ConfirmationDialog
          open={changePasswordDialogOpen}
          onClose={handleCloseChangePasswordDialog}
          onConfirm={() => {
            handleCloseChangePasswordDialog();
            handleChangePassword();
          }}
          title={"Change Password"}
          content={"Are you sure you want to change your password?"}
        />
        <ConfirmationDialog
          open={cancelPasswordDialogOpen}
          onClose={handleCloseCancelPasswordDialog}
          onConfirm={() => {
            handleCloseCancelPasswordDialog();
            setIsView(true);
            setIsEditing(false);
          }}
          title={"Cancel Change Password"}
          content={"Are you sure you want to cancel changing your password?"}
        />
      </Box>
    </div>
  );
};

export default Profile;
