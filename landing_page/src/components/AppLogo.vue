<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import __env from '@/utils/env';
import { RouterLink } from 'vue-router';
// import { useDisplay } from 'vuetify';

interface Props {
    height?: string;
}

// const {mdAndUp} = useDisplay();

const props = withDefaults(defineProps<Props>(), {
    height: '50px',
});
</script>

<template>
    <router-link
        v-ripple
        to="/"
        class="d-flex justify-center align-center w-fit h-fit rounded-sm pa-1"
        :style="{
            height: props.height,
        }"
    >
        <img
            class="d-block h-100 w-auto"
            src="/tao-qrcode-online-logo-64.png"
            alt="Tạo qrcode online logo"
        />
        <span class="ml-2 text-h6">
            {{ __env.WEB_NAME }}
        </span>
    </router-link>
</template>
