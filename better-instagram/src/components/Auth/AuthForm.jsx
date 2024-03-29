import React from "react";
import { useState } from "react";
import { CssBaseline, Typography, Sheet } from "@mui/joy";
import { Box, Stack } from "@mui/joy";
import Login from "./Login";
import SignUp from "./Signup";
import GoogleAuth from "./GoogleSignIn";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main>
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: "auto", // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <Stack>
          <img src="/Bruingram.png" alt="Bruingram" />
        </Stack>

        {isLogin ? <Login /> : <SignUp />}
        <Typography
          endDecorator={
            <Typography onClick={() => setIsLogin(!isLogin)}>
              {!isLogin ? (
                <Box
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <Typography
                    color="0018F9"
                    sx={{ textDecoration: "underline" }}
                  >
                    Log In
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <Typography
                    color="0018F9"
                    sx={{ textDecoration: "underline" }}
                  >
                    Sign Up
                  </Typography>
                </Box>
              )}
            </Typography>
          }
          fontSize="sm"
          sx={{ alignSelf: "center" }}
        >
          {isLogin ? (
            <Typography>Don't have an account?</Typography>
          ) : (
            <Typography>Have an account?</Typography>
          )}
        </Typography>
      </Sheet>
    </main>
  );
}
