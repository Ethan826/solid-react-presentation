import { z } from "zod";

export const Cloud = z.object({
  cover: z.union([
    z.literal("CLR"),
    z.literal("SKC"),
    z.literal("SCT"),
    z.literal("FEW"),
    z.literal("BKN"),
    z.literal("OVC"),
  ]),
  base: z.union([z.number(), z.null()]),
});

export type Cloud = z.TypeOf<typeof Cloud>;

export const Wind = z.object({
  wdir: z.union([z.number(), z.literal("VRB"), z.null()]),
  wspd: z.union([z.number(), z.null()]),
});

export const StationData = z.object({ icaoId: z.string(), name: z.string() });

export const Observation = z
  .intersection(
    z.intersection(
      z.object({
        clouds: z.array(Cloud),
        temp: z.number(),
      }),
      Wind
    ),
    StationData
  )
  .transform((data) => ({ ...data, tag: "Observation" }))
  .readonly();

export type Observation = z.TypeOf<typeof Observation>;

const DateFromUnixTime = z.number().transform((n) => new Date(n * 1000));

export const ForecastElement = z.intersection(
  z.object({
    clouds: z.array(Cloud),
    timeFrom: DateFromUnixTime,
    timeTo: DateFromUnixTime,
  }),
  Wind
);
export type ForecastElement = z.TypeOf<typeof ForecastElement>;

export const Forecast = z
  .intersection(
    z.object({
      fcsts: z.array(ForecastElement).readonly(),
    }),
    StationData
  )
  .transform((data) => ({ ...data, tag: "Forecast" }))
  .readonly();

export type Forecast = z.TypeOf<typeof Forecast>;

export const ForecastArray = z.array(Forecast).readonly();
export type ForecastArray = z.TypeOf<typeof ForecastArray>;

export const ObservationArray = z.array(Observation).readonly();
export type ObservationArray = z.TypeOf<typeof ObservationArray>;

export const isForecast = (data: Forecast | Observation): data is Forecast =>
  data.tag === "Forecast";

export const isObservation = (data: Forecast | Observation): data is Forecast =>
  data.tag === "Observation";
