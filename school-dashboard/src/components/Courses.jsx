import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState(null);
  useEffect(() => {
    axios
      .get("https://localhost:44305/lectures/getall")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

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
        bgcolor: "#fdefd0",
      }}
    >
      <Typography variant="h2" textAlign="center" sx={{ margin: 5 }}>
        All Courses
      </Typography>
      {courses.length !== 0 ? (
        courses.map((course) => (
          <Accordion
            sx={{
              mt: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "80%",
              bgcolor: "#e9e7ef",
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
            <AccordionDetails>
              <Typography variant="body2">
                {course.lectureDescription}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant="h6">There are no courses.</Typography>
      )}
    </Box>
  );
};

export default Courses;
