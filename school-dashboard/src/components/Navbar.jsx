import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SignOutButton from "./SignOutButton";
import Sidebar from "./Sidebar";
import { useUser } from "./UserContext";

export default function Navbar() {
  const [state, setState] = React.useState({
    left: false,
  });
  const { user } = useUser();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" sx={{ bgcolor: "#5a395b" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fusion University -{" "}
            {user != null && "" + user.userName + " - " + user.userRole}
          </Typography>
          <SignOutButton />
        </Toolbar>
      </AppBar>
      <Sidebar state={state} setState={setState} toggleDrawer={toggleDrawer} />
    </Box>
  );
}
