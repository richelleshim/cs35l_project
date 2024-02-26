import { Container, Stack, Box, Input } from "@mui/joy";
import AuthForm from "../components/Auth/AuthForm";

const AuthPage = () => {
  return (
    <>
      <Box padding={2}>
        <img src="/Bruingram.png" alt="Bruingram" height={30} />
      </Box>
      <Box
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        px={4}
        borderColor={"gray"}
        height="100vh"
      >
        <Container padding={0} borderColor={"red"}>
          <Stack
            direction="row"
            alignItems={"stretch"}
            justifyContent={"center"}
          >
            <Box padding={0} margin={0}>
              <img
                src="/authenticationBruin.png"
                alt="phone img"
                height={400}
              />
            </Box>
            <Box height="25vh">
              <AuthForm />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default AuthPage;
