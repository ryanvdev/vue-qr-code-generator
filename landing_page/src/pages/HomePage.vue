<script setup lang="ts">
import { ref, watch } from 'vue';
// import Qrcode from '@/components/Qrcode.vue';

import QRcode, { QRcodeOptions, optionsRecord } from '@/utils/QRcode';
import _ from 'lodash';
import __env, { WEB_NAME } from '@/utils/env';
import { useQuery } from '@tanstack/vue-query';
import PostsService from '@/services/posts_service';
import { toLocaleTimeStr } from '@/utils/formats';
import { reactive, shallowRef, computed } from 'vue';
import { useDisplay } from 'vuetify';
import DotsSelection from '@/components/DotsSelection/DotsSelection.vue';
import { DotType } from 'qr-code-styling';
import ColorPickerButton from '@/components/ColorPickerButton.vue';

const { mdAndUp } = useDisplay();

const options = reactive<QRcodeOptions>(structuredClone(optionsRecord.classy));
const qrcode = shallowRef(new QRcode());

const inputValue = ref<string>(__env.WEB_URL);
const isLoading = ref<boolean>(false);
const updatedAt = ref<string>(toLocaleTimeStr(new Date()));
const imageSrc = ref<string>('');

const { data: postHtml, isSuccess: isPostHtmlSuccess } = useQuery({
    queryKey: ['home_page'],
    queryFn: async () => {
        return await PostsService.fetchPost('home');
    },
});

const dotType = computed<DotType>({
    get: () => options.dotsOptions?.type || 'square',
    set: (v) => {
        if (!options.dotsOptions) {
            options.dotsOptions = {
                type: v,
            };
        } else {
            options.dotsOptions.type = v;
        }
    },
});

const dotColor = computed<string | undefined>({
    get: () => options.dotsOptions?.color,
    set: (v) => {
        if (!options.dotsOptions) {
            options.dotsOptions = {
                color: v,
            };
        } else {
            options.dotsOptions.color = v;
        }
    },
});

const backgroundColor = computed<string | undefined>({
    get: () => options.backgroundOptions?.color,
    set: (v) => {
        if (!options.backgroundOptions) {
            options.backgroundOptions = {
                color: v,
            };
        } else {
            options.backgroundOptions.color = v;
        }
    },
});

const updateDebounceInputValue = _.debounce(
    (v: string) => {
        options.data = v;
    },
    1000,
    { leading: false },
);

// update qrcode image
watch(
    options,
    async (currentOptions) => {
        // case input value empty
        if (!currentOptions.data || currentOptions.data.length === 0) {
            imageSrc.value = '';
        } else {
            await qrcode.value.updateAsync(currentOptions);
            imageSrc.value = qrcode.value.toDataUrl('png') || '';
        }
        isLoading.value = false;
        updatedAt.value = toLocaleTimeStr(new Date());
    },
    { immediate: true },
);

// update debounce input value
watch(
    inputValue,
    (v) => {
        isLoading.value = true;
        updateDebounceInputValue(v);
    },
    { immediate: true },
);
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="text-h4 py-2">{{ WEB_NAME }}</h1>
                <p class="text-body-1 py-2">
                    Đây là công cụ tạo qrcode online miễn phí, giúp bạn tạo qrcode một cách đơn
                    giản, dễ dàng.
                </p>
            </v-col>
            <v-col cols="12">
                <v-row align-sm="center">
                    <v-col cols="12" sm="12" md="8">
                        <v-sheet class="bg-surface pa-2" rounded="sm">
                            <v-textarea
                                variant="plain"
                                rows="14"
                                no-resize
                                clearable
                                rounded="lg"
                                :loading="isLoading"
                                v-model:model-value="inputValue"
                            />
                        </v-sheet>
                    </v-col>
                    <v-col cols="12" sm="12" md="4">
                        <v-sheet class="bg-surface pa-2 h-100" rounded="sm">
                            <v-row>
                                <v-col cols="12" class="d-block">
                                    <div
                                        :class="`stack ${
                                            styles[isLoading ? 'is-loading' : 'is-loaded']
                                        }`"
                                        style="aspect-ratio: 1"
                                    >
                                        <div :class="styles['qrcode-wrapper']">
                                            <img
                                                v-show="imageSrc.length > 0"
                                                :src="imageSrc"
                                                alt="qrcode"
                                            />
                                        </div>
                                        <div :class="styles['process-wrapper']">
                                            <v-progress-circular
                                                size="200"
                                                width="10"
                                                color="primary"
                                                :indeterminate="isLoading"
                                            />
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12">
                                    <span>Cập nhật lúc: </span>
                                    <strong>{{ updatedAt }}</strong>
                                </v-col>
                                <v-col cols="12">
                                    <p>
                                        <span v-if="mdAndUp" class="text-body-1">
                                            Để
                                            <strong>tải hình xuống</strong>
                                            bạn hãy click chuột phải vào qrcode và nhấn
                                            <strong>"save image as"</strong>
                                            hoặc
                                            <strong>"lưu hình ảnh thành"</strong>
                                        </span>
                                        <span v-else class="text-body-1">
                                            Để
                                            <strong>tải hình xuống</strong>
                                            bạn hãy nhấn giữ ảnh chứa qrcode và sau đó chọn
                                            <strong>"download image"</strong>
                                            hoặc
                                            <strong>"tải hình ảnh xuống"</strong>
                                        </span>
                                    </p>
                                    <p>
                                        Vì chính sách bảo mật và an toàn, chúng tôi không thể làm
                                        điều này thay bạn được.
                                    </p>
                                </v-col>
                            </v-row>
                        </v-sheet>
                    </v-col>
                    <v-col cols="12">
                        <h2 class="text-h5 py-2">Tùy chỉnh</h2>
                        <v-row no-gutters>
                            <v-col cols="12" sm="12" md="6">
                                <div :class="styles['color-picker-container']">
                                    <h3 class="text-h6 py-2">Màu "chấm"</h3>
                                    <color-picker-button
                                        id="home-color-dot"
                                        v-model:model-value="dotColor"
                                        :class="styles['color-picker']"
                                        :style="{ '--color': dotColor }"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                                <div :class="styles['color-picker-container']">
                                    <h3 class="text-h6 py-2">Màu nền</h3>
                                    <color-picker-button
                                        id="home-color-background"
                                        v-model:model-value="backgroundColor"
                                        :class="styles['color-picker']"
                                        :style="{ '--color': backgroundColor }"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <h3 class="text-h6 py-2">Hình dạng</h3>
                                <div class="w-100">
                                    <dots-selection v-model:model-value="dotType" />
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12">
                <article v-if="isPostHtmlSuccess" v-html="postHtml" class="text-body-1"></article>
            </v-col>
        </v-row>
    </v-container>
</template>

<style module="styles" lang="scss">
.qrcode-wrapper {
    display: block;
    z-index: 1;

    > img {
        display: block;
        width: 100%;
        height: auto;
    }
}
.process-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    z-index: 0;

    background-color: rgb(var(--v-theme-surface));
}

.is-loading {
    .process-wrapper {
        opacity: 1;
        z-index: 2;
    }
}

.color-picker-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: auto;

    > h4 {
        display: block;
        width: 150px;
        height: auto;
    }

    > .color-picker {
        display: block;
        cursor: pointer;

        width: calc(100% - 180px);
        height: 40px;

        border-radius: 20px;
        border: 2px solid rgb(var(--v-theme-primary));

        margin-left: 10px;

        background-color: var(--color);
    }
}
</style>
