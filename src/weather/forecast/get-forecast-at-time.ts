import { Forecast, ForecastElement } from "../../codecs";

export const getForecastAtTime = (
  forecast: Forecast,
  time: Date
): ForecastElement | null =>
  forecast.fcsts.find(
    ({ timeFrom, timeTo }) => timeFrom <= time && timeTo > time
  ) ?? null;
