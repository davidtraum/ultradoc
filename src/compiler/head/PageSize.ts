
export interface PageSizeInfo {
    width: number;
    height: number;
    label: string;
}

const PageSizes: {[key: string]: PageSizeInfo} = {
    'A0': {
        width: 841,
        height: 1188,
        label: 'A0'
    },
    'A1': {
        width: 594,
        height: 841,
        label: 'A1'
    },
    'A2': {
        width: 420,
        height: 594,
        label: 'A2'
    },
    'A3': {
        width: 297,
        height: 420,
        label: 'A3'
    },
    'A4': {
        width: 210,
        height: 297,
        label: 'A4'
    },
    'A5': {
        width: 148,
        height: 210,
        label: 'A5'
    },
    'A6': {
        width: 105,
        height: 148,
        label: 'A6'
    },
    'A7': {
        width: 74,
        height: 105,
        label: 'A7'
    }
};

export default PageSizes;