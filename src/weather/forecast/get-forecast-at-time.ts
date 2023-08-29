import { ForecastData, ForecastElement } from "../../codecs";

export const getForecastAtTime = (
  forecast: ForecastData,
  time: Date
): ForecastElement | null =>
  forecast.fcsts.find(
    ({ timeFrom, timeTo }) => timeFrom <= time && timeTo > time
  ) ?? null;
