<script setup lang="ts">
import AppLogo from './AppLogo.vue';
import ChangeThemeBtn from './ChangeThemeBtn.vue';
</script>

<template>
    <header class="d-block w-100 bg-surface">
        <v-container>
            <v-row no-gutters align-content="center">
                <v-col cols="9">
                    <app-logo />
                </v-col>
                <v-col cols="3" class="d-flex justify-end">
                    <change-theme-btn />
                </v-col>
            </v-row>
        </v-container>
    </header>
</template>
