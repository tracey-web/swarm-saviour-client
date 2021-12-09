import { IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Map from "../components/Map";
import { getSwarms } from "../services/swarmService";
import ExploreIcon from "@mui/icons-material/Explore";
import { isSignedIn } from "../services/userService";
import { useNavigate } from "react-router";

const SwarmLocator = () => {
  const [swarms, setSwarms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn()) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    let mounted = true;
    getSwarms().then((data) => {
      if (mounted) {
        setSwarms(data);
      }
    });

    return () => (mounted = false);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  return (
    <>
      <Header />
      <Box sx={{ pt: "100px", display: "flex" }}>
        <Box sx={{ flexGrow: 1, p: 2, overflow: "auto" }}>
          {swarms.map((swarm) => (
            <Paper key={swarm.id} sx={{ mb: 2, p: 4 }}>
              <Typography variant="body1">{swarm.address}</Typography>
              <Typography variant="subtitle2">{swarm.description}</Typography>
            </Paper>
          ))}
        </Box>
        <Box sx={{ display: "inline-block", width: "70%" }}>
          <Map markers={swarms} onMapLoad={onMapLoad} />
        </Box>
        <IconButton
          sx={{ position: "absolute", right: 4 }}
          onClick={() => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                panTo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
              },
              () => null
            );
          }}
        >
          <ExploreIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default SwarmLocator;
