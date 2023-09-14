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
import CourseUpdate from "../components/CourseUpdate";
import { useUser } from "../components/UserContext";

const DefaultRoutes = () => {
  const { user } = useUser();
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route index element={<Navigate to="/auth" />} />
      <Route path="/home" element={user ? <Home /> : <Navigate to="/auth" />} />
      <Route
        path="/profile"
        element={
          user &&
          (user.userRole === "Student" || user.userRole === "Lecturer") ? (
            <Profile />
          ) : (
            <Navigate to="/home" />
          )
        }
      />
      <Route
        path="/courses"
        element={user ? <Courses /> : <Navigate to="/auth" />}
      />
      <Route
        path="/enrollment"
        element={
          user && user.userRole === "Student" ? (
            <Enrollment />
          ) : (
            <Navigate to="/home" />
          )
        }
      />
      <Route
        path="/drop"
        element={
          user && user.userRole === "Student" ? (
            <Drop />
          ) : (
            <Navigate to="/home" />
          )
        }
      />
      <Route
        path="/courseadd"
        element={
          user && user.userRole === "Lecturer" ? (
            <CourseAdd />
          ) : (
            <Navigate to="/home" />
          )
        }
      />
      <Route
        path="/coursedelete"
        element={
          user && user.userRole === "Lecturer" ? (
            <CourseDelete />
          ) : (
            <Navigate to="/home" />
          )
        }
      />

      <Route
        path="/students"
        element={
          user && user.userRole === "Lecturer" ? (
            <Students />
          ) : (
            <Navigate to="/home" />
          )
        }
      />
      <Route
        path="/courseupdate"
        element={
          user && user.userRole === "Lecturer" ? (
            <CourseUpdate />
          ) : (
            <Navigate to="/home" />
          )
        }
      />
      <Route
        path="*"
        element={
          user &&
          (user.userRole === "Student" || user.userRole === "Lecturer") ? (
            <Navigate to="/home" />
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
    </Routes>
  );
};

export default DefaultRoutes;
