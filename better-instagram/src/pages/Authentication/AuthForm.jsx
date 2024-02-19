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
import GitHubIcon from "@mui/icons-material/GitHub";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Box sx={{ border: 1, borderColor: "text.primary" }} padding={5}>
      <Stack spacing={2} alignItems={"center"}>

        <Container alignItems="center">
          <img src="/Bruingram.png" alt="Bruingram" height={40} />
        </Container>
        <Input placeholder="Email" fontSize="14" type="email"></Input>
        <Input placeholder="Password" fontSize="14" type="password"></Input>

        {!isLogin ? (
          <Input placeholder="Confirm Password" fontSize={14} type="password" />
        ) : null}
        <Stack direction="row"></Stack>

        <Button color="primary" size="sm" fontSize={14}>
          {isLogin ? "Log In" : "Sign Up"}
        </Button>
        <Button>
          {/* <Divider>
            <Typography>OR</Typography>
          </Divider> */}
          <Stack direction="row" spacing={1}>
            <GoogleIcon width={"5px"} height={"5px"} />
            <Typography color="white" fontSize={14}>
              Log In With Google
            </Typography>
          </Stack>
        </Button>
        <Button>
          <Stack direction="row" spacing={1}>
            <GitHubIcon width={"5px"} height={"5px"} />
            <Typography color="white" fontSize={14}>
              Log In With GitHub
            </Typography>
          </Stack>
        </Button>
      </Stack>
    </Box>
  );
};

export default AuthForm;
