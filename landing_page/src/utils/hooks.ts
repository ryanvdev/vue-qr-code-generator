import { customRef } from 'vue';

export const useValue = <T = any>(callbackFn: () => T) => {
    return callbackFn();
};

export function useDebouncedRef<T = any>(value: T, delay: number = 200) {
    let timeoutId: number | null = null;
    return customRef((track, trigger) => {
        return {
            get() {
                track();
                return value;
            },
            set(newValue) {
                if (timeoutId !== null) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(() => {
                    value = newValue;
                    trigger();
                }, delay);
            },
        };
    });
}
