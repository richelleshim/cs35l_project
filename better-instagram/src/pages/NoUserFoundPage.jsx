import React from "react";
import { CssBaseline, Typography, Sheet } from "@mui/joy";
import { Stack } from "@mui/joy";
import { Box } from "@mui/material";

const NoUserFoundPage = () => {
  return (
    <main>
      <CssBaseline />
      <Box justifyContent={"center"} alignContent={"center"}>
        <Stack direction="row">
          <img src="/authenticationBruin.png" alt="Bruingram" />
          <Box width="50vh" sx={{ pt: "25vh" }}>
            <Typography variant="h2">No User Found!</Typography>
          </Box>
        </Stack>
      </Box>
    </main>
  );
};

export default NoUserFoundPage;
