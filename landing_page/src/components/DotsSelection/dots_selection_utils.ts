import { DotType } from 'qr-code-styling';

interface DotDetail {
    label: string;
}

export const dotTypes: DotType[] = [
    'square',
    'rounded',
    'extra-rounded',
    'dots',
    'classy',
    'classy-rounded',
];

export const dotsTypeDetailRecord: Record<DotType, DotDetail> = {
    square: {
        label: 'Chấm hình vuông',
    },
    dots: {
        label: 'dots',
    },
    'extra-rounded': {
        label: 'extra-rounded',
    },
    classy: {
        label: 'classy',
    },
    'classy-rounded': {
        label: 'classy-rounded',
    },
    rounded: {
        label: 'rounded',
    },
};
