import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import SpeedIcon from "@mui/icons-material/Speed";

export default function InputSlider({ handleSettingsChange, settings }) {
  return (
    <Box sx={{ width: 200 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <SpeedIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={settings.tempo}
            onChange={(event) => handleSettingsChange(event.target.value, "tempo")}
            aria-labelledby="input-slider"
            min={40}
            max={200}
          />
        </Grid>
        <Grid item>{settings.tempo}</Grid>
      </Grid>
    </Box>
  );
}
