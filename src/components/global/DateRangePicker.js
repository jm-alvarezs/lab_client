import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { MobileDateRangePicker } from "@mui/x-date-pickers-pro/MobileDateRangePicker";
import { DesktopDateRangePicker } from "@mui/x-date-pickers-pro/DesktopDateRangePicker";

const DateRangePicker = ({ modifier }) => {
  const [value, setValue] = useState([null, null]);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (typeof modifier === "function") {
      modifier(newValue);
    }
  };

  return (
    <Stack spacing={3}>
      <LocalizationProvider
        className="show-mobile"
        dateAdapter={AdapterDayjs}
        localeText={{ start: "Inicio", end: "Fin" }}
      >
        <MobileDateRangePicker
          value={value}
          onChange={handleChange}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> hasta </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
      <LocalizationProvider
        className="hide-mobile"
        dateAdapter={AdapterDayjs}
        localeText={{ start: "Inicio", end: "Fin" }}
      >
        <DesktopDateRangePicker
          value={value}
          onChange={handleChange}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> hasta </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </Stack>
  );
};

export default DateRangePicker;
