import { useState } from "react";
import { useNavigate } from "react-router";
import { SERVER_URL } from "..";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Link,
  Typography,
} from "@mui/material";
import CentredBox from "../components/CentredBox";
import { Box } from "@mui/system";
import Header from "../components/header";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const signUp = (user) => {
    fetch(`${SERVER_URL}/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: user.email,
          password: user.password,
          phone: user.phone,
        },
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
    signUp({ email, password, phone });
  };

  return (
    <>
      <Header />
      <CentredBox>
        <Card sx={{ maxWidth: 345 }} variant="outlined">
          <CardHeader sx={{ textAlign: "center" }} title="Sign Up" />
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
                sx={{ mb: 6 }}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <TextField
                sx={{ mb: 6 }}
                required
                fullWidth
                name="phone"
                label="Phone"
                variant="outlined"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  sx={{ mb: 5, textTransform: "none" }}
                  variant="contained"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Box>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="body1">
                  {" "}
                  Already have an account?
                </Typography>
                <Button
                  sx={{ ml: 2 }}
                  color="secondary"
                  onClick={() => navigate("/signin")}
                  variant="text"
                >
                  Sign In
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </CentredBox>
    </>
  );
}
