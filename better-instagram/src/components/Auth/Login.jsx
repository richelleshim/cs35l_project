import { useState } from "react";
import { Input, Button, Typography, Stack } from "@mui/joy";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  return (
    <>
      <Input
        placeholder="Email"
        fontSize="14"
        type="email"
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        placeholder="Password"
        fontSize="14"
        type="password"
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />
      <Button color="primary" size="sm" fontSize={14}>
        Log In
      </Button>
      <Button color="neutral" variant="soft">
        <Stack direction="row" spacing={1}>
          <GoogleIcon width={"5px"} height={"5px"} />
          <Typography color="white" fontSize={14}>
            Log In With Google
          </Typography>
        </Stack>
      </Button>
    </>
  );
};

export default Login;
