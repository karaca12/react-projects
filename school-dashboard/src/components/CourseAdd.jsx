import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ConfirmationDialog from "./ConfirmationDialog";
import SuccessAlert from "./SuccessAlert";
import { useUser } from "./UserContext";

const CourseAdd = () => {
  const { user } = useUser();
  const userSchoolNumber = user?.userSchoolNumber;
  const [lecture, setLecture] = useState({
    LectureName: "",
    LectureDescription: "",
    LectureLecturerName: user.userName,
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLecture((prevLecture) => ({
      ...prevLecture,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setConfirmDialogOpen(true);
  };
  const handleConfirmSubmit = async () => {
    try {
      await axios.post("https://localhost:44305/lectures/create", lecture);
      if (user.userRole === "Lecturer") {
        await axios.post(
          `https://localhost:44305/users/enroll/${userSchoolNumber}/to/${lecture.LectureName}`
        );
      }
      setShowSuccessAlert(true);
      setSuccessMessage("Course added successfully!");
      setLecture({
        LectureName: "",
        LectureDescription: "",
        LectureLecturerName: user.userName,
      });
    } catch (error) {
      console.error("Error adding the course:", error);
    }
    setConfirmDialogOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={1600}
      alignItems="center"
      justifyContent="center"
      margin="auto"
      marginTop={5}
      padding={3}
      borderRadius={5}
      boxShadow="5px 5px 10px #ccc"
      sx={{
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <Typography variant="h2" textAlign="center">
        Add Course
      </Typography>
      <TextField
        required
        onChange={handleChange}
        name="LectureName"
        value={lecture.LectureName}
        margin="normal"
        variant="outlined"
        placeholder="Course Name"
        helperText="Please enter the course name"
      />
      <TextField
        required
        onChange={handleChange}
        name="LectureDescription"
        value={lecture.LectureDescription}
        margin="normal"
        variant="outlined"
        placeholder="Course Description"
        multiline
        rows={10}
        style={{ width: "100%" }}
        helperText="Please enter the course description"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleSubmit();
          setShowSuccessAlert(false);
        }}
        style={{ marginTop: "1rem" }}
      >
        Add Course
      </Button>
      <SuccessAlert show={showSuccessAlert} message={successMessage} />
      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirmSubmit}
        title={"Confirm Submission"}
        content={"Are you sure you want to submit this course?"}
      />
    </Box>
  );
};

export default CourseAdd;
