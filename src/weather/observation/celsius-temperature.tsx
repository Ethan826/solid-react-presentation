import { TemperatureUnit } from "../types";

export const celsiusToFahrenheit = (celsius: number) => celsius * 1.8 + 32;

export type CelsiusTemperatureProps = {
  temperature: number;
  temperatureUnit: TemperatureUnit;
};

export const CelsiusTemperature = ({
  temperatureUnit,
  temperature,
}: CelsiusTemperatureProps) =>
  temperatureUnit === "C"
    ? `${temperature}º C`
    : `${celsiusToFahrenheit(temperature).toFixed(1)}º F`;
