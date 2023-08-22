import { Grid, Button } from "@mui/material";
import { TemperatureUnit } from "../types";

export type TemperatureControlProps = {
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: React.Dispatch<React.SetStateAction<TemperatureUnit>>;
};

export const TemperatureControls = ({
  temperatureUnit,
  setTemperatureUnit,
}: TemperatureControlProps) => (
  <Grid item xs={12}>
    <>
      <Button
        variant={temperatureUnit === "C" ? "contained" : "outlined"}
        onClick={() => setTemperatureUnit("C")}
      >
        Celsius
      </Button>
      <Button
        variant={temperatureUnit === "F" ? "contained" : "outlined"}
        onClick={() => setTemperatureUnit("F")}
      >
        Fahrenheit
      </Button>
    </>
  </Grid>
);
