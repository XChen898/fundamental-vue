import { Component, Prop, Base } from '@/core';
import { shortUuid } from '@/lib';

@Component('UidMixin')
export class UidMixin extends Base  {
  @Prop({
    type: String,
    required: false,
    default: shortUuid,
  })
  public uid!: string;
}
