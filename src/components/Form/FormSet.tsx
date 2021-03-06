import VueTsxComponent from '@/vue-tsx';
import { Component, DefaultSlot } from '@/core';

@Component('FormSet')
@DefaultSlot('Content of the form set (usually form items).')
export class FormSet extends VueTsxComponent<{}> {
  public render() {
    const items = this.$slots.default;
    return <div class='fd-form__set'>{items}</div>;
  }
}
