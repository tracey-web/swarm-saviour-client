import React from "react";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  MenuItem,
  Menu,
  useScrollTrigger,
  Slide,
} from "@mui/material";
import { alpha, styled } from "@mui/system";

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

const NavBar = ({ handleClose, handleClick, open, anchorEl }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "fixed",
      top: "0",
      zIndex: "100",
      width: "100%",
    }}
    className="header"
  >
    <img
      style={{
        objectFit: "contain",
        height: "100px",
        paddingTop: "20px",
        paddingLeft: "14px",
        paddingRight: "14px",
      }}
      className="header_icon"
      src="./img/ssLogo.png"
      alt="swarm saviour logo with bee"
    />
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
      <OutlinedInput
        sx={{ borderRadius: "50px" }}
        id="outlined-adornment-password"
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="Search" edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>

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
      <NavButton aria-label="Language" edge="end">
        <LanguageIcon />
      </NavButton>
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
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  </Box>
);

export default Header;
