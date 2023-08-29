import { ForecastArray, ObservationArray } from "../codecs";
import { Fetcher } from "../services/fetcher";
import * as t from "io-ts";
import * as E from "fp-ts/Either";
import { formatValidationErrors } from "io-ts-reporters";

import * as TE from "fp-ts/TaskEither";
import { flow, identity, pipe } from "fp-ts/function";

const fetchFetcherFactory =
  <T>(codec: t.Decoder<unknown, T>): Fetcher<T> =>
  (url: string) =>
    pipe(
      TE.tryCatch(() => fetch(url, { mode: "cors" }), identity),
      TE.flatMap((data) => TE.tryCatch(() => data.json(), identity)),
      TE.flatMap(
        flow(
          codec.decode,
          E.mapLeft(formatValidationErrors),
          TE.fromEither,
          TE.tapError((e) => TE.fromIO(() => console.error(e)))
        )
      )
    );

export const fetchForecastFetcher: Fetcher<ForecastArray> =
  fetchFetcherFactory(ForecastArray);

export const fetchObservationFetcher: Fetcher<ObservationArray> =
  fetchFetcherFactory(ObservationArray);
