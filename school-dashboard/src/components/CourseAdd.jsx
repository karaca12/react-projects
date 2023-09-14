import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ConfirmationDialog from "./ConfirmationDialog";
import SuccessAlert from "./SuccessAlert";
import { useUser } from "./UserContext";
import NoteAdd from "@mui/icons-material/NoteAdd";

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
        <Typography variant="h3" textAlign="center" sx={{ margin: 5 }}>
          <NoteAdd fontSize="large" />
          Add Course
        </Typography>
        <SuccessAlert show={showSuccessAlert} message={successMessage} />
        <TextField
          required
          onChange={handleChange}
          name="LectureName"
          value={lecture.LectureName}
          margin="normal"
          variant="outlined"
          placeholder="Course Name"
          label="Please enter the course name"
          color="secondary"
          focused
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
          rows={17}
          sx={{ width: "100%" }}
          label="Please enter the course description"
          color="secondary"
          focused
        />
        <Button
          variant="contained"
          onClick={() => {
            handleSubmit();
            setShowSuccessAlert(false);
          }}
          sx={{
            marginTop: "1rem",
            bgcolor: "#5a395b",
            "&:hover": { bgcolor: "#5a395b" },
          }}
        >
          Add Course
        </Button>
        <ConfirmationDialog
          open={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
          onConfirm={handleConfirmSubmit}
          title={"Confirm Submission"}
          content={"Are you sure you want to submit this course?"}
        />
      </Box>
    </div>
  );
};

export default CourseAdd;
