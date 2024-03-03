import {
  Container,
  Stack,
  Box,
  Input,
  Button,
  Typography,
  Divider,
} from "@mui/joy";
import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
// import GitHubIcon from "@mui/icons-material/GitHub";
import Login from "./Login";
import Signup from "./Signup";


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <Stack spacing={10}>
      <Box p={5} sx={{ border: "4px black" }}>
        <Stack spacing={2} alignItems={"center"}>
          <Container alignItems="center">
            <img src="/Bruingram.png" alt="Bruingram" height={40} />
          </Container>

          {isLogin ? <Login /> : <Signup />}
          {/* <Button color="neutral" variant="soft"> */}
          {/* <Divider>
            <Typography></Typography>
          </Divider> */}
          {/* <Stack direction="row" spacing={1}>
              <GoogleIcon width={"5px"} height={"5px"} />
              <Typography color="white" fontSize={14}>
                Log In With Google
              </Typography>
            </Stack>
          </Button> */}
          {/* <Button color="neutral" variant="soft">
          <Stack direction="row" spacing={1}>
            <GitHubIcon width={"5px"} height={"5px"} />
            <Typography color="white" fontSize={14}>
              Log In With GitHub
            </Typography>
          </Stack>
        </Button> */}
        </Stack>
        <Box p={5} sx={{ border: "1px black" }}>
          <Stack alignItems={"center"} justifyContent={"center"}>
            <Box mx={2} fontSize={14}>
              <Typography>
                {isLogin ? "Don't have an account?" : "Have an account?"}
                <Box onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Sign Up" : "Log in"}
                </Box>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default AuthForm;
