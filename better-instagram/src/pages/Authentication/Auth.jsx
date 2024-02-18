import { Container, Stack, Box, Input } from "@mui/joy";

const AuthPage = () => {
  return (
    <Box
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      px={4}
      borderColor={"gray"}
      height="100vh"
    >
      <Container padding={0} borderColor={"red"}>
        <Stack direction="row" alignItems={"stretch"}>
          <Box height="25vh">
            <img src="/authenticationBruin.png" alt="phone img" />
          </Box>
          <Box height="25vh">
            <Input>Enter UserName</Input>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default AuthPage;
