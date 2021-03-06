import { SERVER_URL } from "..";

export const isSignedIn = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return !!token && !!user;
};

export const getAuthedUser = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  return { token, user };
};

export const signIn = (user) => {
  return fetch(`${SERVER_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        return true;
      }
      return false;
    });
};

export const signUp = (user) => {
  return fetch(`${SERVER_URL}/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email: user.email,
        password: user.password,
        phone: user.phone,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        return true;
      }
      return false;
    });
};

export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
