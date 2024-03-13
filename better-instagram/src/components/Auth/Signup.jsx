import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Snackbar,
} from "@mui/joy";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailandPassword";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, signup } = useSignUpWithEmailAndPassword();
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
    major: "",
    year: "",
  });

  function handleClick(inputs) {
    signup(inputs);
    setOpen(true);
  }
  return (
    <>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          fontSize="14"
          type="email"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Full Name</FormLabel>
        <Input
          placeholder="Full Name"
          fontSize="14"
          type="text"
          value={inputs.fullName}
          onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Username"
          fontSize="14"
          type="text"
          value={inputs.username}
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Password"
          fontSize="14"
          type={showPassword ? "text" : "password"}
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          endDecorator={
            <IconButton
              color="neutral"
              variant="soft"
              size="small"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}{" "}
            </IconButton>
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Major</FormLabel>
        <Input
          placeholder="Major"
          fontSize="14"
          type="text"
          value={inputs.major}
          onChange={(e) => setInputs({ ...inputs, major: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Year</FormLabel>
        <Input
          placeholder="Year"
          fontSize="14"
          type="text"
          value={inputs.year}
          onChange={(e) => setInputs({ ...inputs, year: e.target.value })}
        />
      </FormControl>
      <Button
        color="primary"
        size="sm"
        fontSize={14}
        onClick={handleClick}
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Snackbar
        autoHideDuration={3000}
        open={open}
        size={"md"}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setOpen(false);
        }}
      >
        Congrats! You have now created an account. Please click Log In below and
        log in again!{" "}
      </Snackbar>
    </>
  );
};

export default SignUp;
