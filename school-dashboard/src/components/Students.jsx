import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUser } from "./UserContext";

function Students() {
  const [courses, setCourses] = useState([]);
  const [studentsData, setStudentsData] = useState([]);

  const [expanded, setExpanded] = useState(false);
  const { user } = useUser();
  const userSchoolNumber = user?.userSchoolNumber;

  const fetchUserLectures = async () => {
    try {
      const lecturesResponse = await axios.get(
        `https://localhost:44305/users/getalllecturesfrom/${userSchoolNumber}`
      );

      setCourses(lecturesResponse.data);

      const studentsPromises = lecturesResponse.data.map(async (lecture) => {
        const studentsResponse = await axios.get(
          `https://localhost:44305/lectures/getAllStudentsForLecture/${lecture.id}`
        );
        return {
          lectureId: lecture.id,
          students: studentsResponse.data,
        };
      });

      const studentsData = await Promise.all(studentsPromises);
      setStudentsData(studentsData);
    } catch (error) {
      console.error("Error fetching user lectures:", error);
    }
  };

  useEffect(() => {
    fetchUserLectures();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
          Students
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80%",
            maxHeight: "550px",
            overflow: "auto",
          }}
        >
          {courses.length !== 0 ? (
            courses.map((course) => (
              <Accordion
                sx={{
                  mt: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  bgcolor: "#e9e7ef",
                }}
                key={course.lectureName}
                expanded={expanded === course.lectureName}
                onChange={handleChange(course.lectureName)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{course.lectureName}</Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div style={{ flex: 2, marginRight: "5rem" }}>
                      {" "}
                      <Typography variant="body2">Student Name</Typography>
                    </div>
                    <div style={{ flex: 2, marginRight: "5rem" }}>
                      {" "}
                      <Typography variant="body2">School Number</Typography>
                    </div>
                    <div style={{ flex: 2 }}>
                      <Typography variant="body2">Email</Typography>
                    </div>
                  </div>
                  {studentsData
                    .find((data) => data.lectureId === course.id)
                    ?.students.map((student) => (
                      <div
                        key={student.id}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: "0.2rem",
                        }}
                      >
                        <div style={{ flex: 2, marginRight: "1rem" }}>
                          {student.userName}
                        </div>
                        <div style={{ flex: 2, marginRight: "1rem" }}>
                          {student.userSchoolNumber}
                        </div>
                        <div style={{ flex: 2 }}>{student.userEmail}</div>
                      </div>
                    ))}
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography variant="h6">
              You didn't assign to any courses.
            </Typography>
          )}
        </div>
      </Box>
    </div>
  );
}

export default Students;
