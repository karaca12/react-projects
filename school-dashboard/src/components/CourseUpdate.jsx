import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUser } from "./UserContext";
import ConfirmationDialog from "./ConfirmationDialog";
import SuccessAlert from "./SuccessAlert";
import TextField from "@mui/material/TextField";

function CourseUpdate() {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isView, setIsView] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const { user } = useUser();
  const [lecture, setLecture] = useState({
    LectureName: "",
    LectureDescription: "",
    LectureLecturerName: user.userName,
  });
  const userSchoolNumber = user?.userSchoolNumber;

  const handleOpenCancelDialog = () => {
    setCancelDialogOpen(true);
  };
  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
  };
  const handleOpenUpdateDialog = () => {
    setUpdateDialogOpen(true);
  };
  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  const fetchUserLectures = async () => {
    try {
      const response = await axios.get(
        `https://localhost:44305/users/getalllecturesfrom/${userSchoolNumber}`
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching user lectures:", error);
    }
  };

  useEffect(() => {
    fetchUserLectures();
  }, []);
  const handleUpdateLecture = async () => {
    try {
      await axios.put(
        `https://localhost:44305/lectures/updatebyname/${selectedCourse}`,
        lecture
      );
      setShowSuccessAlert(true);
      setSuccessMessage("Updated successfully!");
      setLecture({
        LectureName: "",
        LectureDescription: "",
        LectureLecturerName: user.userName,
      });
      fetchUserLectures();
    } catch (error) {
      console.error("Error updating the course:", error);
    }
    setUpdateDialogOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleTextFieldChange = (event) => {
    const { name, value } = event.target;
    setLecture((prevLecture) => ({
      ...prevLecture,
      [name]: value,
    }));
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
      spa
      borderRadius={5}
      boxShadow="5px 5px 10px #ccc"
      sx={{
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <Typography variant="h2" textAlign="center">
        Update Course
      </Typography>
      <SuccessAlert show={showSuccessAlert} message={successMessage} />
      {isView ? (
        courses.length !== 0 ? (
          courses.map((course) => (
            <Accordion
              sx={{
                mt: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "80%",
              }}
              key={course.lectureName}
              expanded={expanded === course.lectureName}
              onChange={handleChange(course.lectureName)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  {course.lectureName} - {course.lectureLecturerName}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <Typography variant="body2">
                  {course.lectureDescription}
                </Typography>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={() => {
                      setShowSuccessAlert(false);
                      setIsView(false);
                      setSelectedCourse(course.lectureName);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Update
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography variant="h6">
            You didn't assign to any courses.
          </Typography>
        )
      ) : (
        <>
          <TextField
            required
            onChange={handleTextFieldChange}
            name="LectureName"
            value={lecture.LectureName}
            margin="normal"
            variant="outlined"
            placeholder="Course Name"
            helperText="Please enter the course name"
          />
          <TextField
            required
            onChange={handleTextFieldChange}
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
              handleOpenUpdateDialog();
              setShowSuccessAlert(false);
            }}
            style={{ marginTop: "1rem" }}
          >
            Update
          </Button>
          <Button
            onClick={handleOpenCancelDialog}
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
        </>
      )}
      <ConfirmationDialog
        open={updateDialogOpen}
        onClose={handleCloseUpdateDialog}
        onConfirm={() => {
          handleUpdateLecture();
          setIsView(true);
        }}
        title={"Confirm Update"}
        content={"Are you sure you want to update this course?"}
      />
      <ConfirmationDialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        onConfirm={() => {
          handleCloseCancelDialog();
          setIsView(true);
        }}
        title={"Cancel Update"}
        content={"Are you sure you want to cancel the update?"}
      />
    </Box>
  );
}

export default CourseUpdate;