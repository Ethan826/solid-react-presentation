import type * as E from "fp-ts/Either";
import type * as TE from "fp-ts/TaskEither";

export type Fetcher<T> = (url: string) => TE.TaskEither<unknown, T>;
