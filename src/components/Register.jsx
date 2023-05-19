import { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import axios from "axios";
import { Box } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

function Register({ setMessage, setOpen, setSignup }) {
  const registerUrl = "https://0e66xn1mo3.execute-api.eu-west-2.amazonaws.com/production/register";

  const emptyObj = {
    username: "",
    password: "",
  };

  const handleClick = () => {
    setSignup(false);
  };

  const [objToSave, setObjToSave] = useState(emptyObj);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleChange = (value, name) => {
    let updatedValue = value.target.value;

    const updatedDetails = {
      ...objToSave,
      [name]: updatedValue,
    };
    setObjToSave(updatedDetails);
    console.log(objToSave);
  };

  const handleSubmit = async () => {
    setMessage(null);
    if (objToSave.username === "" || objToSave.password === "") {
      setMessage("Please complete all fields");
      setOpen(true);
      return;
    }

    try {
      setIsRegistering(true);
      const response = await axios.post(registerUrl, objToSave);
      console.log(response.data.user);
      setMessage("Success! You are now registered!");
      setOpen(true);
      setIsRegistering(false);
    } catch (error) {
      console.log(error);
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
        disabled={isRegistering}
      >
        Register
      </Button>
      <LoginIcon sx={{ marginLeft: 1 }} onClick={handleClick} />
    </Box>
  );
}

export default Register;
