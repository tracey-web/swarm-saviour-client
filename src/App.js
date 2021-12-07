import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import "@fontsource/amatic-sc";
import "@fontsource/poppins";

const theme = createTheme({
  palette: {
    primary: { main: "#81c784" },
    secondary: { main: "#ffab91" },
  },
  typography: {
    fontFamily: "Poppins",
    h1: {
      fontFamily: "Amatic SC",
    },
    h2: {
      fontFamily: "Amatic SC",
    },
    h3: {
      fontFamily: "Amatic SC",
    },
    h4: {
      fontFamily: "Amatic SC",
    },
    h5: {
      fontFamily: "Amatic SC",
    },
    h6: {
      fontFamily: "Amatic SC",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
