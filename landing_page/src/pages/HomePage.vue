<script setup lang="ts">
import { ref, watch } from 'vue';
import Qrcode from '@/components/Qrcode.vue';
import _ from 'lodash';
import { WEB_NAME } from '@/utils/env';
import { useQuery } from '@tanstack/vue-query';
import PostsService from '@/services/posts_service';
import { toLocaleTimeStr } from '@/utils/formats';

const debounceInputValue = ref<string>('');
const inputValue = ref<string>(WEB_NAME);
const isLoading = ref<boolean>(false);
const qrcodeModel = ref<InstanceType<typeof Qrcode> | null>(null);
const updatedAt = ref<string>(toLocaleTimeStr(new Date()));

const { data: postHtml, isSuccess: isPostHtmlSuccess } = useQuery({
    queryKey: ['home_page'],
    queryFn: async () => {
        return await PostsService.fetchPost('home');
    },
});

const updateDebounceInputValue = _.debounce(
    (v: string) => {
        debounceInputValue.value = v;
        isLoading.value = false;
        updatedAt.value = toLocaleTimeStr(new Date());
    },
    1500,
    { leading: false },
);

watch(
    inputValue,
    (v) => {
        isLoading.value = true;
        updateDebounceInputValue(v);
    },
    { immediate: true },
);

const saveBtnClick = () => {
    if (!qrcodeModel || !qrcodeModel.value) return;
    qrcodeModel.value.download();
};
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
                                            <qrcode
                                                ref="qrcodeModel"
                                                class="w-100"
                                                size="512"
                                                :value="debounceInputValue"
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
                                    <v-btn
                                        @click="saveBtnClick"
                                        class="download-btn"
                                        prepend-icon="mdi-download"
                                        color="primary"
                                        >Tải xuống</v-btn
                                    >
                                </v-col>
                            </v-row>
                        </v-sheet>
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
</style>
