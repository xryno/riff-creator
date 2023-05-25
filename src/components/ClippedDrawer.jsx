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
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
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
  allRiffs,
  user,
  setOpen,
  setMessage,
  message,
  logout,
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
            {isLoggedIn && (
              <div style={{ display: "flex", alignItems: "center" }}>
                Logged in as {user.username}{" "}
                <LogoutIcon
                  onClick={logout}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      color: "white",
                    },
                    marginLeft: 2,
                  }}
                />
              </div>
            )}
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
                  <MusicNoteIcon />
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
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MusicNoteIcon />
                </ListItemIcon>
                <ListItemText primary={"All Riffs"} />
              </ListItemButton>
            </ListItem>
            {allRiffs.map((each, index) => (
              <ListItemText
                key={index}
                primary={each.settings.title}
                secondary={`Author: ${each.settings.author}`}
                secondaryTypographyProps={{ color: "#8DC2C7" }}
                onClick={() => setRiff(each)}
                sx={{
                  color: "white",
                  "&:hover": {
                    cursor: "pointer",
                    color: "#79CFF7",
                  },
                  marginBottom: 2,
                }}
              />
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
