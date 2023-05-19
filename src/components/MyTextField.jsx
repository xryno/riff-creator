import OutlinedInput from "@mui/material/OutlinedInput";

export default function MyTextField({ title, handleSettingsChange }) {
  return (
    <OutlinedInput
      id="outlined-basic"
      value={title}
      onChange={(event) => handleSettingsChange(event.target.value, "title")}
      variant="outlined"
      sx={{
        // set": {
        //   borderColor: "#1976D2",
        // },
        // "&:hover fieldset": {
        //   borderColor: "#1976D2",
        // },
        // "&.Mui-focused fieldset": {
        //   borderColor: "#1976D2",

        marginBottom: 4,
        width: 200,
        height: 45,
        border: "1px solid #1976D2",
        color: "white",

        ":before": {
          borderBottom: "1px solid #004CFF",
          opacity: 0.2,
        },
        ":hover:before": {
          borderBottomColor: "#8A909E",
          opacity: 0.2,
        },
        ":after": {
          borderBottomColor: "#1C93A3",
        },
      }}
    />
  );
}
