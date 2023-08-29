import { useEffect, useState } from "react";
import { Fetcher } from "../services/fetcher";

export type WeatherHookFactoryParams<T> = {
  urlMaker: (stations: ReadonlyArray<string>) => string;
  fetcher: Fetcher<T>;
};

export const weatherHookFactory =
  <T extends ReadonlyArray<unknown>>({
    urlMaker,
    fetcher,
  }: WeatherHookFactoryParams<T>) =>
  (stations: ReadonlyArray<string>) => {
    const [weather, setWeather] = useState<T>([] as unknown as T);

    useEffect(() => {
      fetcher(urlMaker(stations)).then(setWeather);
    });

    return weather;
  };
