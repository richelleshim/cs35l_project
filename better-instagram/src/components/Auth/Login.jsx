import { AddAlert } from "@mui/icons-material";
import {
  Alert,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input
} from "@mui/joy";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const login = async({email, password}) => {
    const auth = getAuth();
    try{
      await signInWithEmailAndPassword(auth, email, password);
      // take to home page if successful
      navigate('/home');
    } catch (error){
      // display error message if unsuccessful
      setLoginError('Login Failed');
    }
  };

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
      <Button onClick={() => login(inputs)} sx={{ mt: 1 /* margin top */ }}>
        Log in
      </Button>
      {loginError && (
        <Stack spacing = {2}>
          <Typography color ="danger">{loginError}</Typography>
        </Stack>
      )}
      <Divider inset="none" />
      {/* <Button color="neutral" variant="soft">
        <Stack direction="row" spacing={1} alignItems={"center"}>
          <img src="./googe_logo.png" height={"25px"} />
          <Typography color="white" fontSize={14}>
            Log In With Google
          </Typography>
        </Stack>
      </Button> */}
    </>
  );
};

export default Login;
