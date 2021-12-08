import React from "react";
import {
  GoogleMap,
  useLoadScript,
  //  Marker,
  //  InfoWindow,
} from "@react-google-maps/api";
//import { formatRelative } from "date-fns";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import { useAutocomplete } from "@mui/base";
// import { styled } from "@mui/material/styles";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: -42.876,
  lng: 147.396,
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_Key,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
      ></GoogleMap>
    </div>
  );
}
