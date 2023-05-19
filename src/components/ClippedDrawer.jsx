import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Login from "./Login";
import Register from "./Register";
import { Grid } from "@mui/material";
import { useState } from "react";

const drawerWidth = 200;

export default function ClippedDrawer({
  theme,
  openMenu,
  handleMenu,
  setIsLoggedIn,
  isLoggedIn,
  allUserRiffs,
  setRiff,
  setIsRegistering,
  user,
  setOpen,
  setMessage,
  message,
}) {
  const [signup, setSignup] = useState(false);
  return (
    <Box sx={{ display: "flex", fontFamily: "Poppins" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{ background: theme.palette.background.topNav }}
      >
        <Toolbar>
          <MenuIcon sx={{ paddingRight: 2 }} onClick={() => handleMenu(openMenu ? false : true)} />
          <Grid container direction="row" justifyContent="space-between">
            <Typography variant="h6" noWrap component="div">
              Riff Creator
            </Typography>
            {signup && (
              <Register
                setMessage={setMessage}
                message={message}
                setOpen={setOpen}
                signup={signup}
                setSignup={setSignup}
              />
            )}
            {!isLoggedIn && !signup && (
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setMessage={setMessage}
                setOpen={setOpen}
                signup={signup}
                setSignup={setSignup}
              />
            )}
            {isLoggedIn && `Logged in as ${user.username}`}
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={openMenu}
        ModalProps={{
          onClose: (event, reason) => {
            if (reason === "backdropClick") {
              handleMenu(false);
            }
          },
        }}
        sx={{
          backgroundColor: "#090D1B",

          width: drawerWidth,
          textAlign: "center",
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundImage: theme.palette.navBar,

            color: "#8A909E",
            boxShadow: "2px 0px 4px rgba(0, 0, 0, 0.3)",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"My Riffs"} />
              </ListItemButton>
            </ListItem>

            {allUserRiffs.map((each, index) => (
              <ListItemText
                key={index}
                primary={each.settings.title}
                onClick={() => setRiff(each)}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: "white",
                  },
                }}
              />
            ))}
          </List>
          <Divider />
          <List>
            {["All riffs"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
