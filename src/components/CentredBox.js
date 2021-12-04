import { Box } from "@mui/system";
import React from "react";

const CentredBox = (props) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100vh",
    }}
  >
    {props.children}
  </Box>
);

export default CentredBox;
