import { RouteRecordRaw } from 'vue-router';
import { WEB_NAME } from '@/utils/env';
import HomeLayout from '@/layouts/HomeLayout.vue';
import HomePage from '@/pages/HomePage.vue';

const routes: readonly RouteRecordRaw[] = [
    {
        name: 'root',
        path: '/',
        component: async () => {
            return HomeLayout;
        },
        children: [
            {
                name: WEB_NAME,
                path: '/',
                component: async () => HomePage,
            },
        ],
    },
];

export { routes };
