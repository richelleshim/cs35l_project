import { Input, Stack, Button, Box } from "@mui/joy";
import { useState } from "react";
import { IconButton, CircularProgress, Alert } from "@mui/material";
import { Visibility, VisibilityOff, Error } from "@mui/icons-material";
// import useSignUpWithEmailandPassword from "../../hooks/useSignUpWithEmailandPassword";

const Signup = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, signup } = useSignUpWithEmailandPassword();

  return (
    <>
      <Box>
        <Stack spacing={1}>
          <Input
            placeholder="Full Name"
            fontSize="14"
            type="text"
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
          />
          <Input
            placeholder="Email"
            fontSize="14"
            type="email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
          <Input
            placeholder="Username"
            fontSize="14"
            type="text"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
          <Stack spacing={2}>
            <Input
              placeholder="Password"
              fontSize="14"
              type="password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
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
            {/* <Input
              placeholder="Confirm Password"
              fontSize="14"
              type={showPassword ? "text" : "password"}
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
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
            /> */}
          </Stack>
        </Stack>
      </Box>
      {error && (
        <Alert icon={<Error fontSize={12} severity="error" />}>
          {error.message}
        </Alert>
      )}
      <Button
        color="primary"
        size="sm"
        fontSize={14}
        onClick={() => signup(inputs)}
      >
        Sign Up
      </Button>
    </>
  );
};

export default Signup;
