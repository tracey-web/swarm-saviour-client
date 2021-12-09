import React from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,

  //  InfoWindow,
} from "@react-google-maps/api";

import mapStyles from "../styles/mapStyles";

export const libraries = ["places"];

const mapContainerStyle = {
  width: "70vw",
  height: `${window.innerHeight - 110}px`,
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

export default function Map({ markers, onMapLoad }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={center}
      options={options}
      onLoad={onMapLoad}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.long }}
          icon="./favicon.ico"
        />
      ))}
    </GoogleMap>
  );
}
