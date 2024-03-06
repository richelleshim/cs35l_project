import React from "react";
import { useState } from "react";
import { useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { Box, Stack } from "@mui/joy";
import Login from "./Login";
import SignUp from "./SignUp";

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
        <div>
          <Stack>
            <img src="/Bruingram.png" alt="Bruingram" />
          </Stack>
        </div>

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
