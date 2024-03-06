import { Box, Grid, Sheet, Stack } from "@mui/joy";
import AuthForm from "../components/Auth/AuthForm";
const AuthPage = () => {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          alignContent="center"
        >
          <Stack
            direction="row"
            alignContent={"center"}
            justifyContent={"centered"}
          >
            <Box padding={0} margin={0}>
              <img
                src="/authenticationBruin.png"
                alt="bruin img"
                height={400}
              />
            </Box>
            <Box height="25vh">
              <AuthForm />
            </Box>
          </Stack>
        </Box>
      </Grid>
    </>
  );
};

export default AuthPage;
