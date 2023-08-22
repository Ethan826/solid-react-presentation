import * as t from "io-ts";
import { ForecastArray, ObservationArray } from "../codecs";
import { Fetcher } from "../services/fetcher";

const fetchFetcherFactory =
  <T extends ForecastArray | ObservationArray>(
    codec: t.Decoder<unknown, T>
  ): Fetcher<T> =>
  (url: string) =>
    fetch(url, { mode: "cors" })
      .then((data) => data.json())
      .then((data) => codec.decode(data));

export const fetchForecastFetcher: Fetcher<ForecastArray> =
  fetchFetcherFactory(ForecastArray);

export const fetchObservationFetcher: Fetcher<ObservationArray> =
  fetchFetcherFactory(ObservationArray);
