import { GlobalStore } from './GlobalStore';
import type { ModalStore, SavedStyle } from './ModalStore';

export type { SavedStyle };

declare global {
    interface Window {
        globalStore: GlobalStore;
    }
}

const getGlobalStore = (): GlobalStore => {
    if (!window.globalStore) {
        window.globalStore = new GlobalStore();
    }

    return window.globalStore;
};

export const getModalStore = (): ModalStore => getGlobalStore().getModalStore();
