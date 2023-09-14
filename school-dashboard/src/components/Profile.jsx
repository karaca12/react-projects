import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import axios from "axios";
import { useUser } from "./UserContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ConfirmationDialog from "./ConfirmationDialog";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import {
  Person,
  Fingerprint,
  Cake,
  Email,
  Phone,
  PersonOutline,
  AutoStories,
  Tag,
  AccountBox,
  Edit,
} from "@mui/icons-material";
import dayjs from "dayjs";
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
        message: "Password change failed! Active password isn't correct.",
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
    <div
      style={{
        padding: "50px",
        height: "calc(84vh - 10px)",
        backgroundColor: "#e9e7ef",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={1200}
        alignItems="center"
        justifyContent="flex-start"
        padding={3}
        borderRadius={5}
        boxShadow="5px 5px 10px #ccc"
        sx={{
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
          bgcolor: "#fdefd0",
        }}
      >
        {isView ? (
          <>
            <Typography sx={{ margin: 5 }} variant="h3" textAlign="center">
              <AccountBox fontSize="large" />
              Profile
            </Typography>
            <SuccessAlert
              show={showSuccessAlert}
              message={successMessage}
              onClose={() => setShowSuccessAlert(false)}
            />

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Person />
                  </TableCell>
                  <TableCell>
                    <strong>Name:</strong>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{user.userName}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Fingerprint />
                  </TableCell>
                  <TableCell>
                    <strong>National Identity:</strong>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {user.userNationalIdentity}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Tag />
                  </TableCell>
                  <TableCell>
                    <strong>School Number:</strong>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {user.userSchoolNumber}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Cake />
                  </TableCell>
                  <TableCell>
                    <strong>Birth Date:</strong>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {new Date(user.userBirthdate).toLocaleDateString("en-GB")}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Email />
                  </TableCell>
                  <TableCell>
                    <strong>E-Mail:</strong>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{user.userEmail}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Phone />
                  </TableCell>
                  <TableCell>
                    <strong>Phone Number:</strong>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{user.userPhone}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <PersonOutline />
                  </TableCell>
                  <TableCell>
                    <strong>Role:</strong>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{user.userRole}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <AutoStories />
                  </TableCell>
                  <TableCell>
                    <strong>Number of Courses:</strong>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{courseCount}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button
              onClick={toggleViewToEdit}
              sx={{
                marginTop: 3,
                borderRadius: 3,
                bgcolor: "#5a395b",
                "&:hover": { bgcolor: "#5a395b" },
              }}
              variant="contained"
            >
              Edit Profile
            </Button>
            <Button
              onClick={toggleViewToPassword}
              sx={{
                marginTop: 3,
                borderRadius: 3,
                bgcolor: "#5a395b",
                "&:hover": { bgcolor: "#5a395b" },
              }}
              variant="contained"
            >
              Change Password
            </Button>
          </>
        ) : isEditing ? (
          <>
            <Typography variant="h4" textAlign="center" sx={{ margin: 5 }}>
              <Edit />
              Edit Profile
            </Typography>
            <TextField
              required
              onChange={handleChange}
              name="UserName"
              margin="normal"
              variant="outlined"
              placeholder="Full Name"
              label="Please enter your name"
              color="secondary"
              value={userData.UserName}
              focused
            />
            <TextField
              required
              onChange={handleChange}
              name="UserEmail"
              margin="normal"
              type="email"
              variant="outlined"
              placeholder="E-Mail"
              label="Please enter your E-Mail"
              color="secondary"
              value={userData.UserEmail}
              focused
            />
            <TextField
              required
              onChange={handleChange}
              name="UserPhone"
              margin="normal"
              type="phone"
              variant="outlined"
              placeholder="Phone Number"
              label="Please enter your phone number"
              color="secondary"
              value={userData.UserPhone}
              focused
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                required
                onChange={handleDateChange}
                sx={{ marginTop: "10px", width: "225px" }}
                label={"Birth Date"}
                defaultValue={dayjs(userData.UserBirthdate)}
              />
            </LocalizationProvider>
            <Button
              onClick={() => {
                handleOpenUpdateProfileDialog();
                setShowSuccessAlert(false);
              }}
              sx={{
                marginTop: 3,
                borderRadius: 3,
                bgcolor: "#5a395b",
                "&:hover": { bgcolor: "#5a395b" },
              }}
              variant="contained"
            >
              Update Profile
            </Button>
            <Button
              onClick={handleOpenCancelEditingDialog}
              sx={{ marginTop: 3, borderRadius: 3 }}
              variant="contained"
              color="error"
            >
              Cancel Editing
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" textAlign="center" sx={{ margin: 5 }}>
              <Edit />
              Change Password
            </Typography>

            <ErrorAlert
              show={error.show}
              message={error.message}
              onClose={() => setError(false)}
            />
            <TextField
              required
              onChange={handlePassword}
              name="UserPasswordValidation"
              margin="normal"
              type="password"
              variant="outlined"
              placeholder="Current Password"
              label="Please enter your active password"
              color="secondary"
              focused
            />
            <TextField
              required
              onChange={handlePassword}
              name="UserPassword"
              margin="normal"
              variant="outlined"
              type="password"
              placeholder="New Password"
              label="Please enter your new password"
              color="secondary"
              focused
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
              sx={{
                marginTop: 3,
                borderRadius: 3,
                bgcolor: "#5a395b",
                "&:hover": { bgcolor: "#5a395b" },
              }}
              variant="contained"
            >
              Change Password
            </Button>
            <Button
              onClick={handleOpenCancelPasswordDialog}
              sx={{ marginTop: 3, borderRadius: 3 }}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
          </>
        )}
        <ConfirmationDialog
          open={cancelEditingDialogOpen}
          onClose={handleCloseCancelEditingDialog}
          onConfirm={() => {
            handleCloseCancelEditingDialog();
            setIsView(true);
            setIsEditing(false);
            setShowSuccessAlert(false);
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
            setShowSuccessAlert(false);
          }}
          title={"Cancel Change Password"}
          content={"Are you sure you want to cancel changing your password?"}
        />
      </Box>
    </div>
  );
};

export default Profile;
