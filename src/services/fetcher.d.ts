import type * as E from "fp-ts/Either";

export type Fetcher<T> = (url: string) => Promise<E.Either<unknown, T>>;
