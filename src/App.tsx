import { CssBaseline, Container } from "@mui/material";
import { Weather } from "./weather";
import {
  fetchForecastFetcher,
  fetchObservationFetcher,
} from "./weather/fetcher-provider";

const STATIONS = [
  "KRDU",
  "KMCO",
  "KDCA",
  "KJFK",
  "KORD",
  "KDFW",
  "KLAX",
  "KSAN",
] as const;

const App = () => (
  <Container component="main" maxWidth="md" style={{ paddingTop: "20px" }}>
    <CssBaseline />
    <Weather
      stations={STATIONS}
      forecastFetcher={fetchForecastFetcher}
      observationFetcher={fetchObservationFetcher}
    />
  </Container>
);

export default App;
