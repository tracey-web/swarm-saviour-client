import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";

import { Box } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";
import { libraries } from "../components/Map";
import SwarmModal from "../components/SwarmModal";
import { signIn, signUp } from "../services/userService";
import { reportSwarm } from "../services/swarmService";

const Home = () => {
  const navigate = useNavigate();

  const [modalState, setModalState] = React.useState({
    open: false,
    screen: "swarm",
  });
  const toggleOpen = () =>
    setModalState({ ...modalState, open: !modalState.open });

  const handleSubmit = (address, description, userState) => {
    if (!userState.email && !userState.password && !userState.isNewMember) {
      // already signed in
      handleReportSwarm(description, address);
    } else if (userState.isNewMember) {
      signUp(userState).then((success) => {
        if (success) {
          handleReportSwarm(description, address);
        }
      });
    } else {
      signIn(userState).then((success) => {
        if (success) {
          handleReportSwarm(description, address);
        }
      });
    }
  };

  const handleReportSwarm = (description, address) => {
    reportSwarm({
      description,
      address: address.address,
      lat: address.lat,
      long: address.long,
    }).then((result) => {
      if (result.swarm) {
        navigate("/swarms");
      }
    });
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

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
      <SwarmModal
        modalState={modalState}
        setModalState={setModalState}
        toggleOpen={toggleOpen}
        reportSwarm={handleSubmit}
      />
    </Box>
  );
};

export default Home;
