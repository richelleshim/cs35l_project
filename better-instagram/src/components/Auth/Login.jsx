import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Typography
} from "@mui/joy";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firestore } from '../../firebase/firebase';

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    const auth = getAuth();
    try {
      localStorage.removeItem("user-info");
      var userObj = await signInWithEmailAndPassword(auth, email, password);
      // take to home page if successful
      const userDocRef = doc(firestore, 'users', userObj.user.uid)
      const docSnap = await getDoc(userDocRef);
      localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
      console.log(docSnap.data())
      navigate("/profile");
    } catch (error) {
      // display error message if unsuccessful
      setLoginError("Login Failed");
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
      <Button onClick={() => login(inputs)} sx={{ mt: 1 /* margin top */ }}>
        Log in
      </Button>
      {loginError && (
        <Stack spacing={2}>
          <Typography color="danger">{loginError}</Typography>
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
