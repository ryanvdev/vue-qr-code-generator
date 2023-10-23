import QRCodeStyling, { type Options } from 'qr-code-styling';

export type ConstructorParamsQrcodeStyling = ConstructorParameters<typeof QRCodeStyling>;

export type QrcodeDataUrlType = (typeof qrcodeDataUrlType)[number];

export const qrcodeDataUrlType = Object.freeze(['png', 'jpeg', 'webp'] as const);

class QRcode extends QRCodeStyling {
    public constructor(...options: ConstructorParamsQrcodeStyling) {
        super(...options);
    }

    public toDataUrl(dataType: QrcodeDataUrlType = 'png'): string | null {
        if (!this._canvas) return null;
        const result = this._canvas.toDataURL(`image/${dataType}`);
        return result;
    }

    public updateAsync = async (options: Partial<Options>) => {
        // wait for canvas drawed done
        await this._canvasDrawingPromise;

        this.update(options);
        await this._canvasDrawingPromise;
        return;
    };
}

export type { Options as QRcodeOptions };

export default QRcode;
