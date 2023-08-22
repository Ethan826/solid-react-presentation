import { Cloud } from "../codecs";

export type CloudsProps = { clouds: ReadonlyArray<Cloud> };

export const Clouds = ({ clouds }: CloudsProps) => (
  <>
    {clouds
      .map(
        ({ cover, base }) =>
          cover + (base ? ` at ${base.toLocaleString()}` : "")
      )
      .join(", ")}
  </>
);
