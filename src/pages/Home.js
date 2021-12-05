import React from "react";
import Header from "../components/header";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Box } from "@mui/system";
import { Slide } from "@mui/material";

function HideOnScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Home = () => {
  return (
    <Box>
      <HideOnScroll>
        <Header />
      </HideOnScroll>
      <h1>Home Content</h1>
      <Box sx={{ height: "200vh" }}></Box>
    </Box>
  );
};

export default Home;
