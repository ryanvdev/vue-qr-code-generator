export const useValue = <T = any>(callbackFn: () => T) => {
    return callbackFn();
};
