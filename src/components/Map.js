import React from "react";
import {
  GoogleMap,
  useLoadScript,
  //  Marker,
  //  InfoWindow,
} from "@react-google-maps/api";
import { Box } from "@mui/system";
import mapStyles from "../styles/mapStyles";
//import { formatRelative } from "date-fns";

// import { useAutocomplete } from "@mui/base";
// import { styled } from "@mui/material/styles";

export const libraries = ["places"];

const mapContainerStyle = {
  width: "60vw",
  height: "100vh",
};
const center = {
  lat: -42.876,
  lng: 147.396,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <Box sx={{ margin: -1 }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
      ></GoogleMap>
    </Box>
  );
}
