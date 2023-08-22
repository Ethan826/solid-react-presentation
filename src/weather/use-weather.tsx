import * as E from "fp-ts/Either";
import { useEffect, useState } from "react";
import { ForecastArray, ObservationArray } from "../codecs";
import { Fetcher } from "../services/fetcher";
import { Product } from "./types";

const urlForProduct = (stations: ReadonlyArray<string>) => (product: Product) =>
  product === "forecast"
    ? `/data/taf.php?ids=${stations.join(",")}&format=json`
    : `/data/metar.php?ids=${stations.join(",")}&format=json`;

export const useWeather = <T extends ObservationArray | ForecastArray>(
  fetcher: Fetcher<T>,
  stations: ReadonlyArray<string>,
  product: Product
): E.Either<unknown, T> => {
  const url = urlForProduct(stations)(product);

  const [weather, setWeather] = useState<E.Either<unknown, T>>(
    // FIXME
    E.right<unknown, T>([] as any)
  );

  useEffect(() => {
    fetcher(url).then(setWeather);
  }, [fetcher]);

  return weather;
};
