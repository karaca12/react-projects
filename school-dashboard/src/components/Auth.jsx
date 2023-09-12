import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import ErrorAlert from "./ErrorAlert";

const Auth = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState({ show: false, message: "" });
  const signupMutation = useMutation((newUser) =>
    axios.post("https://localhost:44305/users/create", newUser)
  );
  const signinMutation = useMutation((loginCredentials) =>
    axios.post("https://localhost:44305/users/signInCheck", loginCredentials)
  );

  const [isSignup, setIsSignup] = useState(false);
  const roleoptions = ["Student", "Lecturer"];
  const [inputs, setInputs] = useState({
    UserSchoolNumber: "",
    UserPassword: "",
    UserName: "",
    UserEmail: "",
    UserPhone: "",
    UserNationalIdentity: "",
    UserBirthdate: "",
    UserRole: "Student",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleDateChange = (date) => {
    setInputs((prevState) => ({
      ...prevState,
      UserBirthdate: date.format("YYYY-MM-DD"),
    }));
  };
  const handleRoleChange = (event, value) => {
    setInputs((prevState) => ({
      ...prevState,
      UserRole: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const responsesignup = await signupMutation.mutateAsync(inputs);
        if (responsesignup.status === 200) {
          setUser(responsesignup.data);
          navigate("/home");
        }
      } else {
        const signinData = {
          UserSchoolNumber: inputs.UserSchoolNumber,
          UserPassword: inputs.UserPassword,
        };
        const responsesignin = await signinMutation.mutateAsync(signinData);
        if (responsesignin.status === 200) {
          setUser(responsesignin.data);
          navigate("/home");
        }
      }
    } catch (error) {
      if (isSignup) {
        setError({
          show: true,
          message: "Signup failed! The school number is already in use.",
        });
      } else {
        setError({
          show: true,
          message: "Signin failed! School number and password doesn't match.",
        });
      }
    }
  };
  const resetState = () => {
    setIsSignup(!isSignup);
    setInputs({
      UserSchoolNumber: "",
      UserPassword: "",
      UserName: "",
      UserEmail: "",
      UserPhone: "",
      UserNationalIdentity: "",
      UserBirthdate: "2000-01-01",
      UserRole: "Student",
    });
    setError({
      show: false,
      message: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10 px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
            bgcolor: "#fdefd0",
          }}
        >
          <Typography variant="h2" textAlign="center" sx={{ margin: 5 }}>
            {isSignup ? "Sign-Up" : "Sign-In"}
          </Typography>
          <ErrorAlert show={error.show} message={error.message} />
          <TextField
            required
            onChange={handleChange}
            name="UserSchoolNumber"
            value={inputs.UserSchoolNumber}
            margin="normal"
            variant="outlined"
            placeholder="School Number"
            label="Please enter your school number"
            inputProps={{
              maxLength: 9,
            }}
            color="secondary"
            focused
          />
          <TextField
            required
            onChange={handleChange}
            name="UserPassword"
            value={inputs.UserPassword}
            margin="normal"
            type="password"
            variant="outlined"
            placeholder="Password"
            label="Please enter your password"
            color="secondary"
            focused
          />
          {isSignup && (
            <>
              <TextField
                required
                onChange={handleChange}
                name="UserName"
                value={inputs.UserName}
                margin="normal"
                variant="outlined"
                placeholder="Full Name"
                label="Please enter your name"
                color="secondary"
                focused
              />
              <TextField
                required
                onChange={handleChange}
                name="UserEmail"
                value={inputs.UserEmail}
                margin="normal"
                type="email"
                variant="outlined"
                placeholder="E-Mail"
                label="Please enter your E-Mail"
                color="secondary"
                focused
              />
              <TextField
                required
                onChange={handleChange}
                name="UserPhone"
                value={inputs.UserPhone}
                margin="normal"
                type="phone"
                variant="outlined"
                placeholder="Phone Number"
                label="Please enter your phone number"
                color="secondary"
                focused
              />
              <TextField
                required
                onChange={handleChange}
                name="UserNationalIdentity"
                value={inputs.UserNationalIdentity}
                margin="normal"
                variant="outlined"
                placeholder="National Identity Number"
                label="Please enter your identity number"
                inputProps={{
                  maxLength: 11,
                }}
                color="secondary"
                focused
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  required
                  onChange={handleDateChange}
                  sx={{ maxWidth: 225, margin: "10px" }}
                  label={"Birth Date"}
                />
              </LocalizationProvider>
              <Autocomplete
                onChange={handleRoleChange}
                value={inputs.UserRole}
                sx={{ margin: "10px", width: 225 }}
                options={roleoptions}
                renderInput={(params) => (
                  <TextField {...params} label="Please pick your role" />
                )}
              />
            </>
          )}
          <Button
            type="submit"
            sx={{
              marginTop: 3,
              borderRadius: 3,
              bgcolor: "#5a395b",
              "&:hover": { bgcolor: "#5a395b" },
            }}
            cha
            variant="contained"
            onClick={() => {
              setError({
                show: false,
                message: "",
              });
            }}
          >
            {isSignup ? "Sign-up" : "Sign-in"}
          </Button>
          <Button
            onClick={resetState}
            sx={{ marginTop: 3, borderRadius: 3 }}
            color="secondary"
          >
            {isSignup
              ? "Already have an account? Sign-in from here"
              : "Don't have an account? Sign-up from here"}
          </Button>
        </Box>
      </form>
    </div>
  );
};
export default Auth;
