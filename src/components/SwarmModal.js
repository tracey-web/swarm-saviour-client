import React, { useState } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import PlaceSearch from "./placeSearch";
import { isSignedIn, getAuthedUser } from "../services/userService";
import { Box } from "@mui/system";

const SwarmModal = ({ modalState, setModalState, toggleOpen, reportSwarm }) => {
  const [userState, setUserState] = useState({
    email: "",
    password: "",
    phone: "",
    isNewMember: false,
  });
  const [locationValue, setLocationValue] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [address, setAddress] = React.useState({
    address: "",
    lat: "",
    long: "",
  });

  const isSwarm = modalState.screen === "swarm";
  const signedIn = isSignedIn();
  const { user } = getAuthedUser();
  const userFormComplete =
    // existing user, not logged in
    (!userState.isNewMember && userState.email && userState.password) ||
    // new user sign up
    (userState.isNewMember &&
      userState.email &&
      userState.password &&
      userState.phone) ||
    // user already signed in
    signedIn;
  return (
    <Modal open={modalState.open} onClose={toggleOpen}>
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
              <IconButton
                onClick={() =>
                  setModalState({ ...modalState, screen: "swarm" })
                }
              >
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
          <SwarmContent
            locationValue={locationValue}
            setLocationValue={setLocationValue}
            description={description}
            setDescription={setDescription}
            setAddress={setAddress}
          />
        ) : (
          <UserContent
            userState={userState}
            setUserState={setUserState}
            isSignedIn={signedIn}
            user={user}
          />
        )}
        <CardActions sx={{ padding: 4 }}>
          {isSwarm ? (
            <Button
              variant="contained"
              fullWidth
              onClick={() => setModalState({ ...modalState, screen: "user" })}
              disabled={!description || !address.address}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="contained"
              fullWidth
              onClick={() => reportSwarm(address, description, userState)}
              disabled={!userFormComplete}
            >
              Report
            </Button>
          )}
        </CardActions>
      </Card>
    </Modal>
  );
};

const SwarmContent = ({
  locationValue,
  setLocationValue,
  setAddress,
  description,
  setDescription,
}) => (
  <CardContent>
    <PlaceSearch
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
);

const UserContent = ({ userState, setUserState, isSignedIn, user }) => (
  <CardContent>
    {!isSignedIn && (
      <>
        <Typography sx={{ textAlign: "center" }} variant="h5">
          {userState.isNewMember ? "Sign up" : "Sign in"}
        </Typography>
        <TextField
          sx={{ mb: 3, mt: 3 }}
          required
          fullWidth
          name="email"
          label="Email"
          variant="outlined"
          value={userState.email}
          onChange={(event) =>
            setUserState({ ...userState, email: event.target.value })
          }
        />
        <TextField
          sx={{ mb: 3 }}
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={userState.password}
          onChange={(event) =>
            setUserState({ ...userState, password: event.target.value })
          }
        />
        {userState.isNewMember && (
          <TextField
            sx={{ mb: 3 }}
            required
            fullWidth
            name="phone"
            label="Phone"
            variant="outlined"
            value={userState.phone}
            onChange={(event) =>
              setUserState({ ...userState, phone: event.target.value })
            }
          />
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1">
            {userState.isNewMember ? "Already a member?" : "not a member?"}
          </Typography>
          <Button
            variant="text"
            color="secondary"
            onClick={() => {
              setUserState({
                ...userState,
                isNewMember: !userState.isNewMember,
              });
            }}
          >
            {userState.isNewMember ? "Sign in" : "Sign up"}
          </Button>
        </Box>
      </>
    )}
    {isSignedIn && (
      <>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          This swarm will be reported by:
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {user.email}
        </Typography>
      </>
    )}
  </CardContent>
);

export default SwarmModal;
