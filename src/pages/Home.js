import React from "react";
import Header from "../components/header";

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
  const toggleOpen = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Header />
      <Box
        sx={{
          paddingTop: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Card sx={{ maxWidth: "500px" }}>
          <CardMedia
            component="img"
            image="./img/HomePageSS.png"
            alt="swarm saviour drawn bee and flowers"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Bee a hero
            </Typography>
            <Typography variant="body2" color="text.secondary">
              BZZZZ!
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: "500px" }}>
          <CardMedia component="img" image="./img/home-swarm.png" alt="swarm" />
          <CardActions sx={{ padding: 4 }}>
            <Button
              sx={{ textTransform: "none" }}
              variant="contained"
              fullWidth
              onClick={toggleOpen}
            >
              Report a Swarm
            </Button>
          </CardActions>
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
            <Button
              sx={{ textTransform: "none" }}
              variant="contained"
              fullWidth
              onClick={toggleOpen}
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
