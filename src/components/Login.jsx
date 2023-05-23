import { useState } from "react";
import { setUserSession } from "../service/auth";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import axios from "axios";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Box } from "@mui/material";
function Login({ setIsLoggedIn, setOpen, setSignup, setMessage }) {
  const loginUrl = "https://0e66xn1mo3.execute-api.eu-west-2.amazonaws.com/production/login";

  const emptyObj = {
    username: "",
    password: "",
  };

  const [objToSave, setObjToSave] = useState(emptyObj);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleClick = () => {
    setSignup(true);
  };

  const handleChange = (value, name) => {
    let updatedValue = value.target.value;

    const updatedDetails = {
      ...objToSave,
      [name]: updatedValue,
    };
    setObjToSave(updatedDetails);
  };

  const handleSubmit = async () => {
    setMessage(null);
    if (objToSave.username === "" || objToSave.password === "") {
      setMessage("Please complete all fields");
      setOpen(true);
      return;
    }

    try {
      setIsLoggingIn(true);
      const response = await axios.post(loginUrl, objToSave);
      setUserSession(response.data.user, response.data.token);
      setMessage("Success! You are now logged in! ");
      setOpen(true);
      setIsLoggedIn(true);
      setIsLoggingIn(false);
    } catch (error) {
      console.log(error);
      setMessage("Error logging in, please details are correct.");
      setOpen(true);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <TextField
        sx={{ width: 100 }}
        size="small"
        onChange={(value) => handleChange(value, "username")}
        label="Username"
        variant="outlined"
        InputProps={{
          style: { fontSize: "14px", color: "white", backgroundColor: "#1A2035", marginRight: 4 },
        }}
        InputLabelProps={{
          style: { fontSize: "14px" },
        }}
      />

      <TextField
        sx={{ width: 100 }}
        size="small"
        onChange={(value) => handleChange(value, "password")}
        label="Password"
        type="password"
        variant="outlined"
        InputProps={{
          style: { fontSize: "14px", color: "white", backgroundColor: "#1A2035", marginRight: 4 },
        }}
        InputLabelProps={{
          style: { fontSize: "14px" },
        }}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ height: 36 }}
        color="success"
        disabled={isLoggingIn}
      >
        Login
      </Button>

      <AppRegistrationIcon sx={{ marginLeft: 1 }} onClick={handleClick} />
    </Box>
  );
}

export default Login;
