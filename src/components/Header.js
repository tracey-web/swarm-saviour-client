import React from "react";
import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  MenuItem,
  Menu,
  useScrollTrigger,
  Slide,
  Paper,
} from "@mui/material";
import { alpha, styled } from "@mui/system";
import { useNavigate } from "react-router";
import { signOut } from "../services/userService";

const TextButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: "50px",
  color: alpha("#000000", 0.54),
  padding: 16,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 0.14),
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  borderRadius: "50px",
  paddingTop: 16,
  paddingBottom: 16,
  color: alpha("#000000", 0.54),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 0.14),
  },
}));

const Header = ({ slide = false }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  return slide ? (
    <Slide appear={true} direction="down" in={trigger}>
      <div>
        <NavBar
          handleClose={handleClose}
          handleClick={handleClick}
          open={open}
          anchorEl={anchorEl}
        />
      </div>
    </Slide>
  ) : (
    <NavBar
      handleClose={handleClose}
      handleClick={handleClick}
      open={open}
      anchorEl={anchorEl}
    />
  );
};

const NavBar = ({ handleClose, handleClick, open, anchorEl }) => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: "0",
        zIndex: "100",
        width: "100%",
        borderRadius: 0,
      }}
      elevation={3}
      className="header"
    >
      <img
        style={{
          objectFit: "contain",
          height: "100px",
          paddingTop: "20px",
          paddingLeft: "14px",
          paddingRight: "14px",
          cursor: "pointer",
        }}
        className="header_icon"
        src="./img/ssLogo.png"
        alt="swarm saviour logo with bee"
        onClick={() => navigate("/")}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "20",
          marginRight: "80px",
        }}
        className="header_right"
      >
        <TextButton variant="text">Bee a Swarm Saviour</TextButton>
        <NavButton
          id="profile-button"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "76px",
          }}
          aria-label="Language"
          edge="end"
          aria-controls="profile-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
          <AccountCircleIcon />
        </NavButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "pofile-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem
            onClick={() => {
              signOut();
              handleClose();
              navigate("/");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

export default Header;
