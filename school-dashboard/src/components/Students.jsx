/* import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
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

  const [sortOrder, setSortOrder] = useState("asc"); // Initial sorting order
  const [sortedColumn, setSortedColumn] = useState("userName"); // Initial sorting column

  const handleSort = (column) => {
    setSortOrder(
      sortedColumn === column ? (sortOrder === "asc" ? "desc" : "asc") : "asc"
    );
    setSortedColumn(column);
  };

  const sortStudents = (students) => {
    const sortedStudents = [...students];

    sortedStudents.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortedColumn] > b[sortedColumn] ? 1 : -1;
      } else {
        return a[sortedColumn] < b[sortedColumn] ? 1 : -1;
      }
    });

    return sortedStudents;
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
        width={1200}
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
                  width: "80%",
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
                  sx={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Student Name</TableCell>
                          <TableCell align="center">School Number</TableCell>
                          <TableCell align="center">Email</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {studentsData
                          .find((data) => data.lectureId === course.id)
                          ?.students.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell align="center">
                                {student.userName}
                              </TableCell>
                              <TableCell align="center">
                                {student.userSchoolNumber}
                              </TableCell>
                              <TableCell align="center">
                                <Link
                                  href={`mailto:${student.userEmail}`}
                                  underline="hover"
                                  target="_blank"
                                >
                                  {student.userEmail}
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
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

  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState("userName");

  const handleSort = (column) => {
    setSortOrder(
      sortedColumn === column ? (sortOrder === "asc" ? "desc" : "asc") : "asc"
    );
    setSortedColumn(column);
  };

  const sortStudents = (students) => {
    if (!students) return [];
    const sortedStudents = [...students];
    sortedStudents.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortedColumn] > b[sortedColumn] ? 1 : -1;
      } else {
        return a[sortedColumn] < b[sortedColumn] ? 1 : -1;
      }
    });
    return sortedStudents;
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
        width={1200}
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
                  width: "80%",
                  bgcolor: "#e9e7ef",
                }}
                key={course.lectureName}
                expanded={expanded === course.lectureName}
                onChange={handleChange(course.lectureName)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{course.lectureName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <TableSortLabel
                              active={sortedColumn === "userName"}
                              direction={sortOrder}
                              onClick={() => handleSort("userName")}
                            >
                              Student Name
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={sortedColumn === "userSchoolNumber"}
                              direction={sortOrder}
                              onClick={() => handleSort("userSchoolNumber")}
                            >
                              School Number
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>Email</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sortStudents(
                          studentsData.find(
                            (data) => data.lectureId === course.id
                          )?.students
                        ).map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.userName}</TableCell>
                            <TableCell>{student.userSchoolNumber}</TableCell>
                            <TableCell>
                              <Link
                                href={`mailto:${student.userEmail}`}
                                underline="hover"
                                target="_blank"
                              >
                                {student.userEmail}
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
