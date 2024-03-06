import { Box, Grid, Sheet, Stack } from "@mui/joy";
import AuthForm from "../components/Auth/AuthForm";
const AuthPage = () => {
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Stack
          direction="row"
          alignContent={"center"}
          justifyContent={"centered"}
        >
          <Box padding={0} margin={0}>
            <img src="/authenticationBruin.png" alt="bruin img" height={400} />
          </Box>
          <Box height="25vh">
            <AuthForm />
          </Box>
        </Stack>
      </Grid>
    </div>
  );
};

export default AuthPage;