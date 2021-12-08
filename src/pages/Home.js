import React, { useState } from "react";
import Header from "../components/header";
import { useNavigate } from "react-router";

import { Box } from "@mui/system";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { SERVER_URL } from "..";

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [modalState, setModalState] = React.useState("swarm");
  const toggleOpen = () => setOpen(!open);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSwarm = modalState === "swarm";

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
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Header slide={true} />
      <Box
        sx={{
          paddingTop: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Card sx={{ paddingTop: 4 }} variant="outlined">
          <Card
            sx={{
              width: "50%",
              height: "100%",
              display: "inline-block",
              boxShadow: "none",
            }}
          >
            <CardMedia
              component="img"
              image="./img/HomePageSS.png"
              alt="swarm saviour drawn bee and flowers"
            />
            <CardContent sx={{ paddingBottom: 0, paddingTop: 8 }}>
              <Typography sx={{ textAlign: "center" }} variant="h4">
                Want to view active swarms?
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="text"
                color="secondary"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
              <Typography sx={{ marginLeft: 1 }} variant="body1">
                or
              </Typography>
              <Button
                variant="text"
                color="secondary"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </CardActions>
          </Card>
          <Card
            sx={{
              width: "50%",
              height: "100%",
              display: "inline-block",
              boxShadow: "none",
            }}
          >
            <CardMedia
              component="img"
              image="./img/home-swarm.png"
              alt="swarm"
            />
            <CardActions sx={{ padding: 4 }}>
              <Button variant="contained" fullWidth onClick={toggleOpen}>
                Report a Swarm
              </Button>
            </CardActions>
          </Card>
        </Card>
      </Box>
      <Modal open={open} onClose={toggleOpen}>
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
          }}
        >
          <CardHeader
            avatar={
              !isSwarm ? (
                <IconButton onClick={() => setModalState("swarm")}>
                  <ArrowBackIcon />
                </IconButton>
              ) : (
                <></>
              )
            }
            action={
              !isSwarm ? (
                <IconButton onClick={toggleOpen}>
                  <CloseIcon />
                </IconButton>
              ) : (
                <></>
              )
            }
            sx={{ textAlign: "center" }}
            title="Report a Swarm"
          />
          {isSwarm ? (
            <CardContent>
              <TextField
                sx={{ marginBottom: 2 }}
                fullWidth
                placeholder="Address"
              />
              <TextField
                fullWidth
                multiline
                minRows={3}
                placeholder="Where is it located on the property?"
              />
            </CardContent>
          ) : (
            <CardContent>
              <TextField
                sx={{ mb: 3 }}
                required
                fullWidth
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
            </CardContent>
          )}
          <CardActions sx={{ padding: 4 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setModalState("user")}
            >
              Continue
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </Box>
  );
};

export default Home;
