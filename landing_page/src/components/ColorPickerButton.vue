<script setup lang="ts">
import { defineProps, ref, watch, computed, StyleValue } from 'vue';
import _ from 'lodash';

interface Props {
    id: string;
    modelValue?: string;
    class?: string;
    style?: StyleValue;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    'update:modelValue': [e: string | undefined];
}>();

const value = ref<string | undefined>(undefined);

const updateModelValue = _.debounce((v: string | undefined) => {
    emit('update:modelValue', v);
}, 500);

const colorValue = computed({
    get: () => value.value,
    set: (v) => {
        value.value = v;
        updateModelValue(v);
    },
});

watch(
    props,
    () => {
        value.value = props.modelValue;
    },
    { immediate: true },
);
</script>

<template>
    <div :id="props.id" :class="props.class" :style="props.style">
        <slot></slot>
    </div>
    <v-menu
        :activator="'#' + props.id"
        location="center center"
        :close-on-content-click="false"
        width="320px"
    >
        <v-color-picker v-model:model-value="colorValue" />
    </v-menu>
</template>
