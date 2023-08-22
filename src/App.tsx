import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { Weather } from "./Weather";

const defaultTheme = createTheme();

const STATIONS = [
  "KRDU",
  "KMCO",
  "KDCA",
  "KJFK",
  "KORD",
  "KDFW",
  "KLAX",
  "KSAN",
];

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Weather stations={STATIONS} product="observation" />
    </Container>
  </ThemeProvider>
);

export default App;
