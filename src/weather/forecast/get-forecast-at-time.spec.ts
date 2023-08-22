import { ForecastData } from "../../codecs";
import { getForecastAtTime } from "./get-forecast-at-time";

const exampleForecast: ForecastData = {
  icaoId: "KMCO",
  name: "Orlando Intl, FL, US",
  fcsts: [
    {
      timeFrom: new Date(1692705600 * 1000),
      timeTo: new Date(1692723600 * 1000),
      wdir: 40,
      wspd: 7,
      clouds: [{ cover: "SKC", base: 0 }],
    },
    {
      timeFrom: new Date(1692723600 * 1000),
      timeTo: new Date(1692748800 * 1000),
      wdir: 60,
      wspd: 11,
      clouds: [{ cover: "FEW", base: 4000 }],
    },
    {
      timeFrom: new Date(1692748800 * 1000),
      timeTo: new Date(1692799200 * 1000),
      wdir: 70,
      wspd: 6,
      clouds: [{ cover: "FEW", base: 3500 }],
    },
    {
      timeFrom: new Date(1692799200 * 1000),
      timeTo: new Date(1692813600 * 1000),
      wdir: 40,
      wspd: 9,
      clouds: [{ cover: "SCT", base: 4000 }],
    },
  ],
};

describe("getForecastAtTime", () => {
  it("matches the first group", () => {
    expect(
      getForecastAtTime(exampleForecast, new Date("2023-08-22T10:23:21-04:00"))
    ).toMatchObject(exampleForecast.fcsts[0]);
  });

  it("matches a later group", () => {
    expect(
      getForecastAtTime(exampleForecast, new Date("2023-08-23T00:15:21-04:00"))
    ).toMatchObject(exampleForecast.fcsts[2]);
  });

  it("returns none for a group after the window", () => {
    expect(
      getForecastAtTime(exampleForecast, new Date("2023-08-24T00:15:21-04:00"))
    ).toBeNull();
  });

  it("returns none for a group before the window", () => {
    expect(
      getForecastAtTime(exampleForecast, new Date("2023-07-24T00:15:21-04:00"))
    ).toBeNull();
  });
});
