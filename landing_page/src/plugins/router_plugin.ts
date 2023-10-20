import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from '@/routes';

const routerPlugin = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return {
            behavior: 'smooth',
            top: 0,
            left: 0,
        };
    },
});

export { routerPlugin };
