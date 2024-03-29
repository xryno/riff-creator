import { useState, useEffect } from "react";
import Guitar from "./Guitar";
import Drum from "./Drum";
import InputSlider from "./components/InputSlider";
import "./App.css";
import ClippedDrawer from "./components/ClippedDrawer";
import { ThemeProvider, createTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { getUser, getToken, resetUserSession, setUserSession } from "./service/auth";
import SnackBar from "./components/SnackBar";
import _ from "lodash";
import axios from "axios";
import TextField from "@mui/material/TextField";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins"],
  },
  palette: {
    background: {
      default: "rgb(1, 9, 17)",
      paper: "#CBCBCB",
      topNav: "#0A3757",
    },
    tableBg: "#202940",
    navBar: `linear-gradient(rgba(10, 55, 87, 1), rgba(10, 55, 87, 1))`,
    teal: "#00577C",
    text: {
      primary: "#D3CAC2",
      secondary: "white",
      error: "#F00",
    },
    blue: "#1976D2",
  },
});

function App() {
  const blankRiff = [
    [
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
    ],
    [
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
    ],
    [
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
    ],
    [
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
    ],
    [
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
    ],
    [
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
    ],
  ];

  const blankDrum = [
    [
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
    ],
    [
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
    ],
    [
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
    ],
    [
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
    ],
    [
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
    ],
    [
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
    ],
  ];

  const requestConfig = {
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY,
    },
  };

  const user = getUser();
  const defaultSettings = {
    tempo: 120,
    guitar: "distorted",
    tuning: "standard",
    author: user.username,
    title: "",
  };
  async function fetchItems() {
    try {
      const riffUrl = `https://0e66xn1mo3.execute-api.eu-west-2.amazonaws.com/production/riffs?userId=${user.userId}`;
      const response = await axios.get(riffUrl, requestConfig);
      const riffData = response.data;
      setAllUserRiffs(riffData.entries);
      const newestEntry = _.maxBy(riffData.entries, function (o) {
        return o.lastUpdated;
      });
      setStringData(newestEntry.guitar);
      setDrumData(newestEntry.drums);
      setEntryId(newestEntry.entryId);
    } catch (err) {
      setSettings({
        tempo: 120,
        guitar: "distorted",
        tuning: "standard",
        author: getUser().username,
        title: "",
      });
      console.log(err);
    }
  }

  async function fetchAllRiffs() {
    try {
      const allRiffUrl =
        "https://0e66xn1mo3.execute-api.eu-west-2.amazonaws.com/production/allentries";
      const response = await axios.get(allRiffUrl, requestConfig);
      const riffData = response.data;
      setAllRiffs(riffData.entries);
    } catch (err) {
      console.log(err);
    }
  }

  const [stringData, setStringData] = useState(blankRiff);
  const [drumData, setDrumData] = useState(blankDrum);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const [settings, setSettings] = useState(defaultSettings);
  const [saveData, setSaveData] = useState();
  const [openMenu, setOpenMenu] = useState(false);
  const [margin, setMargin] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAuthenticating, setAuthenticating] = useState(false);
  const [allUserRiffs, setAllUserRiffs] = useState([]);
  const [allRiffs, setAllRiffs] = useState([]);
  const [entryId, setEntryId] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const drumNames = ["Crash", "Ride", "Open", "Closed", "Snare", "Kick"];
  const [stringNames, setStringNames] = useState(["E", "B", "G", "D", "A", "E"]);
  const verifyUrl = "https://0e66xn1mo3.execute-api.eu-west-2.amazonaws.com/production/verifytoken";

  useEffect(() => {
    const verifyToken = async () => {
      const token = getToken();
      if (token === null) {
        return;
      }

      const requestBody = {
        user: getUser(),
        token: token,
      };

      try {
        const response = await axios.post(verifyUrl, requestBody, requestConfig);
        setUserSession(response.data.user, response.data.token);
        setIsLoggedIn(true);
      } catch (error) {
        resetUserSession();
      }
    };
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    isLoggedIn && fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    fetchAllRiffs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSaveData({ guitar: stringData, drums: drumData, settings: settings });
    settings.tuning !== "dropd"
      ? setStringNames(["E", "B", "G", "D", "A", "E"])
      : setStringNames(["E", "B", "G", "D", "A", "D"]);
  }, [stringData, drumData, settings]);

  const logout = () => {
    resetUserSession();
    setIsLoggedIn(false);
    setStringData(blankRiff);
    setDrumData(blankDrum);
    setSettings(defaultSettings);
    setMessage("You have now logged out.");
    setOpen(true);
  };

  const handleStringDataChange = (stringIndex, noteIndex, noteValue) => {
    const newStringData = [...stringData];
    newStringData[stringIndex][noteIndex] = noteValue;
    setStringData(newStringData);
  };

  const handleDrumDataChange = (drumIndex, noteIndex, noteValue) => {
    const newDrumData = [...drumData];
    newDrumData[drumIndex][noteIndex] = noteValue;
    setDrumData(newDrumData);
  };

  const handleSettingsChange = (value, name) => {
    const updatedSettings = {
      ...settings,
      [name]: value,
    };
    setSettings(updatedSettings);
    settings.tuning !== "dropd"
      ? setStringNames(["E", "B", "G", "D", "A", "E"])
      : setStringNames(["E", "B", "G", "D", "A", "D"]);
  };

  const setRiff = (riff) => {
    setStringData(riff.guitar);
    setDrumData(riff.drums);
    setSettings(riff.settings);
    setEntryId(riff.entryId);
  };

  const newRiff = () => {
    setStringData(blankRiff);
    setDrumData(blankDrum);
    setSettings({
      tempo: 120,
      guitar: "distorted",
      tuning: "standard",
      title: "",
      author: user.username,
    });
    setEntryId("");
  };

  let audioContext = null;

  const createAudioContext = () => {
    if (!audioContext) {
      audioContext = new AudioContext();
    }
    return audioContext;
  };

  const handleMenu = (value) => {
    setOpenMenu(value);
    value ? setMargin(200) : setMargin(0);
  };

  const handleSave = async () => {
    let payload = { ...saveData, userId: getUser().userId.toString() || "" };
    await fetch("https://0e66xn1mo3.execute-api.eu-west-2.amazonaws.com/production/riffs", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
    });
    fetchItems();
    setMessage("Riff saved successfully!");
    setOpen(true);
  };

  const handleUpdate = async () => {
    let updatePayload = { ...saveData, userId: getUser().userId.toString() || "", entryId };
    await fetch("https://0e66xn1mo3.execute-api.eu-west-2.amazonaws.com/production/riffs", {
      method: "PUT",
      body: JSON.stringify(updatePayload),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
    });
    fetchItems();
    setMessage("Riff updated successfully!");
    setOpen(true);
  };

  const playNote = (filename, noteDuration) => {
    let audioContext = createAudioContext();
    let analyserNode = new AnalyserNode(audioContext, { fftSize: 128 });
    let audioElement = new Audio(filename);
    const sourceNode = audioContext.createMediaElementSource(audioElement);
    const convolverNode = audioContext.createConvolver();
    sourceNode.connect(analyserNode);
    sourceNode.connect(audioContext.destination);
    const visualizer = document.getElementById("visualizer");
    let animationFrameId;
    function drawVisualizer() {
      animationFrameId = requestAnimationFrame(drawVisualizer);
      let bufferLength = analyserNode.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      analyserNode.getByteFrequencyData(dataArray);
      const width = visualizer.width;
      const height = visualizer.height;
      const barWidth = width / bufferLength;
      const canvasContext = visualizer.getContext("2d");
      canvasContext.clearRect(0, 0, width, height);
      dataArray.forEach((item, index) => {
        const y = (item / 255) * height;
        const x = barWidth * index;
        const gradient = canvasContext.createLinearGradient(0, 0, 0, visualizer.height);
        gradient.addColorStop(0, "#00F996");
        gradient.addColorStop(0.5, "#B209D4");
        gradient.addColorStop(1, "#0791E1");
        canvasContext.fillStyle = gradient;
        canvasContext.fillRect(x, height - y, barWidth, y);
      });
    }
    drawVisualizer();
    audioElement.play();

    setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      convolverNode.buffer = null;
      sourceNode.buffer = null;
      audioElement.pause();
      audioElement.src = "";
    }, noteDuration);
  };

  const handlePlay = () => {
    setButtonDisabled(true);
    let noteDuration = 60 / (settings.tempo * 4);
    let currentNoteIndex = 0;

    const intervalId = setInterval(() => {
      stringData.forEach((notes, i) => {
        const noteValue = notes[currentNoteIndex];
        if (noteValue === "-") return;

        const noteValue2 = notes[currentNoteIndex + 1];
        const noteValue3 = notes[currentNoteIndex + 2];
        const noteValue4 = notes[currentNoteIndex + 3];

        const durationMultiplier =
          noteValue2 === "-" && noteValue3 === "-" && noteValue4 === "-"
            ? 4
            : noteValue2 === "-" && noteValue3 === "-"
            ? 3
            : noteValue2 === "-"
            ? 2
            : 1;

        let fileName;
        if (noteValue === "x") {
          fileName = "x.wav";
        } else if (noteValue.includes("m")) {
          let number = parseInt(noteValue.slice(0, -1), 10);
          if (settings.tuning === "dropd" && i + 1 === 6) {
            number -= 2;
          }
          fileName = `${number}m.wav`;
        } else if (noteValue.includes("ph")) {
          let number = parseInt(noteValue.slice(0, -2), 10);
          if (settings.tuning === "dropd" && i + 1 === 6) {
            number -= 2;
          }
          fileName = `${number}ph.wav`;
        } else {
          let number = parseInt(noteValue, 10);
          if (settings.tuning === "dropd" && i + 1 === 6) {
            number -= 2;
          }
          fileName = `${number}.wav`;
        }
        const fullPath = `sounds/${settings.guitar}/${i + 1}/${fileName}`;

        const duration = noteDuration * 1200 * durationMultiplier;
        playNote(fullPath, duration);
      });

      const drumFilenames = [
        "sounds/drums/crash.wav",
        "sounds/drums/ride.wav",
        "sounds/drums/open.wav",
        "sounds/drums/closed.wav",
        "sounds/drums/snare.wav",
        "sounds/drums/kick.wav",
      ];

      const drumDuration = 1000;

      for (let i = 0; i < drumData.length; i++) {
        const noteValue = drumData[i][currentNoteIndex];
        if (noteValue !== "-") {
          const filename = drumFilenames[i];
          playNote(filename, drumDuration);
        }
      }

      setProgressBar((prevCount) => prevCount + 23);
      currentNoteIndex++;
      if (currentNoteIndex === 64) {
        clearInterval(intervalId);
        setButtonDisabled(false);
        setProgressBar(0);
      }
    }, noteDuration * 1000);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <ClippedDrawer
          theme={theme}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          handleMenu={handleMenu}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          isAuthenticating={isAuthenticating}
          setAuthenticating={setAuthenticating}
          user={user}
          allUserRiffs={allUserRiffs}
          allRiffs={allRiffs}
          setRiff={setRiff}
          message={message}
          setMessage={setMessage}
          setOpen={setOpen}
          logout={logout}
        />

        <div
          style={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.background.paper,
            marginTop: 80,
            marginLeft: margin,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <Typography style={{ paddingBottom: 17, paddingRight: 125 }}>Riff info:</Typography>
              <TextField
                id="outlined-basic"
                label="Riff name:"
                variant="outlined"
                value={settings.title}
                onChange={(event) => handleSettingsChange(event.target.value, "title")}
                sx={{
                  width: 200,
                  height: 45,
                  marginBottom: 3,
                  color: "#FFFFFF",
                  "& label.Mui-focused": {
                    color: "#1976D2",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#1976D2",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#1976D2",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1976D2",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1976D2",
                    },
                  },
                }}
              />
              <div style={{ paddingBottom: 17, paddingRight: 135 }}>
                Author: {isLoggedIn ? settings.author || user.username : settings.author || "guest"}
              </div>
              <div
                style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
              >
                {!entryId ? (
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    style={{ height: 35, marginTop: 20 }}
                    disabled={!isLoggedIn}
                  >
                    Save
                  </Button>
                ) : (
                  user.username === settings.author && (
                    <Button
                      variant="contained"
                      onClick={handleUpdate}
                      style={{ height: 35, marginTop: 20 }}
                      disabled={!isLoggedIn}
                    >
                      Update
                    </Button>
                  )
                )}
                <Button
                  variant="contained"
                  onClick={newRiff}
                  style={{ height: 35, marginTop: 20, marginLeft: 7 }}
                >
                  New
                </Button>
              </div>
            </div>
            <canvas
              id="visualizer"
              style={{ marginTop: 20, width: "500px", height: "150px" }}
            ></canvas>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <Typography style={{ paddingBottom: 17, paddingRight: 105 }}>
                Riff settings:
              </Typography>
              <Box sx={{ width: 200, paddingBottom: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>Guitar:</InputLabel>
                  <Select
                    id="guitar-select"
                    value={settings.guitar || "distorted"}
                    label="Guitar"
                    onChange={(event) => handleSettingsChange(event.target.value, "guitar")}
                    MenuProps={{ PaperProps: { style: { backgroundColor: "#0FAF9C" } } }}
                    sx={{
                      height: 45,
                      marginBottom: 2,
                      color: "#D3CAC2",
                      "&.MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#1976D2",
                        },
                        "&:hover fieldset": {
                          borderColor: "#1976D2",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1976D2",
                        },
                      },
                    }}
                  >
                    <MenuItem value={"distorted"}>Distorted</MenuItem>
                    <MenuItem value={"clean"}>Clean</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Tuning:</InputLabel>

                  <Select
                    id="tuning-select"
                    value={settings.tuning || "standard"}
                    label="Tuning"
                    onChange={(event) => handleSettingsChange(event.target.value, "tuning")}
                    MenuProps={{ PaperProps: { style: { backgroundColor: "#0FAF9C" } } }}
                    sx={{
                      height: 45,
                      color: "#D3CAC2",
                      "&.MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#1976D2",
                        },
                        "&:hover fieldset": {
                          borderColor: "#1976D2",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1976D2",
                        },
                      },
                    }}
                  >
                    <MenuItem value={"standard"}>Standard</MenuItem>
                    <MenuItem value={"dropd"}>Drop D</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <InputSlider settings={settings} handleSettingsChange={handleSettingsChange} />
              <Button
                variant="contained"
                onClick={handlePlay}
                disabled={buttonDisabled}
                style={{ height: 35, marginTop: 20 }}
              >
                Play
              </Button>
            </div>
          </div>
          <div
            style={{
              paddingBottom: 20,
              paddingTop: 10,
              marginTop: 20,
              borderRadius: 10,
              backgroundImage: "linear-gradient(to bottom, #182E56, #0B56819B)",
              boxShadow: "2px 0px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3>Guitar</h3>
            {stringData.map((stringDataItem, stringIndex) => (
              <Guitar
                key={stringIndex}
                stringData={stringDataItem}
                name={stringNames[stringIndex]}
                onNoteChange={(noteIndex, noteValue) =>
                  handleStringDataChange(stringIndex, noteIndex, noteValue)
                }
              />
            ))}
          </div>
          <p></p>
          <div
            id="progress"
            style={{
              position: "relative",
              top: 0,
              zIndex: 0,
              marginLeft: 75,
              width: progressBar,
              backgroundColor: "#B0F7DC8F",
              height: "20px",
            }}
          ></div>

          <div
            style={{
              paddingBottom: 20,
              paddingTop: 10,
              marginTop: 20,
              borderRadius: 10,
              backgroundImage: "linear-gradient(to bottom, #182E56, #0B56819B)",
              boxShadow: "2px 0px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3>Drums</h3>
            {drumData.map((drumDataItem, drumIndex) => (
              <Drum
                key={drumIndex}
                drumData={drumDataItem}
                name={drumNames[drumIndex]}
                onNoteChange={(noteIndex, noteValue) =>
                  handleDrumDataChange(drumIndex, noteIndex, noteValue)
                }
              />
            ))}
          </div>
          <div style={{ marginTop: 40, marginLeft: 40, textAlign: "left" }}>
            <h3>How to use</h3>
            Guitar and drums can both be programmed by entering notes onto the grid. <p />
            The guitar grid is similar to guitar tabs. Click anywhere on the grid to start entering
            notes. <p />
            Notes can be of the following format:
            <li>0-12 on all strings for a standard note</li>
            <li>0m on strings 6, 5 and 4 for a muted note</li>
            <li>3ph on strings 6 and 5 for a pinch harmonic</li>
            <li>
              x can be entered directly after a note to stop it playing over another note if
              required
            </li>
            <p />
            To program drums, simply input x where you would like the drum hit to be.
          </div>
        </div>
      </ThemeProvider>
      <SnackBar open={open} setOpen={setOpen} message={message} />
    </>
  );
}

export default App;
