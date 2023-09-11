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

function Enrollment() {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useUser();
  const userSchoolNumber = user?.userSchoolNumber;

  const fetchEnrollmentLectures = async () => {
    try {
      const response = await axios.get(
        `https://localhost:44305/users/getEnrollmentLectures/${userSchoolNumber}`
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching enrollment lectures:", error);
    }
  };

  useEffect(() => {
    fetchEnrollmentLectures();
  }, []);

  const enrollToLecture = async (lectureName) => {
    setSelectedCourse(lectureName);
    setConfirmDialogOpen(true);
  };

  const handleConfirmEnrollment = async () => {
    try {
      await axios.post(
        `https://localhost:44305/users/enroll/${userSchoolNumber}/to/${selectedCourse}`
      );
      setShowSuccessAlert(true);
      setSuccessMessage("Enrolled successfully!");
      fetchEnrollmentLectures();
    } catch (error) {
      console.error("Error enrolling in lecture:", error);
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
        Course Enrollment
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
                    enrollToLecture(course.lectureName);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Enroll
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant="h6">There are no courses to enroll.</Typography>
      )}
      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirmEnrollment}
        title={"Confirm Enrollment"}
        content={"Are you sure you want to enroll in this course?"}
      />
    </Box>
  );
}

export default Enrollment;
