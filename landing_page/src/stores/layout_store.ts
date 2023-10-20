import { defineStore } from 'pinia';
import _ from 'lodash';
import { useDisplay } from 'vuetify';

const layoutStoreId = _.uniqueId('layout_store');

export const useLayoutStore = defineStore(layoutStoreId, () => {});
