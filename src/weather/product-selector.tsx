import { Button, Grid } from "@mui/material";
import { ProductSelectorProps } from ".";

export const ProductSelector = ({
  product,
  setProduct,
}: ProductSelectorProps) => (
  <Grid item xs={12}>
    <Button
      variant={product === "observation" ? "contained" : "outlined"}
      onClick={() => {
        setProduct("observation");
      }}
    >
      Observation
    </Button>
    <Button
      variant={product === "forecast" ? "contained" : "outlined"}
      onClick={() => {
        setProduct("forecast");
      }}
    >
      Forecast
    </Button>
  </Grid>
);
