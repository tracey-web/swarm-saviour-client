import { SERVER_URL } from "..";
import { getAuthedUser } from "./userService";

export const reportSwarm = (swarm) => {
  const { token } = getAuthedUser();
  return fetch(`${SERVER_URL}/swarms`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      description: swarm.description,
      address: swarm.address,
      lat: swarm.lat,
      long: swarm.long,
    }),
  }).then((response) => response.json());
};

export const getSwarms = () => {
  const { token } = getAuthedUser();
  return fetch(`${SERVER_URL}/swarms`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
};
