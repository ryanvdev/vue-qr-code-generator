<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue';
import { dotTypes } from './dots_selection_utils';
import type { DotType } from 'qr-code-styling';

interface Props {
    modelValue?: DotType;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: 'square',
});
const emit = defineEmits<{
    'update:modelValue': [e: DotType];
}>();
</script>

<template>
    <v-slide-group
        :model-value="props.modelValue"
        @update:model-value="emit('update:modelValue', $event)"
    >
        <v-slide-group-item v-for="dotType of dotTypes" :key="dotType" :value="dotType">
            <template #default="{ select, isSelected }">
                <button
                    v-ripple
                    :class="`${styles['btn']} ${
                        styles[isSelected ? 'is-selected' : 'is-not-selected']
                    }`"
                    type="button"
                    :style="{
                        '--img': `url('/imgs/dots/${dotType}.png')`,
                    }"
                    @click="select(true)"
                ></button>
            </template>
        </v-slide-group-item>
    </v-slide-group>
</template>

<style module="styles" lang="scss">
.btn {
    display: block;

    width: 210px;
    height: 210px;

    border-radius: 10px;
    border: none;

    margin: 10px;

    background-image: var(--img);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    &.is-selected {
        border: 4px solid rgb(var(--v-theme-secondary));
    }
}
</style>
