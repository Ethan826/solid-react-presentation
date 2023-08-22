import { useState } from "react";
import { Grid } from "@mui/material";
import { ForecastArray, ObservationArray } from "../codecs";
import { Fetcher } from "../services/fetcher";
import { Observation } from "./observation";
import { Forecast } from "./forecast";
import { Product } from "./types";
import { ProductSelector } from "./product-selector";

export type WeatherProps = {
  readonly stations: ReadonlyArray<string>;
};

export type ProductSelectorProps = {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
};

export const Weather = ({
  stations,
  forecastFetcher,
  observationFetcher,
}: {
  stations: ReadonlyArray<string>;
  forecastFetcher: Fetcher<ForecastArray>;
  observationFetcher: Fetcher<ObservationArray>;
}) => {
  const [product, setProduct] = useState<Product>("observation");

  return (
    <Grid container spacing={2}>
      <ProductSelector product={product} setProduct={setProduct} />
      <Grid item xs={12}>
        {product === "forecast" ? (
          <Forecast stations={stations} fetcher={forecastFetcher} />
        ) : (
          <Observation stations={stations} fetcher={observationFetcher} />
        )}
      </Grid>
    </Grid>
  );
};
