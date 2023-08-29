import * as E from "fp-ts/Either";
import { useEffect, useState } from "react";
import { Fetcher } from "../services/fetcher";

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
      fetcher(urlMaker(stations)).then(setWeather);
    });

    return weather;
  };
