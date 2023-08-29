import { z } from "zod";
import { ForecastArray, ObservationArray } from "../codecs";
import { Fetcher } from "../services/fetcher";

const fetchFetcherFactory =
  <T>(codec: z.ZodType<T>): Fetcher<T> =>
  (url: string) =>
    fetch(url, { mode: "cors" })
      .then((data) => data.json())
      .then(codec.parse);

export const fetchForecastFetcher: Fetcher<ForecastArray> = fetchFetcherFactory(
  ForecastArray as z.ZodType
);

export const fetchObservationFetcher: Fetcher<ObservationArray> =
  fetchFetcherFactory(ObservationArray as z.ZodType);
