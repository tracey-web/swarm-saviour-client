import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { SERVER_URL } from "..";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Header from "../components/header";

import Button from "@mui/material/Button";
import { CardActions, Link, Typography } from "@mui/material";

import CentredBox from "../components/CentredBox";
import { Box } from "@mui/system";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (user) => {
    fetch(`${SERVER_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
          navigate("/");
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signIn({ email, password });
  };

  return (
    <>
      <Header />
      <CentredBox>
        <Card sx={{ maxWidth: 345 }} variant="outlined">
          <CardHeader sx={{ textAlign: "center" }} title="Sign In" />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                sx={{ mb: 3, width: "315px" }}
                required
                name="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                sx={{ mb: 6, width: "315px" }}
                required
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button sx={{ mb: 5 }} variant="contained" type="submit">
                  Sign In
                </Button>
              </Box>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="body1">Don't have an account?</Typography>
                <Button
                  sx={{ ml: 2, textDecoration: "none" }}
                  color="secondary"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </CentredBox>
    </>
  );
}
