import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";

import { Box } from "@mui/system";
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import parse from "autosuggest-highlight/parse";
//import GoogleMaps from "../components/placeSearch";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api";
import { libraries } from "../components/Map";

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [modalState, setModalState] = React.useState("swarm");
  const toggleOpen = () => setOpen(!open);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [locationValue, setLocationValue] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [address, setAddress] = React.useState({
    address: "",
    lat: "",
    long: "",
  });

  // const setLocation = (location) => {
  //   console.log(location);
  //   setLocationValue(location);
  // };

  const isSwarm = modalState === "swarm";

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   signIn({ email, password });
  // };

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
          <CardHeader
            avatar={
              !isSwarm ? (
                <IconButton onClick={() => setModalState("swarm")}>
                  <ArrowBackIcon />
                </IconButton>
              ) : (
                <></>
              )
            }
            action={
              !isSwarm ? (
                <IconButton onClick={toggleOpen}>
                  <CloseIcon />
                </IconButton>
              ) : (
                <></>
              )
            }
            sx={{ textAlign: "center" }}
            title="Report a Swarm"
          />
          {isSwarm ? (
            <CardContent>
              <Search
                locationValue={locationValue}
                setLocationValue={setLocationValue}
                setAddress={setAddress}
              />
              <TextField
                sx={{ mt: 2 }}
                required
                fullWidth
                multiline
                minRows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Where is it located on the property?"
              />
            </CardContent>
          ) : (
            <CardContent>
              <TextField
                sx={{ mb: 3 }}
                required
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                sx={{ mb: 6 }}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </CardContent>
          )}
          <CardActions sx={{ padding: 4 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setModalState("user")}
              disabled={!description || !address.address}
            >
              Continue
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </Box>
  );
};

const Search = ({ locationValue, setLocationValue, setAddress }) => {
  const {
    ready,
    value,
    suggestions: { data },
    setValue,
    //   clearSuggestion,
  } = usePlacesAutocomplete();
  return (
    <Autocomplete
      disabled={!ready}
      filterOptions={(x) => x}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      value={locationValue}
      options={data}
      autoComplete
      includeInputInList
      filterSelectedOptions
      onChange={async (e, address) => {
        try {
          const results = await getGeocode({ address: address.description });
          const { lat, lng } = await getLatLng(results[0]);
          console.log(lat, lng);
          setAddress({ address: address.description, lat, long: lng });
        } catch (error) {
          console.log("ERROR: ", error);
        }

        //console.log(address);
        setLocationValue(address);
      }}
      inputValue={value}
      onInputChange={(e, newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: "text.secondary", mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default Home;
