export {};

declare global {
    type Primitive = string | number | boolean | bigint | symbol | undefined | null;
    type Builtin = Primitive | Function | Date | Error | RegExp;

    type DeepFreeze<T> = T extends Builtin
        ? T
        : T extends Map<infer K, infer V>
        ? ReadonlyMap<DeepFreeze<K>, DeepFreeze<V>>
        : T extends ReadonlyMap<infer K, infer V>
        ? ReadonlyMap<DeepFreeze<K>, DeepFreeze<V>>
        : T extends WeakMap<infer K, infer V>
        ? WeakMap<DeepFreeze<K>, DeepFreeze<V>>
        : T extends Set<infer U>
        ? ReadonlySet<DeepFreeze<U>>
        : T extends ReadonlySet<infer U>
        ? ReadonlySet<DeepFreeze<U>>
        : T extends WeakSet<infer U>
        ? WeakSet<DeepFreeze<U>>
        : T extends Promise<infer U>
        ? Promise<DeepFreeze<U>>
        : T extends {}
        ? {
              readonly [K in keyof T]: DeepFreeze<T[K]>;
          }
        : Readonly<T>;
}
