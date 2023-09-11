import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Auth from "../components/Auth";
import Courses from "../components/Courses";
import Home from "../components/Home";
import Enrollment from "../components/Enrollment";
import Drop from "../components/Drop";
import CourseAdd from "../components/CourseAdd";
import Profile from "../components/Profile";
import CourseDelete from "../components/CourseDelete";
import Students from "../components/Students";
import { useUser } from "../components/UserContext";

const DefaultRoutes = () => {
  const { user } = useUser();
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route index element={<Navigate to="/auth" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/courses" element={<Courses />} />
      <Route
        path="/enrollment"
        element={
          user && user.userRole === "Student" ? (
            <Enrollment />
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
      <Route
        path="/drop"
        element={
          user && user.userRole === "Student" ? (
            <Drop />
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
      <Route
        path="/courseadd"
        element={
          user && user.userRole === "Lecturer" ? (
            <CourseAdd />
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
      <Route
        path="/coursedelete"
        element={
          user && user.userRole === "Lecturer" ? (
            <CourseDelete />
          ) : (
            <Navigate to="/auth" />
          )
        }
      />

      <Route
        path="/students"
        element={
          user && user.userRole === "Lecturer" ? (
            <Students />
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};

export default DefaultRoutes;
