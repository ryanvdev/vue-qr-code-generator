import { defineStore } from 'pinia';
import _ from 'lodash';

const layoutStoreId = _.uniqueId('layout_store');

export const useLayoutStore = defineStore(layoutStoreId, () => {});
