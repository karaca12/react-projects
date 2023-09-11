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

function Drop() {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useUser();
  const userSchoolNumber = user?.userSchoolNumber;

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

  const dropLecture = async (lectureName) => {
    setSelectedCourse(lectureName);
    setConfirmDialogOpen(true);
  };
  const handleDropLecture = async () => {
    try {
      await axios.delete(
        `https://localhost:44305/users/dropLecture/${selectedCourse}/from/${userSchoolNumber}`
      );
      setShowSuccessAlert(true);
      setSuccessMessage("Droped successfully!");
      fetchUserLectures();
    } catch (error) {
      console.error("Error droping the course:", error);
    }
    setConfirmDialogOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
        Drop Course
      </Typography>
      <SuccessAlert show={showSuccessAlert} message={successMessage} />
      {courses.length !== 0 ? (
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
                    dropLecture(course.lectureName);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Drop
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant="h6">You didn't assign to any courses.</Typography>
      )}
      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleDropLecture}
        title={"Confirm Drop"}
        content={"Are you sure you want to drop this course?"}
      />
    </Box>
  );
}

export default Drop;
