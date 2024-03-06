import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  return (
    <>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="joebruin@ucla.edu"
          fontSize="14"
          type="email"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Password"
          fontSize="14"
          type="password"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
      </FormControl>
      <Button sx={{ mt: 1 /* margin top */ }}>Log in</Button>
      <Divider inset="none" />
      <Button color="neutral" variant="soft">
        <Stack direction="row" spacing={1} alignItems={"center"}>
          <img src="./googe_logo.png" height={"25px"} />
          <Typography color="white" fontSize={14}>
            Log In With Google
          </Typography>
        </Stack>
      </Button>
    </>
  );
};

export default Login;