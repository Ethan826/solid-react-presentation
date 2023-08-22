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
] as const;

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="md" style={{ paddingTop: "20px" }}>
      <CssBaseline />
      <Weather stations={STATIONS} />
    </Container>
  </ThemeProvider>
);

export default App;
