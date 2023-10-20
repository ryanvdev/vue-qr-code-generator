<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppBar from '@/components/AppBar.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<template>
    <div class="d-block w-screen">
        <app-bar />
        <main class="d-block w-100">
            <router-view />
        </main>
        <app-footer />
    </div>
</template>
