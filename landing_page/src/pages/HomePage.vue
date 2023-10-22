<script setup lang="ts">
import { ref, watch } from 'vue';
import Qrcode from '@/components/Qrcode.vue';
import _ from 'lodash';
import { WEB_NAME } from '@/utils/env';

const debounceInputValue = ref<string>('');
const inputValue = ref<string>(WEB_NAME);
const isLoading = ref<boolean>(false);
const qrcodeModel = ref<InstanceType<typeof Qrcode> | null>(null);

const updateDebounceInputValue = _.debounce(
    (v: string) => {
        debounceInputValue.value = v;
        isLoading.value = false;
    },
    1000,
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
        <v-row align-sm="center">
            <v-col cols="8">
                <v-sheet class="bg-surface pa-2" rounded="sm">
                    <v-textarea
                        variant="plain"
                        rows="20"
                        no-resize
                        clearable
                        rounded="lg"
                        :loading="isLoading"
                        v-model:model-value="inputValue"
                    />
                </v-sheet>
            </v-col>
            <v-col>
                <v-sheet class="bg-surface pa-2 h-100" rounded="sm">
                    <v-row>
                        <v-col cols="12" align-self="center">
                            <qrcode
                                ref="qrcodeModel"
                                class="w-100"
                                size="512"
                                :value="debounceInputValue"
                                style=""
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-btn @click="saveBtnClick" class="download-btn"> save </v-btn>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>
