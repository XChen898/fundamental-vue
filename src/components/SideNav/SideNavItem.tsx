import { Inject } from 'vue-property-decorator';
import { SIDE_NAV, ITEM_CONTAINER, ItemContainer } from './shared';
import { VNode } from 'vue';
import { SideNav } from './SideNav';
import { IconMixin, IconProps } from '@/mixins';
import { mixins } from 'vue-class-component';
import { Identifier } from '@/components/Identifier';
import { Color } from '@/lib';
import { Component, Event, DefaultSlot, Prop } from '@/core';

interface Props extends IconProps {
    isSelected?: boolean;
    itemId: string;
    submenuTitle?: string;
    accessoryIcon?: string;
    color?: Color | null;
    componentText?: string | null;
}

// A SideNavItem can either contain:
// - Text (used as the title)
// - SideNavItems (used to populate a sub side nav)
// If a SideNavItem acts as a submenu use the title prop
// Instead of the default slot for the title.

@Component('SideNavItem', {
    provide() {
        return {
            [ITEM_CONTAINER]: this,
        };
    },
})
@Event('click', 'Sent when item is clicked')
@DefaultSlot('Side Nav Items displayed by the list.')
export class SideNavItem extends mixins(IconMixin) implements ItemContainer {
    // TSX Support
    public $tsxProps!: Readonly<Props>;

    // Props
    @Prop('whether selected', { type: Boolean, default: false })
    public isSelected!: boolean;

    @Prop('whether is subitem', { type: Boolean, default: false })
    public isSubitem!: boolean;

    @Prop('unique item identification', { type: String, required: true })
    public itemId!: string;

    @Prop('submenu title', { type: String, default: null })
    public submenuTitle!: string | null;

    @Prop('accessory icon (non-standard)', { type: String, default: null })
    public accessoryIcon!: string | null;

    @Prop('accessory icon color(non-standard)', { type: String, default: 'accent-6' })
    public color!: Color | null;

    @Prop('tooltip text(non-standard)', { type: String })
    public componentText!: string | null;

    @Inject({ from: SIDE_NAV, default: null })
    public sideNav!: SideNav | null;

    @Inject({ from: ITEM_CONTAINER, default: null })
    private parentItem!: ItemContainer | null;

    // Helper
    private isExpanded = false;

    private get hasChildItems(): boolean {
        return this.childItemIds.length > 0;
    }

    private get isChildItem(): boolean {
        return this.parentItem != null;
    }

    private get title(): string | VNode[] {
        return this.hasChildItems ? this.submenuTitle || '' : this.$slots.default || '';
    }

    // ItemContainer-Impls
    private childItemIds: string[] = [];

    public addItem(id: string) {
        this.childItemIds = Array.from(new Set([...this.childItemIds, id]));
    }
    public removeItem(id: string) {
        this.childItemIds = this.childItemIds.filter(childId => childId !== id);
    }

    // Vue-related
    public mounted() {
        const parentItem = this.parentItem;
        if (parentItem != null) {
            parentItem.addItem(this.itemId);
        }
    }

    public beforeDestroy() {
        const parentItem = this.parentItem;
        if (parentItem != null) {
            parentItem.removeItem(this.itemId);
        }
    }

    public render() {
        const title = this.title;
        const renderSubitems = () => {
            return (
                <ul class='fd-side-nav__sublist' aria-hidden={!this.isExpanded}>
                    {this.$slots.default}
                </ul>
            );
        };

        const iconClass = this.iconClassName;

        return (
            <li class={this.classes}>
                <a
                    role='link'
                    href='javascript:undefined'
                    on-click={this.handleClick}
                    aria-selected={this.ariaSelected}
                    class={this.linkClassObject}
                    title={this.componentText}
                >
                    {!!iconClass && <span class={`fd-side-nav__icon ${iconClass} sap-icon--m`} role='presentation' />}
                    {title}
                    {this.accessoryIcon && (
                        <Identifier
                            circle={true}
                            backgroundColor={this.color ? this.color : 'accent-6'}
                            class='fd-has-float-right'
                            size='xxs'
                            icon={this.accessoryIcon}
                        />
                    )}
                </a>
                {this.hasChildItems && renderSubitems()}
            </li>
        );
    }

    private get classes() {
        return {
            'fd-side-nav__item': !this.isChildItem,
            'fd-side-nav__subitem': this.isChildItem,
        };
    }

    private get isActive() {
        const list = this.sideNav;
        if (list == null) {
            return false;
        }
        const activeItemId = list.activeIndexPath;
        if (activeItemId == null) {
            return false;
        }
        return this.itemId === activeItemId;
    }

    private get ariaSelected() {
        return this.isSelected || this.isActive ? 'true' : 'false';
    }

    private get linkClassObject() {
        return {
            'fd-side-nav__link': !this.isChildItem,
            'fd-side-nav__sublink': this.isChildItem,
            'is-selected': this.isSelected,
            'is-expanded': this.isExpanded,
            'has-child': this.hasChildItems,
        };
    }

    // Event Handler
    private handleClick() {
        this.$emit('click', this);
        const list = this.sideNav;
        if (list != null) {
            list.didClickSideNavItem(this);
        }

        if (this.hasChildItems) {
            this.isExpanded = !this.isExpanded;
        }
    }
}
