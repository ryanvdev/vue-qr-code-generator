<script setup lang="ts">
import QrcodeStyling, { Options as QrcodeStylingOptions } from 'qr-code-styling';
import { onMounted, reactive, ref, watch, defineExpose, defineOptions } from 'vue';

interface Props {
    value: string;
    size: number | string;
    class?: string;
}

const props = defineProps<Props>();

const divElement = ref<HTMLElement | null>(null);
const options = reactive<Partial<QrcodeStylingOptions>>({
    height: 128,
    width: 128,
    data: 'online',
    type: 'canvas',
    shape: 'square',
    // image: '/tao-qrcode-online-logo-64.png',
    dotsOptions: {
        type: 'square',
        color: 'black',
    },
    backgroundOptions: {
        color: 'white',
    },
    qrOptions: {
        errorCorrectionLevel: 'L',
        mode: 'Byte',
    },
    margin: 10,
});

const qrcodeStyling = ref(new QrcodeStyling(options));

const download = async () => {
    console.log('Download is trigger !');
    await qrcodeStyling.value.download({
        extension: 'png',
        name: 'tao-qrcode-online',
    });
};

const mountQrcode = () => {
    if (!divElement || !divElement.value) return;
    qrcodeStyling.value.append(divElement.value);
};

watch(props, () => {
    options.data = props.value;

    let size = parseInt(props.size as any);
    if (!Number.isFinite(size) || size < 10) {
        size = 10;
    }
    options.width = size;
    options.height = size;
});

watch(
    options,
    () => {
        qrcodeStyling.value.update(options);
    },
    {
        onTrigger: () => {
            console.log(`update value for Qrcode "${options.data}"`);
        },
    },
);

onMounted(() => {
    mountQrcode();
});

defineExpose({
    download,
});

defineOptions({
    inheritAttrs: false,
});
</script>

<template>
    <div :class="`${style['qrcode']} ${props.class || ''}`" ref="divElement"></div>
</template>

<style module="style" lang="scss">
.qrcode {
    display: block;

    width: 300px;
    height: auto;
    aspect-ratio: 1;

    > * {
        display: block;
        width: 100%;
        height: 100%;
    }
}
</style>
