declare type ExcludeKeys<T, U> = {
    [K in keyof T]: K extends keyof U ? never : T[K];
};
