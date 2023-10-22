import { createVuetify } from 'vuetify';
import * as vuetifyComponents from 'vuetify/components';
import * as vuetifyDirectives from 'vuetify/directives';
import { themes } from '@/themes';

import 'vuetify/styles';

const vuetifyPlugin = createVuetify({
    components: {
        ...vuetifyComponents,
    },
    directives: {
        ripple: vuetifyDirectives.Ripple,
    },
    theme: {
        defaultTheme: 'systemTheme',
        themes: themes,
    },
});

export { vuetifyPlugin };
