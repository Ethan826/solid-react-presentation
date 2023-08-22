import * as RA from "fp-ts/ReadonlyArray";
import { pipe } from "fp-ts/function";
import { Forecast } from "./codecs";

export const getForecastAtTime = (forecast: Forecast) => (time: Date) =>
  pipe(
    forecast.fcsts,
    RA.findFirst(({ timeFrom, timeTo }) => timeFrom <= time && timeTo > time)
  );
