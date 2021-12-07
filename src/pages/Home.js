import React from "react";
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
  Modal,
  TextField,
  Typography,
} from "@mui/material";

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [modalState, setModalState] = React.useState("swarm");
  const toggleOpen = () => setOpen(!open);
  const navigate = useNavigate();

  const isSwarm = modalState === "swarm";

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
          <CardHeader sx={{ textAlign: "center" }} title="Report a Swarm" />
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
          <CardActions sx={{ padding: 4 }}>
            <Button variant="contained" fullWidth onClick={toggleOpen}>
              Continue
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </Box>
  );
};

export default Home;
