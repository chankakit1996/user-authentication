import { camelCase } from 'lodash';

export const camelCaseKeys = (
    obj: Array<Object> | Record<string, any>
): typeof obj => {
    if (Array.isArray(obj)) {
        return obj.map((v) => camelCaseKeys(v));
    } else if (obj != null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [camelCase(key)]: camelCaseKeys(obj[key]),
            }),
            {}
        );
    }
    return obj;
};

const timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
export async function sleep(fn: any, ms = 3000) {
    await timeout(ms);
    return fn();
}
