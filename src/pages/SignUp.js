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
} from "@mui/material";
import CentredBox from "../components/CentredBox";
import { Box } from "@mui/system";

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
    <CentredBox>
      <Card sx={{ maxWidth: 345 }} variant="outlined">
        <CardHeader sx={{ textAlign: "center" }} title="Sign Up Form" />
        <CardContent>
          <form onSubmit={handleSubmit} id="signup-form">
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
            <TextField
              sx={{ mb: 6, width: "315px" }}
              required
              name="phone"
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                sx={{ mb: 5 }}
                variant="contained"
                type="submit"
                form="signin-form"
                value="continue"
              >
                Sign Up
              </Button>
            </Box>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              Already have an account?
              <Link
                sx={{ ml: 2, textDecoration: "none" }}
                color="secondary"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Link>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </CentredBox>
  );
}
