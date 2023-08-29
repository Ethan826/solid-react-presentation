import * as E from "fp-ts/Either";
import * as T from "fp-ts/Task";
import { useEffect, useState } from "react";
import { Fetcher } from "../services/fetcher";
import { pipe } from "fp-ts/function";

export type WeatherHookFactoryParams<T> = {
  urlMaker: (stations: ReadonlyArray<string>) => string;
  fetcher: Fetcher<T>;
};

export const weatherHookFactory =
  <T,>({ urlMaker, fetcher }: WeatherHookFactoryParams<T>) =>
  (stations: ReadonlyArray<string>) => {
    const [weather, setWeather] = useState<E.Either<unknown, T>>(
      E.right([] as any)
    );

    useEffect(() => {
      pipe(
        stations,
        urlMaker,
        fetcher,
        T.tapIO((newState) => () => setWeather(newState))
      )();
    });

    return weather;
  };
