<script setup lang="ts">
import __env from '@/utils/env';
import { useTheme } from 'vuetify';
import { defineProps, withDefaults } from 'vue';
import { themeDetailList } from '@/themes';
import { computed } from 'vue';
import { useValue } from '@/utils/hooks';

interface Props {
    id?: string;
}

const props = withDefaults(defineProps<Props>(), {
    id: 'change_theme_btn',
});

const themeSelected = computed({
    get: useValue(() => {
        const arrayCaching: string[] = [''];
        return () => {
            arrayCaching[0] = themeStore.global.name.value;
            return arrayCaching;
        };
    }),
    set: (v) => {
        themeStore.global.name.value = v[0];
    },
});

const themeStore = useTheme();
</script>

<template>
    <v-tooltip text="Thay đổi chủ đề" location="bottom right">
        <template #activator="{ props: tooltipProps }">
            <v-btn
                v-bind="tooltipProps"
                :id="props.id"
                icon="mdi-tshirt-crew"
                variant="flat"
                rounded="lg"
                color="primary"
            />
        </template>
    </v-tooltip>

    <v-menu :activator="'#' + props.id" location="bottom right">
        <v-list elevation="2" v-model:selected="themeSelected">
            <v-list-item
                v-for="{ key, detail } of themeDetailList"
                :key="key"
                :value="key"
                width="220"
            >
                <template #prepend>
                    <v-icon :icon="detail.icon" />
                </template>
                <template #title>
                    {{ detail.name }}
                </template>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
