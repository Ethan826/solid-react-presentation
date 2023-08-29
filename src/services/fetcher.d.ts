export type Fetcher<T> = (url: string) => Promise<T>;
