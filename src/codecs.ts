import * as t from "io-ts";

export const Cloud = t.type({
  cover: t.string,
  base: t.union([t.number, t.null]),
});
export type Cloud = t.TypeOf<typeof Cloud>;

export const Metar = t.readonly(
  t.type({
    icaoId: t.string,
    name: t.string,
    clouds: t.array(Cloud),
    wdir: t.union([t.number, t.string]),
    wspd: t.union([t.number, t.string]),
  })
);
export type Metar = t.TypeOf<typeof Metar>;

export const Taf = t.readonly(
  t.type({
    icaoId: t.string,
    name: t.string,
    fcsts: t.array(
      t.type({
        clouds: t.array(Cloud),
        wdir: t.union([t.number, t.string]),
        wspd: t.union([t.number, t.string]),
      })
    ),
  })
);
export type Taf = t.TypeOf<typeof Taf>;

export const TafArray = t.array(Taf);
export type TafArray = t.TypeOf<typeof TafArray>;

export const MetarArray = t.array(Metar);
export type MetarArray = t.TypeOf<typeof MetarArray>;
