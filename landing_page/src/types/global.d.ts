export {};

declare global {
    type RecordToSignature<T extends Record> = T extends Record<infer A, infer B>
        ? {
              [k: string]: B;
          }
        : never;
}
