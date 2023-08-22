import { DateFromUnixTime } from "io-ts-types";
import * as t from "io-ts";

export const Cloud = t.type({
  cover: t.keyof({ SKC: null, SCT: null, FEW: null, BKN: null, OVC: null }),
  base: t.union([t.number, t.null]),
});
export type Cloud = t.TypeOf<typeof Cloud>;

export const Wind = t.type({
  wdir: t.union([t.number, t.literal("VRB"), t.null]),
  wspd: t.union([t.number, t.null]),
});

export const StationData = t.type({ icaoId: t.string, name: t.string });

export const Observation = t.readonly(
  t.intersection([
    t.type({
      clouds: t.array(Cloud),
    }),
    Wind,
    StationData,
  ])
);

export type Observation = t.TypeOf<typeof Observation>;

export const Forecast = t.readonly(
  t.intersection([
    t.type({
      fcsts: t.readonlyArray(
        t.intersection([
          t.type({
            clouds: t.array(Cloud),
            timeFrom: DateFromUnixTime,
            timeTo: DateFromUnixTime,
          }),
          Wind,
        ])
      ),
    }),
    StationData,
  ])
);
export type Forecast = t.TypeOf<typeof Forecast>;

export const ForecastArray = t.readonlyArray(Forecast);
export type ForecastArray = t.TypeOf<typeof ForecastArray>;

export const ObservationArray = t.readonlyArray(Observation);
export type ObservationArray = t.TypeOf<typeof ObservationArray>;
