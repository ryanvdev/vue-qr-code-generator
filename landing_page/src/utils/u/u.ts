export function deepFreeze<T = any>(obj: T): DeepFreeze<T> {
    if (!(obj instanceof Object)) return obj as any;

    for (const key in obj) {
        const value: any = (obj as any)[key];
        deepFreeze(value);
    }

    return Object.freeze(obj) as any;
}
