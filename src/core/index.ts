import Vue from 'vue';
import TsxComponent from '@/vue-tsx';
import { Doc } from '@/api';

export const Component = Doc.component;
export const DefaultSlot = Doc.defaultSlot;
export const Slot = Doc.slot;
export const Event = Doc.event;
export const Prop = Doc.prop;
export const Mixins = Doc.Mixins;
export const Model = Doc.model;

// Re-exporting for convenience
export { Vue };
export { TsxComponent as Base };

// tslint:disable-next-line:no-console
export const log = (message?: any, ...params: any[]): void => console.log(message, ...params);
// tslint:disable-next-line:no-console
export const warn = (message?: any, ...params: any[]): void => console.warn(message, ...params);
