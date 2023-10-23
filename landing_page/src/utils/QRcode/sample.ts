import __env from '../env';
import { deepFreeze } from '../u';
import { QRcodeOptions } from './QRcode';

const optionsRecordKeys = [
    'normal',
    'classy',
    'classyRounded',
    'dots',
    'rounded',
    'square',
    'extraRounded',
] as const;

export const baseOptions: QRcodeOptions = deepFreeze({
    height: 512,
    width: 512,
    data: __env.WEB_URL,
    type: 'canvas',
    shape: 'square',
    dotsOptions: {
        type: 'square',
        color: '#000000',
    },
    backgroundOptions: {
        color: '#ffffff',
    },
    qrOptions: {
        errorCorrectionLevel: 'L',
        mode: 'Byte',
    },
    margin: 10,
});

const optionsRecord: Record<(typeof optionsRecordKeys)[number], QRcodeOptions> = {
    normal: structuredClone(baseOptions),
    classy: Object.assign(structuredClone(baseOptions), {
        dotsOptions: {
            ...baseOptions.dotsOptions,
            type: 'classy',
        },
    } as QRcodeOptions),
    classyRounded: Object.assign(structuredClone(baseOptions), {
        dotsOptions: {
            ...baseOptions.dotsOptions,
            type: 'classy-rounded',
        },
    } as QRcodeOptions),
    dots: Object.assign(structuredClone(baseOptions), {
        dotsOptions: {
            ...baseOptions.dotsOptions,
            type: 'dots',
        },
    } as QRcodeOptions),
    rounded: Object.assign(structuredClone(baseOptions), {
        dotsOptions: {
            ...baseOptions.dotsOptions,
            type: 'rounded',
        },
    } as QRcodeOptions),
    square: Object.assign(structuredClone(baseOptions), {
        dotsOptions: {
            ...baseOptions.dotsOptions,
            type: 'square',
        },
    } as QRcodeOptions),
    extraRounded: Object.assign(structuredClone(baseOptions), {
        dotsOptions: {
            ...baseOptions.dotsOptions,
            type: 'extra-rounded',
        },
    } as QRcodeOptions),
};

deepFreeze(optionsRecord);

export { optionsRecord, optionsRecordKeys };
