import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, ViewChild, ViewEncapsulation, computed, forwardRef, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/tooltip";
export class PanelMenuSub {
    panelMenu;
    el;
    panelId;
    focusedItemId;
    items;
    itemTemplate;
    level = 0;
    activeItemPath;
    root;
    tabindex;
    transitionOptions;
    parentExpanded;
    itemToggle = new EventEmitter();
    menuFocus = new EventEmitter();
    menuBlur = new EventEmitter();
    menuKeyDown = new EventEmitter();
    listViewChild;
    constructor(panelMenu, el) {
        this.panelMenu = panelMenu;
        this.el = el;
    }
    getItemId(processedItem) {
        return processedItem.item?.id ?? `${this.panelId}_${processedItem.key}`;
    }
    getItemKey(processedItem) {
        return this.getItemId(processedItem);
    }
    getItemClass(processedItem) {
        return {
            'p-menuitem': true,
            'p-disabled': this.isItemDisabled(processedItem)
        };
    }
    getItemProp(processedItem, name, params) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    }
    getItemLabel(processedItem) {
        return this.getItemProp(processedItem, 'label');
    }
    isItemExpanded(processedItem) {
        return processedItem.expanded;
    }
    isItemActive(processedItem) {
        return this.isItemExpanded(processedItem) || this.activeItemPath.some((path) => path && path.key === processedItem.key);
    }
    isItemVisible(processedItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }
    isItemDisabled(processedItem) {
        return this.getItemProp(processedItem, 'disabled');
    }
    isItemFocused(processedItem) {
        return this.focusedItemId === this.getItemId(processedItem);
    }
    isItemGroup(processedItem) {
        return ObjectUtils.isNotEmpty(processedItem.items);
    }
    getAnimation(processedItem) {
        return this.isItemActive(processedItem) ? { value: 'visible', params: { transitionParams: this.transitionOptions, height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }
    getAriaSetSize() {
        return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }
    getAriaPosInset(index) {
        return index - this.items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1;
    }
    onItemClick(event, processedItem) {
        if (!this.isItemDisabled(processedItem)) {
            this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
            this.itemToggle.emit({ processedItem, expanded: !this.isItemActive(processedItem) });
        }
    }
    onItemToggle(event) {
        this.itemToggle.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PanelMenuSub, deps: [{ token: forwardRef(() => PanelMenu) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: PanelMenuSub, selector: "p-panelMenuSub", inputs: { panelId: "panelId", focusedItemId: "focusedItemId", items: "items", itemTemplate: "itemTemplate", level: "level", activeItemPath: "activeItemPath", root: "root", tabindex: "tabindex", transitionOptions: "transitionOptions", parentExpanded: "parentExpanded" }, outputs: { itemToggle: "itemToggle", menuFocus: "menuFocus", menuBlur: "menuBlur", menuKeyDown: "menuKeyDown" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "listViewChild", first: true, predicate: ["list"], descendants: true }], ngImport: i0, template: `
        <ul
            #list
            [ngClass]="{ 'p-submenu-list': true, 'p-panelmenu-root-list': root }"
            role="tree"
            [tabindex]="-1"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.data-pc-section]="'menu'"
            [attr.aria-hidden]="!parentExpanded"
            (focus)="menuFocus.emit($event)"
            (focusout)="menuBlur.emit($event)"
            (keydown)="menuKeyDown.emit($event)"
        >
            <ng-template ngFor let-processedItem let-index="index" [ngForOf]="items">
                <li *ngIf="processedItem.separator" class="p-menuitem-separator" role="separator"></li>
                <li
                    *ngIf="!processedItem.separator && isItemVisible(processedItem)"
                    [ngClass]="getItemClass(processedItem)"
                    role="treeitem"
                    [attr.id]="getItemId(processedItem)"
                    [attr.aria-label]="getItemProp(processedItem, 'label')"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    [class.p-hidden]="processedItem.visible === false"
                    [class.p-focus]="isItemFocused(processedItem) && !isItemDisabled(processedItem)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [pTooltip]="getItemProp(processedItem, 'tooltip')"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div class="p-menuitem-content" (click)="onItemClick($event, processedItem)">
                        <ng-container *ngIf="!itemTemplate">
                            <a
                                *ngIf="!getItemProp(processedItem, 'routerLink')"
                                [attr.href]="getItemProp(processedItem, 'url')"
                                class="p-menuitem-link"
                                [ngClass]="{ 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [target]="getItemProp(processedItem, 'target')"
                                [attr.data-pc-section]="'action'"
                                [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            >
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(processedItem)" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(processedItem)" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="processedItem.item?.escape !== false; else htmlLabel">{{ getItemProp(processedItem, 'label') }}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="processedItem.badge" [ngClass]="processedItem.badgeStyleClass">{{ processedItem.badge }}</span>
                            </a>
                            <a
                                *ngIf="getItemProp(processedItem, 'routerLink')"
                                [routerLink]="getItemProp(processedItem, 'routerLink')"
                                [queryParams]="getItemProp(processedItem, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                                class="p-menuitem-link"
                                [ngClass]="{ 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [target]="getItemProp(processedItem, 'target')"
                                [attr.title]="getItemProp(processedItem, 'title')"
                                [fragment]="getItemProp(processedItem, 'fragment')"
                                [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                [state]="getItemProp(processedItem, 'state')"
                                [attr.data-pc-section]="'action'"
                                [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            >
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                        <AngleDownIcon *ngIf="isItemActive(processedItem)" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                        <AngleRightIcon *ngIf="!isItemActive(processedItem)" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(processedItem, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(processedItem, 'label') }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="processedItem.badge" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>
                            </a>
                        </ng-container>
                        <ng-container *ngIf="itemTemplate">
                            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item }"></ng-template>
                        </ng-container>
                    </div>
                    <div class="p-toggleable-content" [@submenu]="getAnimation(processedItem)">
                        <p-panelMenuSub
                            *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)"
                            [id]="getItemId(processedItem) + '_list'"
                            [panelId]="panelId"
                            [items]="processedItem.items"
                            [itemTemplate]="itemTemplate"
                            [transitionOptions]="transitionOptions"
                            [focusedItemId]="focusedItemId"
                            [activeItemPath]="activeItemPath"
                            [level]="level + 1"
                            [parentExpanded]="!!parentExpanded && isItemExpanded(processedItem)"
                            (itemToggle)="onItemToggle($event)"
                        ></p-panelMenuSub>
                    </div>
                </li>
            </ng-template>
        </ul>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLink), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLinkActive), selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i0.forwardRef(() => i3.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(() => AngleDownIcon), selector: "AngleDownIcon" }, { kind: "component", type: i0.forwardRef(() => AngleRightIcon), selector: "AngleRightIcon" }, { kind: "component", type: i0.forwardRef(() => PanelMenuSub), selector: "p-panelMenuSub", inputs: ["panelId", "focusedItemId", "items", "itemTemplate", "level", "activeItemPath", "root", "tabindex", "transitionOptions", "parentExpanded"], outputs: ["itemToggle", "menuFocus", "menuBlur", "menuKeyDown"] }], animations: [
            trigger('submenu', [
                state('hidden', style({
                    height: '0'
                })),
                state('visible', style({
                    height: '*'
                })),
                transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                transition('void => *', animate(0))
            ])
        ], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PanelMenuSub, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-panelMenuSub',
                    template: `
        <ul
            #list
            [ngClass]="{ 'p-submenu-list': true, 'p-panelmenu-root-list': root }"
            role="tree"
            [tabindex]="-1"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.data-pc-section]="'menu'"
            [attr.aria-hidden]="!parentExpanded"
            (focus)="menuFocus.emit($event)"
            (focusout)="menuBlur.emit($event)"
            (keydown)="menuKeyDown.emit($event)"
        >
            <ng-template ngFor let-processedItem let-index="index" [ngForOf]="items">
                <li *ngIf="processedItem.separator" class="p-menuitem-separator" role="separator"></li>
                <li
                    *ngIf="!processedItem.separator && isItemVisible(processedItem)"
                    [ngClass]="getItemClass(processedItem)"
                    role="treeitem"
                    [attr.id]="getItemId(processedItem)"
                    [attr.aria-label]="getItemProp(processedItem, 'label')"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    [class.p-hidden]="processedItem.visible === false"
                    [class.p-focus]="isItemFocused(processedItem) && !isItemDisabled(processedItem)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [pTooltip]="getItemProp(processedItem, 'tooltip')"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div class="p-menuitem-content" (click)="onItemClick($event, processedItem)">
                        <ng-container *ngIf="!itemTemplate">
                            <a
                                *ngIf="!getItemProp(processedItem, 'routerLink')"
                                [attr.href]="getItemProp(processedItem, 'url')"
                                class="p-menuitem-link"
                                [ngClass]="{ 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [target]="getItemProp(processedItem, 'target')"
                                [attr.data-pc-section]="'action'"
                                [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            >
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(processedItem)" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(processedItem)" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="processedItem.item?.escape !== false; else htmlLabel">{{ getItemProp(processedItem, 'label') }}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="processedItem.badge" [ngClass]="processedItem.badgeStyleClass">{{ processedItem.badge }}</span>
                            </a>
                            <a
                                *ngIf="getItemProp(processedItem, 'routerLink')"
                                [routerLink]="getItemProp(processedItem, 'routerLink')"
                                [queryParams]="getItemProp(processedItem, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                                class="p-menuitem-link"
                                [ngClass]="{ 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [target]="getItemProp(processedItem, 'target')"
                                [attr.title]="getItemProp(processedItem, 'title')"
                                [fragment]="getItemProp(processedItem, 'fragment')"
                                [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                [state]="getItemProp(processedItem, 'state')"
                                [attr.data-pc-section]="'action'"
                                [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            >
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                        <AngleDownIcon *ngIf="isItemActive(processedItem)" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                        <AngleRightIcon *ngIf="!isItemActive(processedItem)" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(processedItem, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(processedItem, 'label') }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="processedItem.badge" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>
                            </a>
                        </ng-container>
                        <ng-container *ngIf="itemTemplate">
                            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item }"></ng-template>
                        </ng-container>
                    </div>
                    <div class="p-toggleable-content" [@submenu]="getAnimation(processedItem)">
                        <p-panelMenuSub
                            *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)"
                            [id]="getItemId(processedItem) + '_list'"
                            [panelId]="panelId"
                            [items]="processedItem.items"
                            [itemTemplate]="itemTemplate"
                            [transitionOptions]="transitionOptions"
                            [focusedItemId]="focusedItemId"
                            [activeItemPath]="activeItemPath"
                            [level]="level + 1"
                            [parentExpanded]="!!parentExpanded && isItemExpanded(processedItem)"
                            (itemToggle)="onItemToggle($event)"
                        ></p-panelMenuSub>
                    </div>
                </li>
            </ng-template>
        </ul>
    `,
                    animations: [
                        trigger('submenu', [
                            state('hidden', style({
                                height: '0'
                            })),
                            state('visible', style({
                                height: '*'
                            })),
                            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                            transition('void => *', animate(0))
                        ])
                    ],
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: PanelMenu, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => PanelMenu)]
                }] }, { type: i0.ElementRef }], propDecorators: { panelId: [{
                type: Input
            }], focusedItemId: [{
                type: Input
            }], items: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], level: [{
                type: Input
            }], activeItemPath: [{
                type: Input
            }], root: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], parentExpanded: [{
                type: Input
            }], itemToggle: [{
                type: Output
            }], menuFocus: [{
                type: Output
            }], menuBlur: [{
                type: Output
            }], menuKeyDown: [{
                type: Output
            }], listViewChild: [{
                type: ViewChild,
                args: ['list']
            }] } });
export class PanelMenuList {
    panelId;
    id;
    items;
    itemTemplate;
    parentExpanded;
    expanded;
    transitionOptions;
    root;
    tabindex;
    activeItem;
    itemToggle = new EventEmitter();
    headerFocus = new EventEmitter();
    subMenuViewChild;
    searchTimeout;
    searchValue;
    focused;
    focusedItem = signal(null);
    activeItemPath = signal([]);
    processedItems = signal([]);
    visibleItems = computed(() => {
        const processedItems = this.processedItems();
        return this.flatItems(processedItems);
    });
    get focusedItemId() {
        const focusedItem = this.focusedItem();
        return focusedItem && focusedItem.item?.id ? focusedItem.item.id : ObjectUtils.isNotEmpty(this.focusedItem()) ? `${this.panelId}_${this.focusedItem().key}` : undefined;
    }
    ngOnChanges(changes) {
        if (changes && changes.items && changes.items.currentValue) {
            this.processedItems.set(this.createProcessedItems(changes.items.currentValue || []));
        }
    }
    getItemProp(processedItem, name) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name]) : undefined;
    }
    getItemLabel(processedItem) {
        return this.getItemProp(processedItem, 'label');
    }
    isItemVisible(processedItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }
    isItemDisabled(processedItem) {
        return this.getItemProp(processedItem, 'disabled');
    }
    isItemActive(processedItem) {
        return this.activeItemPath().some((path) => path.key === processedItem.parentKey);
    }
    isItemGroup(processedItem) {
        return ObjectUtils.isNotEmpty(processedItem.items);
    }
    isElementInPanel(event, element) {
        const panel = event.currentTarget.closest('[data-pc-section="panel"]');
        return panel && panel.contains(element);
    }
    isItemMatched(processedItem) {
        return this.isValidItem(processedItem) && this.getItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }
    isVisibleItem(processedItem) {
        return !!processedItem && (processedItem.level === 0 || this.isItemActive(processedItem)) && this.isItemVisible(processedItem);
    }
    isValidItem(processedItem) {
        return !!processedItem && !this.isItemDisabled(processedItem) && !processedItem.separator;
    }
    findFirstItem() {
        return this.visibleItems().find((processedItem) => this.isValidItem(processedItem));
    }
    findLastItem() {
        return ObjectUtils.findLast(this.visibleItems(), (processedItem) => this.isValidItem(processedItem));
    }
    createProcessedItems(items, level = 0, parent = {}, parentKey = '') {
        const processedItems = [];
        items &&
            items.forEach((item, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                const newItem = {
                    icon: item.icon,
                    expanded: item.expanded,
                    separator: item.separator,
                    item,
                    index,
                    level,
                    key,
                    parent,
                    parentKey
                };
                newItem['items'] = this.createProcessedItems(item.items, level + 1, newItem, key);
                processedItems.push(newItem);
            });
        return processedItems;
    }
    findProcessedItemByItemKey(key, processedItems, level = 0) {
        processedItems = processedItems || this.processedItems();
        if (processedItems && processedItems.length) {
            for (let i = 0; i < processedItems.length; i++) {
                const processedItem = processedItems[i];
                if (this.getItemProp(processedItem, 'key') === key)
                    return processedItem;
                const matchedItem = this.findProcessedItemByItemKey(key, processedItem.items, level + 1);
                if (matchedItem)
                    return matchedItem;
            }
        }
    }
    flatItems(processedItems, processedFlattenItems = []) {
        processedItems &&
            processedItems.forEach((processedItem) => {
                if (this.isVisibleItem(processedItem)) {
                    processedFlattenItems.push(processedItem);
                    this.flatItems(processedItem.items, processedFlattenItems);
                }
            });
        return processedFlattenItems;
    }
    changeFocusedItem(event) {
        const { originalEvent, processedItem, focusOnNext, selfCheck, allowHeaderFocus = true } = event;
        if (ObjectUtils.isNotEmpty(this.focusedItem()) && this.focusedItem().key !== processedItem.key) {
            this.focusedItem.set(processedItem);
            this.scrollInView();
        }
        else if (allowHeaderFocus) {
            this.headerFocus.emit({ originalEvent, focusOnNext, selfCheck });
        }
    }
    scrollInView() {
        const element = DomHandler.findSingle(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }
    onFocus(event) {
        this.focused = true;
        const focusedItem = this.focusedItem() || (this.isElementInPanel(event, event.relatedTarget) ? this.findFirstItem() : this.findLastItem());
        if (event.relatedTarget !== null)
            this.focusedItem.set(focusedItem);
    }
    onBlur(event) {
        this.focused = false;
        this.focusedItem.set(null);
        this.searchValue = '';
    }
    onItemToggle(event) {
        this.focused = true;
        const { processedItem, expanded } = event;
        processedItem.expanded = !processedItem.expanded;
        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== processedItem.parentKey);
        expanded && activeItemPath.push(processedItem);
        this.activeItemPath.set(activeItemPath);
        const processedItems = this.processedItems();
        const newProcessedItems = processedItems.map((item) => (item === processedItem ? processedItem : item));
        this.processedItems.set(newProcessedItems);
        this.focusedItem.set(processedItem);
    }
    onKeyDown(event) {
        const metaKey = event.metaKey || event.ctrlKey;
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;
            case 'ArrowLeft':
                this.onArrowLeftKey(event);
                break;
            case 'ArrowRight':
                this.onArrowRightKey(event);
                break;
            case 'Home':
                this.onHomeKey(event);
                break;
            case 'End':
                this.onEndKey(event);
                break;
            case 'Space':
                this.onSpaceKey(event);
                break;
            case 'Enter':
                this.onEnterKey(event);
                break;
            case 'Escape':
            case 'Tab':
            case 'PageDown':
            case 'PageUp':
            case 'Backspace':
            case 'ShiftLeft':
            case 'ShiftRight':
                //NOOP
                break;
            default:
                if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                    this.searchItems(event, event.key);
                }
                break;
        }
    }
    onArrowDownKey(event) {
        const processedItem = ObjectUtils.isNotEmpty(this.focusedItem()) ? this.findNextItem(this.focusedItem()) : this.findFirstItem();
        this.changeFocusedItem({ originalEvent: event, processedItem, focusOnNext: true });
        event.preventDefault();
    }
    onArrowUpKey(event) {
        const processedItem = ObjectUtils.isNotEmpty(this.focusedItem()) ? this.findPrevItem(this.focusedItem()) : this.findLastItem();
        this.changeFocusedItem({ originalEvent: event, processedItem, selfCheck: true });
        event.preventDefault();
    }
    onArrowLeftKey(event) {
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const matched = this.activeItemPath().some((p) => p.key === this.focusedItem().key);
            if (matched) {
                const activeItemPath = this.activeItemPath().filter((p) => p.key !== this.focusedItem().key);
                this.activeItemPath.set(activeItemPath);
            }
            else {
                const focusedItem = ObjectUtils.isNotEmpty(this.focusedItem().parent) ? this.focusedItem().parent : this.focusedItem();
                this.focusedItem.set(focusedItem);
            }
            event.preventDefault();
        }
    }
    onArrowRightKey(event) {
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const grouped = this.isItemGroup(this.focusedItem());
            if (grouped) {
                const matched = this.activeItemPath().some((p) => p.key === this.focusedItem().key);
                if (matched) {
                    this.onArrowDownKey(event);
                }
                else {
                    const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== this.focusedItem().parentKey);
                    activeItemPath.push(this.focusedItem());
                    this.activeItemPath.set(activeItemPath);
                }
            }
            event.preventDefault();
        }
    }
    onHomeKey(event) {
        this.changeFocusedItem({ originalEvent: event, processedItem: this.findFirstItem(), allowHeaderFocus: false });
        event.preventDefault();
    }
    onEndKey(event) {
        this.changeFocusedItem({ originalEvent: event, processedItem: this.findLastItem(), focusOnNext: true, allowHeaderFocus: false });
        event.preventDefault();
    }
    onEnterKey(event) {
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const element = DomHandler.findSingle(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
            const anchorElement = element && (DomHandler.findSingle(element, '[data-pc-section="action"]') || DomHandler.findSingle(element, 'a,button'));
            anchorElement ? anchorElement.click() : element && element.click();
        }
        event.preventDefault();
    }
    onSpaceKey(event) {
        this.onEnterKey(event);
    }
    findNextItem(processedItem) {
        const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);
        const matchedItem = index < this.visibleItems().length - 1
            ? this.visibleItems()
                .slice(index + 1)
                .find((pItem) => this.isValidItem(pItem))
            : undefined;
        return matchedItem || processedItem;
    }
    findPrevItem(processedItem) {
        const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);
        const matchedItem = index > 0 ? ObjectUtils.findLast(this.visibleItems().slice(0, index), (pItem) => this.isValidItem(pItem)) : undefined;
        return matchedItem || processedItem;
    }
    searchItems(event, char) {
        this.searchValue = (this.searchValue || '') + char;
        let matchedItem = null;
        let matched = false;
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const focusedItemIndex = this.visibleItems().findIndex((processedItem) => processedItem.key === this.focusedItem().key);
            matchedItem = this.visibleItems()
                .slice(focusedItemIndex)
                .find((processedItem) => this.isItemMatched(processedItem));
            matchedItem = ObjectUtils.isEmpty(matchedItem)
                ? this.visibleItems()
                    .slice(0, focusedItemIndex)
                    .find((processedItem) => this.isItemMatched(processedItem))
                : matchedItem;
        }
        else {
            matchedItem = this.visibleItems().find((processedItem) => this.isItemMatched(processedItem));
        }
        if (ObjectUtils.isNotEmpty(matchedItem)) {
            matched = true;
        }
        if (ObjectUtils.isEmpty(matchedItem) && ObjectUtils.isEmpty(this.focusedItem())) {
            matchedItem = this.findFirstItem();
        }
        if (ObjectUtils.isNotEmpty(matchedItem)) {
            this.changeFocusedItem({
                originalEvent: event,
                processedItem: matchedItem,
                allowHeaderFocus: false
            });
        }
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(() => {
            this.searchValue = '';
            this.searchTimeout = null;
        }, 500);
        return matched;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PanelMenuList, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: PanelMenuList, selector: "p-panelMenuList", inputs: { panelId: "panelId", id: "id", items: "items", itemTemplate: "itemTemplate", parentExpanded: "parentExpanded", expanded: "expanded", transitionOptions: "transitionOptions", root: "root", tabindex: "tabindex", activeItem: "activeItem" }, outputs: { itemToggle: "itemToggle", headerFocus: "headerFocus" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "subMenuViewChild", first: true, predicate: ["submenu"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <p-panelMenuSub
            #submenu
            [root]="true"
            [id]="panelId + '_list'"
            [panelId]="panelId"
            [tabindex]="tabindex"
            [itemTemplate]="itemTemplate"
            [focusedItemId]="focused ? focusedItemId : undefined"
            [activeItemPath]="activeItemPath()"
            [transitionOptions]="transitionOptions"
            [items]="processedItems()"
            [parentExpanded]="parentExpanded"
            (itemToggle)="onItemToggle($event)"
            (keydown)="onKeyDown($event)"
            (menuFocus)="onFocus($event)"
            (menuBlur)="onBlur($event)"
        ></p-panelMenuSub>
    `, isInline: true, styles: ["@layer primeng{.p-panelmenu .p-panelmenu-header-action{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-action:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;text-decoration:none;position:relative;overflow:hidden;outline:none}.p-panelmenu .p-menuitem-text{line-height:1}.p-panelmenu-expanded.p-toggleable-content:not(.ng-animating),.p-panelmenu .p-submenu-expanded:not(.ng-animating){overflow:visible}.p-panelmenu .p-toggleable-content,.p-panelmenu .p-submenu-list{overflow:hidden}}\n"], dependencies: [{ kind: "component", type: PanelMenuSub, selector: "p-panelMenuSub", inputs: ["panelId", "focusedItemId", "items", "itemTemplate", "level", "activeItemPath", "root", "tabindex", "transitionOptions", "parentExpanded"], outputs: ["itemToggle", "menuFocus", "menuBlur", "menuKeyDown"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PanelMenuList, decorators: [{
            type: Component,
            args: [{ selector: 'p-panelMenuList', template: `
        <p-panelMenuSub
            #submenu
            [root]="true"
            [id]="panelId + '_list'"
            [panelId]="panelId"
            [tabindex]="tabindex"
            [itemTemplate]="itemTemplate"
            [focusedItemId]="focused ? focusedItemId : undefined"
            [activeItemPath]="activeItemPath()"
            [transitionOptions]="transitionOptions"
            [items]="processedItems()"
            [parentExpanded]="parentExpanded"
            (itemToggle)="onItemToggle($event)"
            (keydown)="onKeyDown($event)"
            (menuFocus)="onFocus($event)"
            (menuBlur)="onBlur($event)"
        ></p-panelMenuSub>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-panelmenu .p-panelmenu-header-action{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-action:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;text-decoration:none;position:relative;overflow:hidden;outline:none}.p-panelmenu .p-menuitem-text{line-height:1}.p-panelmenu-expanded.p-toggleable-content:not(.ng-animating),.p-panelmenu .p-submenu-expanded:not(.ng-animating){overflow:visible}.p-panelmenu .p-toggleable-content,.p-panelmenu .p-submenu-list{overflow:hidden}}\n"] }]
        }], propDecorators: { panelId: [{
                type: Input
            }], id: [{
                type: Input
            }], items: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], parentExpanded: [{
                type: Input
            }], expanded: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], root: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], activeItem: [{
                type: Input
            }], itemToggle: [{
                type: Output
            }], headerFocus: [{
                type: Output
            }], subMenuViewChild: [{
                type: ViewChild,
                args: ['submenu']
            }] } });
/**
 * PanelMenu is a hybrid of Accordion and Tree components.
 * @group Components
 */
export class PanelMenu {
    cd;
    /**
     * An array of menuitems.
     * @group Props
     */
    model;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Whether multiple tabs can be activated at the same time or not.
     * @group Props
     */
    multiple = false;
    /**
     * Transition options of the animation.
     * @group Props
     */
    transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * Current id state as a string.
     * @group Props
     */
    id;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    templates;
    containerViewChild;
    submenuIconTemplate;
    itemTemplate;
    animating;
    activeItem = signal(null);
    ngOnInit() {
        this.id = this.id || UniqueComponentId();
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'submenuicon':
                    this.submenuIconTemplate = item.template;
                    break;
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    constructor(cd) {
        this.cd = cd;
    }
    /**
     * Collapses open panels.
     * @group Method
     */
    collapseAll() {
        for (let item of this.model) {
            if (item.expanded) {
                item.expanded = false;
            }
        }
        this.cd.detectChanges();
    }
    onToggleDone() {
        this.animating = false;
    }
    changeActiveItem(event, item, index, selfActive = false) {
        if (!this.isItemDisabled(item)) {
            const activeItem = selfActive ? item : this.activeItem && ObjectUtils.equals(item, this.activeItem) ? null : item;
            this.activeItem.set(activeItem);
        }
    }
    getAnimation(item) {
        return item.expanded ? { value: 'visible', params: { transitionParams: this.animating ? this.transitionOptions : '0ms', height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }
    getItemProp(item, name) {
        return item ? ObjectUtils.getItemValue(item[name]) : undefined;
    }
    getItemLabel(item) {
        return this.getItemProp(item, 'label');
    }
    isItemActive(item) {
        return item.expanded;
    }
    isItemVisible(item) {
        return this.getItemProp(item, 'visible') !== false;
    }
    isItemDisabled(item) {
        return this.getItemProp(item, 'disabled');
    }
    isItemGroup(item) {
        return ObjectUtils.isNotEmpty(item.items);
    }
    getPanelId(index, item) {
        return item && item.id ? item.id : `${this.id}_${index}`;
    }
    getHeaderId(item, index) {
        return item.id ? item.id + '_header' : `${this.getPanelId(index)}_header`;
    }
    getContentId(item, index) {
        return item.id ? item.id + '_content' : `${this.getPanelId(index)}_content`;
    }
    updateFocusedHeader(event) {
        const { originalEvent, focusOnNext, selfCheck } = event;
        const panelElement = originalEvent.currentTarget.closest('[data-pc-section="panel"]');
        const header = selfCheck ? DomHandler.findSingle(panelElement, '[data-pc-section="header"]') : focusOnNext ? this.findNextHeader(panelElement) : this.findPrevHeader(panelElement);
        header ? this.changeFocusedHeader(originalEvent, header) : focusOnNext ? this.onHeaderHomeKey(originalEvent) : this.onHeaderEndKey(originalEvent);
    }
    changeFocusedHeader(event, element) {
        element && DomHandler.focus(element);
    }
    findNextHeader(panelElement, selfCheck = false) {
        const nextPanelElement = selfCheck ? panelElement : panelElement.nextElementSibling;
        const headerElement = DomHandler.findSingle(nextPanelElement, '[data-pc-section="header"]');
        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeader(headerElement.parentElement) : headerElement) : null;
    }
    findPrevHeader(panelElement, selfCheck = false) {
        const prevPanelElement = selfCheck ? panelElement : panelElement.previousElementSibling;
        const headerElement = DomHandler.findSingle(prevPanelElement, '[data-pc-section="header"]');
        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeader(headerElement.parentElement) : headerElement) : null;
    }
    findFirstHeader() {
        return this.findNextHeader(this.containerViewChild.nativeElement.firstElementChild, true);
    }
    findLastHeader() {
        return this.findPrevHeader(this.containerViewChild.nativeElement.lastElementChild, true);
    }
    onHeaderClick(event, item, index) {
        if (this.isItemDisabled(item)) {
            event.preventDefault();
            return;
        }
        if (item.command) {
            item.command({ originalEvent: event, item });
        }
        if (!this.multiple) {
            for (let modelItem of this.model) {
                if (item !== modelItem && modelItem.expanded) {
                    modelItem.expanded = false;
                }
            }
        }
        item.expanded = !item.expanded;
        this.changeActiveItem(event, item, index);
        this.animating = true;
        DomHandler.focus(event.currentTarget);
    }
    onHeaderKeyDown(event, item, index) {
        switch (event.code) {
            case 'ArrowDown':
                this.onHeaderArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onHeaderArrowUpKey(event);
                break;
            case 'Home':
                this.onHeaderHomeKey(event);
                break;
            case 'End':
                this.onHeaderEndKey(event);
                break;
            case 'Enter':
            case 'Space':
                this.onHeaderEnterKey(event, item, index);
                break;
            default:
                break;
        }
    }
    onHeaderArrowDownKey(event) {
        const rootList = DomHandler.getAttribute(event.currentTarget, 'data-p-highlight') === true ? DomHandler.findSingle(event.currentTarget.nextElementSibling, '[data-pc-section="menu"]') : null;
        rootList ? DomHandler.focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: true });
        event.preventDefault();
    }
    onHeaderArrowUpKey(event) {
        const prevHeader = this.findPrevHeader(event.currentTarget.parentElement) || this.findLastHeader();
        const rootList = DomHandler.getAttribute(prevHeader, 'data-p-highlight') === true ? DomHandler.findSingle(prevHeader.nextElementSibling, '[data-pc-section="menu"]') : null;
        rootList ? DomHandler.focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: false });
        event.preventDefault();
    }
    onHeaderHomeKey(event) {
        this.changeFocusedHeader(event, this.findFirstHeader());
        event.preventDefault();
    }
    onHeaderEndKey(event) {
        this.changeFocusedHeader(event, this.findLastHeader());
        event.preventDefault();
    }
    onHeaderEnterKey(event, item, index) {
        const headerAction = DomHandler.findSingle(event.currentTarget, '[data-pc-section="headeraction"]');
        headerAction ? headerAction.click() : this.onHeaderClick(event, item, index);
        event.preventDefault();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PanelMenu, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: PanelMenu, selector: "p-panelMenu", inputs: { model: "model", style: "style", styleClass: "styleClass", multiple: "multiple", transitionOptions: "transitionOptions", id: "id", tabindex: "tabindex" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-panelmenu p-component'" #container>
            <ng-container *ngFor="let item of model; let f = first; let l = last; let i = index">
                <div *ngIf="isItemVisible(item)" class="p-panelmenu-panel" [ngClass]="getItemProp(item, 'headerClass')" [ngStyle]="getItemProp(item, 'style')" [attr.data-pc-section]="'panel'">
                    <div
                        [ngClass]="{ 'p-component p-panelmenu-header': true, 'p-highlight': isItemActive(item), 'p-disabled': isItemDisabled(item) }"
                        [class]="getItemProp(item, 'styleClass')"
                        [ngStyle]="getItemProp(item, 'style')"
                        [pTooltip]="getItemProp(item, 'tooltip')"
                        [attr.id]="getHeaderId(item, i)"
                        [tabindex]="0"
                        role="button"
                        [tooltipOptions]="getItemProp(item, 'tooltipOptions')"
                        [attr.aria-expanded]="isItemActive(item)"
                        [attr.aria-label]="getItemProp(item, 'label')"
                        [attr.aria-controls]="getContentId(item, i)"
                        [attr.aria-disabled]="isItemDisabled(item)"
                        [attr.data-p-highlight]="isItemActive(item)"
                        [attr.data-p-disabled]="isItemDisabled(item)"
                        [attr.data-pc-section]="'header'"
                        (click)="onHeaderClick($event, item, i)"
                        (keydown)="onHeaderKeyDown($event, item, i)"
                    >
                        <div class="p-panelmenu-header-content">
                            <a
                                *ngIf="!getItemProp(item, 'routerLink')"
                                [attr.href]="getItemProp(item, 'url')"
                                [attr.tabindex]="-1"
                                [target]="getItemProp(item, 'target')"
                                [attr.title]="getItemProp(item, 'title')"
                                class="p-panelmenu-header-action"
                                [attr.data-pc-section]="'headeraction'"
                            >
                                <ng-container *ngIf="isItemGroup(item)">
                                    <ng-container *ngIf="!submenuIconTemplate">
                                        <ChevronDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(item)" />
                                        <ChevronRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(item)" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(item, 'escape') !== false; else htmlLabel">{{ getItemProp(item, 'label') }}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(item, 'badge')" [ngClass]="getItemProp(item, 'badgeStyleClass')">{{ getItemProp(item, 'badge') }}</span>
                            </a>
                            <a
                                *ngIf="getItemProp(item, 'routerLink')"
                                [routerLink]="getItemProp(item, 'routerLink')"
                                [queryParams]="getItemProp(item, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(item, 'routerLinkActiveOptions') || { exact: false }"
                                [target]="getItemProp(item, 'target')"
                                class="p-panelmenu-header-action"
                                [attr.tabindex]="-1"
                                [fragment]="getItemProp(item, 'fragment')"
                                [queryParamsHandling]="getItemProp(item, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(item, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(item, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(item, 'replaceUrl')"
                                [state]="getItemProp(item, 'state')"
                                [attr.data-pc-section]="'headeraction'"
                            >
                                <ng-container *ngIf="isItemGroup(item)">
                                    <ng-container *ngIf="!submenuIconTemplate">
                                        <ChevronDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(item)" />
                                        <ChevronRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(item)" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(item, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(item, 'label') }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(item, 'badge')" [ngClass]="getItemProp(item, 'badgeStyleClass')">{{ getItemProp(item, 'badge') }}</span>
                            </a>
                        </div>
                    </div>
                    <div
                        *ngIf="isItemGroup(item)"
                        class="p-toggleable-content"
                        [ngClass]="{ 'p-panelmenu-expanded': isItemActive(item) }"
                        [@rootItem]="getAnimation(item)"
                        (@rootItem.done)="onToggleDone()"
                        role="region"
                        [attr.id]="getContentId(item, i)"
                        [attr.aria-labelledby]="getHeaderId(item, i)"
                        [attr.data-pc-section]="'toggleablecontent'"
                    >
                        <div class="p-panelmenu-content" [attr.data-pc-section]="'menucontent'">
                            <p-panelMenuList
                                [panelId]="getPanelId(i, item)"
                                [items]="getItemProp(item, 'items')"
                                [itemTemplate]="itemTemplate"
                                [transitionOptions]="transitionOptions"
                                [root]="true"
                                [activeItem]="activeItem()"
                                [tabindex]="tabindex"
                                [parentExpanded]="isItemActive(item)"
                                (headerFocus)="updateFocusedHeader($event)"
                            ></p-panelMenuList>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-panelmenu .p-panelmenu-header-action{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-action:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;text-decoration:none;position:relative;overflow:hidden;outline:none}.p-panelmenu .p-menuitem-text{line-height:1}.p-panelmenu-expanded.p-toggleable-content:not(.ng-animating),.p-panelmenu .p-submenu-expanded:not(.ng-animating){overflow:visible}.p-panelmenu .p-toggleable-content,.p-panelmenu .p-submenu-list{overflow:hidden}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLink), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLinkActive), selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i0.forwardRef(() => i3.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(() => PanelMenuList), selector: "p-panelMenuList", inputs: ["panelId", "id", "items", "itemTemplate", "parentExpanded", "expanded", "transitionOptions", "root", "tabindex", "activeItem"], outputs: ["itemToggle", "headerFocus"] }], animations: [
            trigger('rootItem', [
                state('hidden', style({
                    height: '0'
                })),
                state('visible', style({
                    height: '*'
                })),
                transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                transition('void => *', animate(0))
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PanelMenu, decorators: [{
            type: Component,
            args: [{ selector: 'p-panelMenu', template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-panelmenu p-component'" #container>
            <ng-container *ngFor="let item of model; let f = first; let l = last; let i = index">
                <div *ngIf="isItemVisible(item)" class="p-panelmenu-panel" [ngClass]="getItemProp(item, 'headerClass')" [ngStyle]="getItemProp(item, 'style')" [attr.data-pc-section]="'panel'">
                    <div
                        [ngClass]="{ 'p-component p-panelmenu-header': true, 'p-highlight': isItemActive(item), 'p-disabled': isItemDisabled(item) }"
                        [class]="getItemProp(item, 'styleClass')"
                        [ngStyle]="getItemProp(item, 'style')"
                        [pTooltip]="getItemProp(item, 'tooltip')"
                        [attr.id]="getHeaderId(item, i)"
                        [tabindex]="0"
                        role="button"
                        [tooltipOptions]="getItemProp(item, 'tooltipOptions')"
                        [attr.aria-expanded]="isItemActive(item)"
                        [attr.aria-label]="getItemProp(item, 'label')"
                        [attr.aria-controls]="getContentId(item, i)"
                        [attr.aria-disabled]="isItemDisabled(item)"
                        [attr.data-p-highlight]="isItemActive(item)"
                        [attr.data-p-disabled]="isItemDisabled(item)"
                        [attr.data-pc-section]="'header'"
                        (click)="onHeaderClick($event, item, i)"
                        (keydown)="onHeaderKeyDown($event, item, i)"
                    >
                        <div class="p-panelmenu-header-content">
                            <a
                                *ngIf="!getItemProp(item, 'routerLink')"
                                [attr.href]="getItemProp(item, 'url')"
                                [attr.tabindex]="-1"
                                [target]="getItemProp(item, 'target')"
                                [attr.title]="getItemProp(item, 'title')"
                                class="p-panelmenu-header-action"
                                [attr.data-pc-section]="'headeraction'"
                            >
                                <ng-container *ngIf="isItemGroup(item)">
                                    <ng-container *ngIf="!submenuIconTemplate">
                                        <ChevronDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(item)" />
                                        <ChevronRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(item)" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(item, 'escape') !== false; else htmlLabel">{{ getItemProp(item, 'label') }}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(item, 'badge')" [ngClass]="getItemProp(item, 'badgeStyleClass')">{{ getItemProp(item, 'badge') }}</span>
                            </a>
                            <a
                                *ngIf="getItemProp(item, 'routerLink')"
                                [routerLink]="getItemProp(item, 'routerLink')"
                                [queryParams]="getItemProp(item, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(item, 'routerLinkActiveOptions') || { exact: false }"
                                [target]="getItemProp(item, 'target')"
                                class="p-panelmenu-header-action"
                                [attr.tabindex]="-1"
                                [fragment]="getItemProp(item, 'fragment')"
                                [queryParamsHandling]="getItemProp(item, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(item, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(item, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(item, 'replaceUrl')"
                                [state]="getItemProp(item, 'state')"
                                [attr.data-pc-section]="'headeraction'"
                            >
                                <ng-container *ngIf="isItemGroup(item)">
                                    <ng-container *ngIf="!submenuIconTemplate">
                                        <ChevronDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(item)" />
                                        <ChevronRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(item)" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(item, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(item, 'label') }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(item, 'badge')" [ngClass]="getItemProp(item, 'badgeStyleClass')">{{ getItemProp(item, 'badge') }}</span>
                            </a>
                        </div>
                    </div>
                    <div
                        *ngIf="isItemGroup(item)"
                        class="p-toggleable-content"
                        [ngClass]="{ 'p-panelmenu-expanded': isItemActive(item) }"
                        [@rootItem]="getAnimation(item)"
                        (@rootItem.done)="onToggleDone()"
                        role="region"
                        [attr.id]="getContentId(item, i)"
                        [attr.aria-labelledby]="getHeaderId(item, i)"
                        [attr.data-pc-section]="'toggleablecontent'"
                    >
                        <div class="p-panelmenu-content" [attr.data-pc-section]="'menucontent'">
                            <p-panelMenuList
                                [panelId]="getPanelId(i, item)"
                                [items]="getItemProp(item, 'items')"
                                [itemTemplate]="itemTemplate"
                                [transitionOptions]="transitionOptions"
                                [root]="true"
                                [activeItem]="activeItem()"
                                [tabindex]="tabindex"
                                [parentExpanded]="isItemActive(item)"
                                (headerFocus)="updateFocusedHeader($event)"
                            ></p-panelMenuList>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `, animations: [
                        trigger('rootItem', [
                            state('hidden', style({
                                height: '0'
                            })),
                            state('visible', style({
                                height: '*'
                            })),
                            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                            transition('void => *', animate(0))
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-panelmenu .p-panelmenu-header-action{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-action:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;text-decoration:none;position:relative;overflow:hidden;outline:none}.p-panelmenu .p-menuitem-text{line-height:1}.p-panelmenu-expanded.p-toggleable-content:not(.ng-animating),.p-panelmenu .p-submenu-expanded:not(.ng-animating){overflow:visible}.p-panelmenu .p-toggleable-content,.p-panelmenu .p-submenu-list{overflow:hidden}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { model: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], multiple: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], id: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }] } });
export class PanelMenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PanelMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: PanelMenuModule, declarations: [PanelMenu, PanelMenuSub, PanelMenuList], imports: [CommonModule, RouterModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon], exports: [PanelMenu, RouterModule, TooltipModule, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PanelMenuModule, imports: [CommonModule, RouterModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon, RouterModule, TooltipModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PanelMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon],
                    exports: [PanelMenu, RouterModule, TooltipModule, SharedModule],
                    declarations: [PanelMenu, PanelMenuSub, PanelMenuList]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWxtZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3BhbmVsbWVudS9wYW5lbG1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVILHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFFUixNQUFNLEVBSU4sU0FBUyxFQUNULGlCQUFpQixFQUNqQixRQUFRLEVBQ1IsVUFBVSxFQUNWLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFZLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDcEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUEwSS9ELE1BQU0sT0FBTyxZQUFZO0lBK0JtQztJQUE2QjtJQTlCNUUsT0FBTyxDQUFxQjtJQUU1Qixh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QWMsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLENBQUM7b0JBQ3BJLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQztvQkFDL0QsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUM7aUJBQ3pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIGNvbXB1dGVkLFxuICAgIGZvcndhcmRSZWYsXG4gICAgc2lnbmFsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE1lbnVJdGVtLCBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgQW5nbGVEb3duSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVkb3duJztcbmltcG9ydCB7IEFuZ2xlUmlnaHRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hbmdsZXJpZ2h0JztcbmltcG9ydCB7IENoZXZyb25Eb3duSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbmRvd24nO1xuaW1wb3J0IHsgQ2hldnJvblJpZ2h0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbnJpZ2h0JztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xuaW1wb3J0IHsgT2JqZWN0VXRpbHMsIFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wYW5lbE1lbnVTdWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx1bFxuICAgICAgICAgICAgI2xpc3RcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3Atc3VibWVudS1saXN0JzogdHJ1ZSwgJ3AtcGFuZWxtZW51LXJvb3QtbGlzdCc6IHJvb3QgfVwiXG4gICAgICAgICAgICByb2xlPVwidHJlZVwiXG4gICAgICAgICAgICBbdGFiaW5kZXhdPVwiLTFcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50XT1cImZvY3VzZWRJdGVtSWRcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtZW51J1wiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCIhcGFyZW50RXhwYW5kZWRcIlxuICAgICAgICAgICAgKGZvY3VzKT1cIm1lbnVGb2N1cy5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgKGZvY3Vzb3V0KT1cIm1lbnVCbHVyLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAoa2V5ZG93bik9XCJtZW51S2V5RG93bi5lbWl0KCRldmVudClcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXByb2Nlc3NlZEl0ZW0gbGV0LWluZGV4PVwiaW5kZXhcIiBbbmdGb3JPZl09XCJpdGVtc1wiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cInByb2Nlc3NlZEl0ZW0uc2VwYXJhdG9yXCIgY2xhc3M9XCJwLW1lbnVpdGVtLXNlcGFyYXRvclwiIHJvbGU9XCJzZXBhcmF0b3JcIj48L2xpPlxuICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIiFwcm9jZXNzZWRJdGVtLnNlcGFyYXRvciAmJiBpc0l0ZW1WaXNpYmxlKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0SXRlbUNsYXNzKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cInRyZWVpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiZ2V0SXRlbUlkKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnbGFiZWwnKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSkgPyBpc0l0ZW1BY3RpdmUocHJvY2Vzc2VkSXRlbSkgOiB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxldmVsXT1cImxldmVsICsgMVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2V0c2l6ZV09XCJnZXRBcmlhU2V0U2l6ZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1wb3NpbnNldF09XCJnZXRBcmlhUG9zSW5zZXQoaW5kZXgpXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdzdHlsZUNsYXNzJylcIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3MucC1oaWRkZW5dPVwicHJvY2Vzc2VkSXRlbS52aXNpYmxlID09PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5wLWZvY3VzXT1cImlzSXRlbUZvY3VzZWQocHJvY2Vzc2VkSXRlbSkgJiYgIWlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3N0eWxlJylcIlxuICAgICAgICAgICAgICAgICAgICBbcFRvb2x0aXBdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3Rvb2x0aXAnKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcC1kaXNhYmxlZF09XCJpc0l0ZW1EaXNhYmxlZChwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIFt0b29sdGlwT3B0aW9uc109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAndG9vbHRpcE9wdGlvbnMnKVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tZW51aXRlbS1jb250ZW50XCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgcHJvY2Vzc2VkSXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXRlbVRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3JvdXRlckxpbmsnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmhyZWZdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3VybCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLW1lbnVpdGVtLWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWRpc2FibGVkJzogZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2Rpc2FibGVkJykgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3RhcmdldCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidhY3Rpb24nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiISFwYXJlbnRFeHBhbmRlZCA/ICcwJyA6ICctMSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXBhbmVsTWVudS5zdWJtZW51SWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG93bkljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiICpuZ0lmPVwiaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pXCIgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ljb25TdHlsZScpXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVSaWdodEljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiICpuZ0lmPVwiIWlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKVwiIFtuZ1N0eWxlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdpY29uU3R5bGUnKVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInBhbmVsTWVudS5zdWJtZW51SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwicHJvY2Vzc2VkSXRlbS5pY29uXCIgKm5nSWY9XCJwcm9jZXNzZWRJdGVtLmljb25cIiBbbmdTdHlsZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnaWNvblN0eWxlJylcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgKm5nSWY9XCJwcm9jZXNzZWRJdGVtLml0ZW0/LmVzY2FwZSAhPT0gZmFsc2U7IGVsc2UgaHRtbExhYmVsXCI+e3sgZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2xhYmVsJykgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbExhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnbGFiZWwnKVwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tYmFkZ2VcIiAqbmdJZj1cInByb2Nlc3NlZEl0ZW0uYmFkZ2VcIiBbbmdDbGFzc109XCJwcm9jZXNzZWRJdGVtLmJhZGdlU3R5bGVDbGFzc1wiPnt7IHByb2Nlc3NlZEl0ZW0uYmFkZ2UgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3JvdXRlckxpbmsnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdyb3V0ZXJMaW5rJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcXVlcnlQYXJhbXNdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3F1ZXJ5UGFyYW1zJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZV09XCIncC1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3JvdXRlckxpbmtBY3RpdmVPcHRpb25zJykgfHwgeyBleGFjdDogZmFsc2UgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1tZW51aXRlbS1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1kaXNhYmxlZCc6IGdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdkaXNhYmxlZCcpIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFyZ2V0XT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd0YXJnZXQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd0aXRsZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdmcmFnbWVudCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3F1ZXJ5UGFyYW1zSGFuZGxpbmcnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcmVzZXJ2ZUZyYWdtZW50XT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdwcmVzZXJ2ZUZyYWdtZW50JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdza2lwTG9jYXRpb25DaGFuZ2UnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZXBsYWNlVXJsXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdyZXBsYWNlVXJsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3RhdGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3N0YXRlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2FjdGlvbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCIhIXBhcmVudEV4cGFuZGVkID8gJzAnIDogJy0xJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhcGFuZWxNZW51LnN1Ym1lbnVJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3duSWNvbiAqbmdJZj1cImlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKVwiIFtzdHlsZUNsYXNzXT1cIidwLXN1Ym1lbnUtaWNvbidcIiBbbmdTdHlsZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnaWNvblN0eWxlJylcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBbmdsZVJpZ2h0SWNvbiAqbmdJZj1cIiFpc0l0ZW1BY3RpdmUocHJvY2Vzc2VkSXRlbSlcIiBbc3R5bGVDbGFzc109XCIncC1zdWJtZW51LWljb24nXCIgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ljb25TdHlsZScpXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwicGFuZWxNZW51LnN1Ym1lbnVJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJwcm9jZXNzZWRJdGVtLmljb25cIiAqbmdJZj1cInByb2Nlc3NlZEl0ZW0uaWNvblwiIFtuZ1N0eWxlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdpY29uU3R5bGUnKVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdlc2NhcGUnKSAhPT0gZmFsc2U7IGVsc2UgaHRtbFJvdXRlTGFiZWxcIj57eyBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnbGFiZWwnKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sUm91dGVMYWJlbD48c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiIFtpbm5lckhUTUxdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2xhYmVsJylcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWJhZGdlXCIgKm5nSWY9XCJwcm9jZXNzZWRJdGVtLmJhZGdlXCIgW25nQ2xhc3NdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2JhZGdlU3R5bGVDbGFzcycpXCI+e3sgZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2JhZGdlJykgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXRlbVRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogcHJvY2Vzc2VkSXRlbS5pdGVtIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10b2dnbGVhYmxlLWNvbnRlbnRcIiBbQHN1Ym1lbnVdPVwiZ2V0QW5pbWF0aW9uKHByb2Nlc3NlZEl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cC1wYW5lbE1lbnVTdWJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkgJiYgaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJnZXRJdGVtSWQocHJvY2Vzc2VkSXRlbSkgKyAnX2xpc3QnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcGFuZWxJZF09XCJwYW5lbElkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXRlbXNdPVwicHJvY2Vzc2VkSXRlbS5pdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2l0ZW1UZW1wbGF0ZV09XCJpdGVtVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0cmFuc2l0aW9uT3B0aW9uc109XCJ0cmFuc2l0aW9uT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZvY3VzZWRJdGVtSWRdPVwiZm9jdXNlZEl0ZW1JZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGl2ZUl0ZW1QYXRoXT1cImFjdGl2ZUl0ZW1QYXRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGV2ZWxdPVwibGV2ZWwgKyAxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcGFyZW50RXhwYW5kZWRdPVwiISFwYXJlbnRFeHBhbmRlZCAmJiBpc0l0ZW1FeHBhbmRlZChwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW1Ub2dnbGUpPVwib25JdGVtVG9nZ2xlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPjwvcC1wYW5lbE1lbnVTdWI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3VsPlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdzdWJtZW51JywgW1xuICAgICAgICAgICAgc3RhdGUoXG4gICAgICAgICAgICAgICAgJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgc3RhdGUoXG4gICAgICAgICAgICAgICAgJ3Zpc2libGUnLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnKidcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPD0+IGhpZGRlbicsIFthbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBhbmltYXRlKDApKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUGFuZWxNZW51U3ViIHtcbiAgICBASW5wdXQoKSBwYW5lbElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBmb2N1c2VkSXRlbUlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBpdGVtczogYW55W107XG5cbiAgICBASW5wdXQoKSBpdGVtVGVtcGxhdGU6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgbGV2ZWw6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBhY3RpdmVJdGVtUGF0aDogYW55W107XG5cbiAgICBASW5wdXQoKSByb290OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBwYXJlbnRFeHBhbmRlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIEBPdXRwdXQoKSBpdGVtVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQE91dHB1dCgpIG1lbnVGb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBPdXRwdXQoKSBtZW51Qmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBPdXRwdXQoKSBtZW51S2V5RG93bjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2xpc3QnKSBsaXN0Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IFBhbmVsTWVudSkpIHB1YmxpYyBwYW5lbE1lbnU6IFBhbmVsTWVudSwgcHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgZ2V0SXRlbUlkKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW0uaXRlbT8uaWQgPz8gYCR7dGhpcy5wYW5lbElkfV8ke3Byb2Nlc3NlZEl0ZW0ua2V5fWA7XG4gICAgfVxuXG4gICAgZ2V0SXRlbUtleShwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1JZChwcm9jZXNzZWRJdGVtKTtcbiAgICB9XG5cbiAgICBnZXRJdGVtQ2xhc3MocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtbWVudWl0ZW0nOiB0cnVlLFxuICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiB0aGlzLmlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgbmFtZT8sIHBhcmFtcz8pIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW0gJiYgcHJvY2Vzc2VkSXRlbS5pdGVtID8gT2JqZWN0VXRpbHMuZ2V0SXRlbVZhbHVlKHByb2Nlc3NlZEl0ZW0uaXRlbVtuYW1lXSwgcGFyYW1zKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnbGFiZWwnKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1FeHBhbmRlZChwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRJdGVtLmV4cGFuZGVkO1xuICAgIH1cblxuICAgIGlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzSXRlbUV4cGFuZGVkKHByb2Nlc3NlZEl0ZW0pIHx8IHRoaXMuYWN0aXZlSXRlbVBhdGguc29tZSgocGF0aCkgPT4gcGF0aCAmJiBwYXRoLmtleSA9PT0gcHJvY2Vzc2VkSXRlbS5rZXkpO1xuICAgIH1cblxuICAgIGlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAndmlzaWJsZScpICE9PSBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0l0ZW1EaXNhYmxlZChwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGlzSXRlbUZvY3VzZWQocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2VkSXRlbUlkID09PSB0aGlzLmdldEl0ZW1JZChwcm9jZXNzZWRJdGVtKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHByb2Nlc3NlZEl0ZW0uaXRlbXMpO1xuICAgIH1cblxuICAgIGdldEFuaW1hdGlvbihwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKSA/IHsgdmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7IHRyYW5zaXRpb25QYXJhbXM6IHRoaXMudHJhbnNpdGlvbk9wdGlvbnMsIGhlaWdodDogJyonIH0gfSA6IHsgdmFsdWU6ICdoaWRkZW4nLCBwYXJhbXM6IHsgdHJhbnNpdGlvblBhcmFtczogdGhpcy50cmFuc2l0aW9uT3B0aW9ucywgaGVpZ2h0OiAnMCcgfSB9O1xuICAgIH1cblxuICAgIGdldEFyaWFTZXRTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5maWx0ZXIoKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNJdGVtVmlzaWJsZShwcm9jZXNzZWRJdGVtKSAmJiAhdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc2VwYXJhdG9yJykpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXRBcmlhUG9zSW5zZXQoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4IC0gdGhpcy5pdGVtcy5zbGljZSgwLCBpbmRleCkuZmlsdGVyKChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkgJiYgdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc2VwYXJhdG9yJykpLmxlbmd0aCArIDE7XG4gICAgfVxuXG4gICAgb25JdGVtQ2xpY2soZXZlbnQsIHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pKSB7XG4gICAgICAgICAgICB0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdjb21tYW5kJywgeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgaXRlbTogcHJvY2Vzc2VkSXRlbS5pdGVtIH0pO1xuICAgICAgICAgICAgdGhpcy5pdGVtVG9nZ2xlLmVtaXQoeyBwcm9jZXNzZWRJdGVtLCBleHBhbmRlZDogIXRoaXMuaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JdGVtVG9nZ2xlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXRlbVRvZ2dsZS5lbWl0KGV2ZW50KTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wYW5lbE1lbnVMaXN0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8cC1wYW5lbE1lbnVTdWJcbiAgICAgICAgICAgICNzdWJtZW51XG4gICAgICAgICAgICBbcm9vdF09XCJ0cnVlXCJcbiAgICAgICAgICAgIFtpZF09XCJwYW5lbElkICsgJ19saXN0J1wiXG4gICAgICAgICAgICBbcGFuZWxJZF09XCJwYW5lbElkXCJcbiAgICAgICAgICAgIFt0YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICBbaXRlbVRlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiXG4gICAgICAgICAgICBbZm9jdXNlZEl0ZW1JZF09XCJmb2N1c2VkID8gZm9jdXNlZEl0ZW1JZCA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICBbYWN0aXZlSXRlbVBhdGhdPVwiYWN0aXZlSXRlbVBhdGgoKVwiXG4gICAgICAgICAgICBbdHJhbnNpdGlvbk9wdGlvbnNdPVwidHJhbnNpdGlvbk9wdGlvbnNcIlxuICAgICAgICAgICAgW2l0ZW1zXT1cInByb2Nlc3NlZEl0ZW1zKClcIlxuICAgICAgICAgICAgW3BhcmVudEV4cGFuZGVkXT1cInBhcmVudEV4cGFuZGVkXCJcbiAgICAgICAgICAgIChpdGVtVG9nZ2xlKT1cIm9uSXRlbVRvZ2dsZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgIChtZW51Rm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgIChtZW51Qmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXG4gICAgICAgID48L3AtcGFuZWxNZW51U3ViPlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9wYW5lbG1lbnUuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFBhbmVsTWVudUxpc3QgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIHBhbmVsSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBpdGVtczogYW55W107XG5cbiAgICBASW5wdXQoKSBpdGVtVGVtcGxhdGU6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgcGFyZW50RXhwYW5kZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBleHBhbmRlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSByb290OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGFjdGl2ZUl0ZW06IGFueTtcblxuICAgIEBPdXRwdXQoKSBpdGVtVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQE91dHB1dCgpIGhlYWRlckZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQFZpZXdDaGlsZCgnc3VibWVudScpIHN1Yk1lbnVWaWV3Q2hpbGQ6IFBhbmVsTWVudVN1YjtcblxuICAgIHNlYXJjaFRpbWVvdXQ6IGFueTtcblxuICAgIHNlYXJjaFZhbHVlOiBhbnk7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgZm9jdXNlZEl0ZW0gPSBzaWduYWw8YW55PihudWxsKTtcblxuICAgIGFjdGl2ZUl0ZW1QYXRoID0gc2lnbmFsPGFueVtdPihbXSk7XG5cbiAgICBwcm9jZXNzZWRJdGVtcyA9IHNpZ25hbDxhbnlbXT4oW10pO1xuXG4gICAgdmlzaWJsZUl0ZW1zID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtcyA9IHRoaXMucHJvY2Vzc2VkSXRlbXMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmxhdEl0ZW1zKHByb2Nlc3NlZEl0ZW1zKTtcbiAgICB9KTtcblxuICAgIGdldCBmb2N1c2VkSXRlbUlkKCkge1xuICAgICAgICBjb25zdCBmb2N1c2VkSXRlbSA9IHRoaXMuZm9jdXNlZEl0ZW0oKTtcbiAgICAgICAgcmV0dXJuIGZvY3VzZWRJdGVtICYmIGZvY3VzZWRJdGVtLml0ZW0/LmlkID8gZm9jdXNlZEl0ZW0uaXRlbS5pZCA6IE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5mb2N1c2VkSXRlbSgpKSA/IGAke3RoaXMucGFuZWxJZH1fJHt0aGlzLmZvY3VzZWRJdGVtKCkua2V5fWAgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcyAmJiBjaGFuZ2VzLml0ZW1zICYmIGNoYW5nZXMuaXRlbXMuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NlZEl0ZW1zLnNldCh0aGlzLmNyZWF0ZVByb2Nlc3NlZEl0ZW1zKGNoYW5nZXMuaXRlbXMuY3VycmVudFZhbHVlIHx8IFtdKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRJdGVtICYmIHByb2Nlc3NlZEl0ZW0uaXRlbSA/IE9iamVjdFV0aWxzLmdldEl0ZW1WYWx1ZShwcm9jZXNzZWRJdGVtLml0ZW1bbmFtZV0pIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdsYWJlbCcpO1xuICAgIH1cblxuICAgIGlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAndmlzaWJsZScpICE9PSBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0l0ZW1EaXNhYmxlZChwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUl0ZW1QYXRoKCkuc29tZSgocGF0aCkgPT4gcGF0aC5rZXkgPT09IHByb2Nlc3NlZEl0ZW0ucGFyZW50S2V5KTtcbiAgICB9XG5cbiAgICBpc0l0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHByb2Nlc3NlZEl0ZW0uaXRlbXMpO1xuICAgIH1cblxuICAgIGlzRWxlbWVudEluUGFuZWwoZXZlbnQsIGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgcGFuZWwgPSBldmVudC5jdXJyZW50VGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXBjLXNlY3Rpb249XCJwYW5lbFwiXScpO1xuXG4gICAgICAgIHJldHVybiBwYW5lbCAmJiBwYW5lbC5jb250YWlucyhlbGVtZW50KTtcbiAgICB9XG5cbiAgICBpc0l0ZW1NYXRjaGVkKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbSkgJiYgdGhpcy5nZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbSkudG9Mb2NhbGVMb3dlckNhc2UoKS5zdGFydHNXaXRoKHRoaXMuc2VhcmNoVmFsdWUudG9Mb2NhbGVMb3dlckNhc2UoKSk7XG4gICAgfVxuXG4gICAgaXNWaXNpYmxlSXRlbShwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiAhIXByb2Nlc3NlZEl0ZW0gJiYgKHByb2Nlc3NlZEl0ZW0ubGV2ZWwgPT09IDAgfHwgdGhpcy5pc0l0ZW1BY3RpdmUocHJvY2Vzc2VkSXRlbSkpICYmIHRoaXMuaXNJdGVtVmlzaWJsZShwcm9jZXNzZWRJdGVtKTtcbiAgICB9XG5cbiAgICBpc1ZhbGlkSXRlbShwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiAhIXByb2Nlc3NlZEl0ZW0gJiYgIXRoaXMuaXNJdGVtRGlzYWJsZWQocHJvY2Vzc2VkSXRlbSkgJiYgIXByb2Nlc3NlZEl0ZW0uc2VwYXJhdG9yO1xuICAgIH1cblxuICAgIGZpbmRGaXJzdEl0ZW0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVJdGVtcygpLmZpbmQoKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbSkpO1xuICAgIH1cblxuICAgIGZpbmRMYXN0SXRlbSgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmZpbmRMYXN0KHRoaXMudmlzaWJsZUl0ZW1zKCksIChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzVmFsaWRJdGVtKHByb2Nlc3NlZEl0ZW0pKTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9jZXNzZWRJdGVtcyhpdGVtcywgbGV2ZWwgPSAwLCBwYXJlbnQgPSB7fSwgcGFyZW50S2V5ID0gJycpIHtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VkSXRlbXMgPSBbXTtcbiAgICAgICAgaXRlbXMgJiZcbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gKHBhcmVudEtleSAhPT0gJycgPyBwYXJlbnRLZXkgKyAnXycgOiAnJykgKyBpbmRleDtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICBpY29uOiBpdGVtLmljb24sXG4gICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkOiBpdGVtLmV4cGFuZGVkLFxuICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3I6IGl0ZW0uc2VwYXJhdG9yLFxuICAgICAgICAgICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWwsXG4gICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRLZXlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgbmV3SXRlbVsnaXRlbXMnXSA9IHRoaXMuY3JlYXRlUHJvY2Vzc2VkSXRlbXMoaXRlbS5pdGVtcywgbGV2ZWwgKyAxLCBuZXdJdGVtLCBrZXkpO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZEl0ZW1zLnB1c2gobmV3SXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW1zO1xuICAgIH1cblxuICAgIGZpbmRQcm9jZXNzZWRJdGVtQnlJdGVtS2V5KGtleSwgcHJvY2Vzc2VkSXRlbXM/LCBsZXZlbCA9IDApIHtcbiAgICAgICAgcHJvY2Vzc2VkSXRlbXMgPSBwcm9jZXNzZWRJdGVtcyB8fCB0aGlzLnByb2Nlc3NlZEl0ZW1zKCk7XG4gICAgICAgIGlmIChwcm9jZXNzZWRJdGVtcyAmJiBwcm9jZXNzZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvY2Vzc2VkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gcHJvY2Vzc2VkSXRlbXNbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAna2V5JykgPT09IGtleSkgcmV0dXJuIHByb2Nlc3NlZEl0ZW07XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlZEl0ZW0gPSB0aGlzLmZpbmRQcm9jZXNzZWRJdGVtQnlJdGVtS2V5KGtleSwgcHJvY2Vzc2VkSXRlbS5pdGVtcywgbGV2ZWwgKyAxKTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlZEl0ZW0pIHJldHVybiBtYXRjaGVkSXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZsYXRJdGVtcyhwcm9jZXNzZWRJdGVtcywgcHJvY2Vzc2VkRmxhdHRlbkl0ZW1zID0gW10pIHtcbiAgICAgICAgcHJvY2Vzc2VkSXRlbXMgJiZcbiAgICAgICAgICAgIHByb2Nlc3NlZEl0ZW1zLmZvckVhY2goKHByb2Nlc3NlZEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Zpc2libGVJdGVtKHByb2Nlc3NlZEl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZEZsYXR0ZW5JdGVtcy5wdXNoKHByb2Nlc3NlZEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsYXRJdGVtcyhwcm9jZXNzZWRJdGVtLml0ZW1zLCBwcm9jZXNzZWRGbGF0dGVuSXRlbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRGbGF0dGVuSXRlbXM7XG4gICAgfVxuXG4gICAgY2hhbmdlRm9jdXNlZEl0ZW0oZXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyBvcmlnaW5hbEV2ZW50LCBwcm9jZXNzZWRJdGVtLCBmb2N1c09uTmV4dCwgc2VsZkNoZWNrLCBhbGxvd0hlYWRlckZvY3VzID0gdHJ1ZSB9ID0gZXZlbnQ7XG5cbiAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5mb2N1c2VkSXRlbSgpKSAmJiB0aGlzLmZvY3VzZWRJdGVtKCkua2V5ICE9PSBwcm9jZXNzZWRJdGVtLmtleSkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkSXRlbS5zZXQocHJvY2Vzc2VkSXRlbSk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEluVmlldygpO1xuICAgICAgICB9IGVsc2UgaWYgKGFsbG93SGVhZGVyRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyRm9jdXMuZW1pdCh7IG9yaWdpbmFsRXZlbnQsIGZvY3VzT25OZXh0LCBzZWxmQ2hlY2sgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY3JvbGxJblZpZXcoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5zdWJNZW51Vmlld0NoaWxkLmxpc3RWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgYGxpW2lkPVwiJHtgJHt0aGlzLmZvY3VzZWRJdGVtSWR9YH1cIl1gKTtcblxuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyAmJiBlbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JywgaW5saW5lOiAnbmVhcmVzdCcgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkZvY3VzKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IGZvY3VzZWRJdGVtID0gdGhpcy5mb2N1c2VkSXRlbSgpIHx8ICh0aGlzLmlzRWxlbWVudEluUGFuZWwoZXZlbnQsIGV2ZW50LnJlbGF0ZWRUYXJnZXQpID8gdGhpcy5maW5kRmlyc3RJdGVtKCkgOiB0aGlzLmZpbmRMYXN0SXRlbSgpKTtcbiAgICAgICAgaWYgKGV2ZW50LnJlbGF0ZWRUYXJnZXQgIT09IG51bGwpIHRoaXMuZm9jdXNlZEl0ZW0uc2V0KGZvY3VzZWRJdGVtKTtcbiAgICB9XG5cbiAgICBvbkJsdXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNlZEl0ZW0uc2V0KG51bGwpO1xuICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gJyc7XG4gICAgfVxuXG4gICAgb25JdGVtVG9nZ2xlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IHsgcHJvY2Vzc2VkSXRlbSwgZXhwYW5kZWQgfSA9IGV2ZW50O1xuICAgICAgICBwcm9jZXNzZWRJdGVtLmV4cGFuZGVkID0gIXByb2Nlc3NlZEl0ZW0uZXhwYW5kZWQ7XG5cbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbVBhdGggPSB0aGlzLmFjdGl2ZUl0ZW1QYXRoKCkuZmlsdGVyKChwKSA9PiBwLnBhcmVudEtleSAhPT0gcHJvY2Vzc2VkSXRlbS5wYXJlbnRLZXkpO1xuICAgICAgICBleHBhbmRlZCAmJiBhY3RpdmVJdGVtUGF0aC5wdXNoKHByb2Nlc3NlZEl0ZW0pO1xuXG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbVBhdGguc2V0KGFjdGl2ZUl0ZW1QYXRoKTtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VkSXRlbXMgPSB0aGlzLnByb2Nlc3NlZEl0ZW1zKCk7XG4gICAgICAgIGNvbnN0IG5ld1Byb2Nlc3NlZEl0ZW1zID0gcHJvY2Vzc2VkSXRlbXMubWFwKChpdGVtKSA9PiAoaXRlbSA9PT0gcHJvY2Vzc2VkSXRlbSA/IHByb2Nlc3NlZEl0ZW0gOiBpdGVtKSk7XG4gICAgICAgIHRoaXMucHJvY2Vzc2VkSXRlbXMuc2V0KG5ld1Byb2Nlc3NlZEl0ZW1zKTtcbiAgICAgICAgdGhpcy5mb2N1c2VkSXRlbS5zZXQocHJvY2Vzc2VkSXRlbSk7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG1ldGFLZXkgPSBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXk7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0Rvd25LZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dVcEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93TGVmdEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1JpZ2h0S2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhvbWVLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25FbmRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblNwYWNlS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMub25FbnRlcktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgICAgIGNhc2UgJ0JhY2tzcGFjZSc6XG4gICAgICAgICAgICBjYXNlICdTaGlmdExlZnQnOlxuICAgICAgICAgICAgY2FzZSAnU2hpZnRSaWdodCc6XG4gICAgICAgICAgICAgICAgLy9OT09QXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKCFtZXRhS2V5ICYmIE9iamVjdFV0aWxzLmlzUHJpbnRhYmxlQ2hhcmFjdGVyKGV2ZW50LmtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hJdGVtcyhldmVudCwgZXZlbnQua2V5KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dEb3duS2V5KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW0gPSBPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMuZm9jdXNlZEl0ZW0oKSkgPyB0aGlzLmZpbmROZXh0SXRlbSh0aGlzLmZvY3VzZWRJdGVtKCkpIDogdGhpcy5maW5kRmlyc3RJdGVtKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW0oeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgcHJvY2Vzc2VkSXRlbSwgZm9jdXNPbk5leHQ6IHRydWUgfSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIG9uQXJyb3dVcEtleShldmVudCkge1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmZvY3VzZWRJdGVtKCkpID8gdGhpcy5maW5kUHJldkl0ZW0odGhpcy5mb2N1c2VkSXRlbSgpKSA6IHRoaXMuZmluZExhc3RJdGVtKCk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkSXRlbSh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBwcm9jZXNzZWRJdGVtLCBzZWxmQ2hlY2s6IHRydWUgfSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25BcnJvd0xlZnRLZXkoZXZlbnQpIHtcbiAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5mb2N1c2VkSXRlbSgpKSkge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlZCA9IHRoaXMuYWN0aXZlSXRlbVBhdGgoKS5zb21lKChwKSA9PiBwLmtleSA9PT0gdGhpcy5mb2N1c2VkSXRlbSgpLmtleSk7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlSXRlbVBhdGggPSB0aGlzLmFjdGl2ZUl0ZW1QYXRoKCkuZmlsdGVyKChwKSA9PiBwLmtleSAhPT0gdGhpcy5mb2N1c2VkSXRlbSgpLmtleSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtUGF0aC5zZXQoYWN0aXZlSXRlbVBhdGgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb2N1c2VkSXRlbSA9IE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5mb2N1c2VkSXRlbSgpLnBhcmVudCkgPyB0aGlzLmZvY3VzZWRJdGVtKCkucGFyZW50IDogdGhpcy5mb2N1c2VkSXRlbSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZEl0ZW0uc2V0KGZvY3VzZWRJdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dSaWdodEtleShldmVudCkge1xuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmZvY3VzZWRJdGVtKCkpKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cGVkID0gdGhpcy5pc0l0ZW1Hcm91cCh0aGlzLmZvY3VzZWRJdGVtKCkpO1xuXG4gICAgICAgICAgICBpZiAoZ3JvdXBlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZWQgPSB0aGlzLmFjdGl2ZUl0ZW1QYXRoKCkuc29tZSgocCkgPT4gcC5rZXkgPT09IHRoaXMuZm9jdXNlZEl0ZW0oKS5rZXkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkFycm93RG93bktleShldmVudCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlSXRlbVBhdGggPSB0aGlzLmFjdGl2ZUl0ZW1QYXRoKCkuZmlsdGVyKChwKSA9PiBwLnBhcmVudEtleSAhPT0gdGhpcy5mb2N1c2VkSXRlbSgpLnBhcmVudEtleSk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW1QYXRoLnB1c2godGhpcy5mb2N1c2VkSXRlbSgpKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW1QYXRoLnNldChhY3RpdmVJdGVtUGF0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ib21lS2V5KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW0oeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgcHJvY2Vzc2VkSXRlbTogdGhpcy5maW5kRmlyc3RJdGVtKCksIGFsbG93SGVhZGVyRm9jdXM6IGZhbHNlIH0pO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRW5kS2V5KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW0oeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgcHJvY2Vzc2VkSXRlbTogdGhpcy5maW5kTGFzdEl0ZW0oKSwgZm9jdXNPbk5leHQ6IHRydWUsIGFsbG93SGVhZGVyRm9jdXM6IGZhbHNlIH0pO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRW50ZXJLZXkoZXZlbnQpIHtcbiAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5mb2N1c2VkSXRlbSgpKSkge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLnN1Yk1lbnVWaWV3Q2hpbGQubGlzdFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCBgbGlbaWQ9XCIke2Ake3RoaXMuZm9jdXNlZEl0ZW1JZH1gfVwiXWApO1xuICAgICAgICAgICAgY29uc3QgYW5jaG9yRWxlbWVudCA9IGVsZW1lbnQgJiYgKERvbUhhbmRsZXIuZmluZFNpbmdsZShlbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImFjdGlvblwiXScpIHx8IERvbUhhbmRsZXIuZmluZFNpbmdsZShlbGVtZW50LCAnYSxidXR0b24nKSk7XG5cbiAgICAgICAgICAgIGFuY2hvckVsZW1lbnQgPyBhbmNob3JFbGVtZW50LmNsaWNrKCkgOiBlbGVtZW50ICYmIGVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25TcGFjZUtleShldmVudCkge1xuICAgICAgICB0aGlzLm9uRW50ZXJLZXkoZXZlbnQpO1xuICAgIH1cblxuICAgIGZpbmROZXh0SXRlbShwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy52aXNpYmxlSXRlbXMoKS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0ua2V5ID09PSBwcm9jZXNzZWRJdGVtLmtleSk7XG5cbiAgICAgICAgY29uc3QgbWF0Y2hlZEl0ZW0gPVxuICAgICAgICAgICAgaW5kZXggPCB0aGlzLnZpc2libGVJdGVtcygpLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICA/IHRoaXMudmlzaWJsZUl0ZW1zKClcbiAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXggKyAxKVxuICAgICAgICAgICAgICAgICAgICAgIC5maW5kKChwSXRlbSkgPT4gdGhpcy5pc1ZhbGlkSXRlbShwSXRlbSkpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBtYXRjaGVkSXRlbSB8fCBwcm9jZXNzZWRJdGVtO1xuICAgIH1cblxuICAgIGZpbmRQcmV2SXRlbShwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy52aXNpYmxlSXRlbXMoKS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0ua2V5ID09PSBwcm9jZXNzZWRJdGVtLmtleSk7XG4gICAgICAgIGNvbnN0IG1hdGNoZWRJdGVtID0gaW5kZXggPiAwID8gT2JqZWN0VXRpbHMuZmluZExhc3QodGhpcy52aXNpYmxlSXRlbXMoKS5zbGljZSgwLCBpbmRleCksIChwSXRlbSkgPT4gdGhpcy5pc1ZhbGlkSXRlbShwSXRlbSkpIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIHJldHVybiBtYXRjaGVkSXRlbSB8fCBwcm9jZXNzZWRJdGVtO1xuICAgIH1cblxuICAgIHNlYXJjaEl0ZW1zKGV2ZW50LCBjaGFyKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAodGhpcy5zZWFyY2hWYWx1ZSB8fCAnJykgKyBjaGFyO1xuXG4gICAgICAgIGxldCBtYXRjaGVkSXRlbSA9IG51bGw7XG4gICAgICAgIGxldCBtYXRjaGVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5mb2N1c2VkSXRlbSgpKSkge1xuICAgICAgICAgICAgY29uc3QgZm9jdXNlZEl0ZW1JbmRleCA9IHRoaXMudmlzaWJsZUl0ZW1zKCkuZmluZEluZGV4KChwcm9jZXNzZWRJdGVtKSA9PiBwcm9jZXNzZWRJdGVtLmtleSA9PT0gdGhpcy5mb2N1c2VkSXRlbSgpLmtleSk7XG5cbiAgICAgICAgICAgIG1hdGNoZWRJdGVtID0gdGhpcy52aXNpYmxlSXRlbXMoKVxuICAgICAgICAgICAgICAgIC5zbGljZShmb2N1c2VkSXRlbUluZGV4KVxuICAgICAgICAgICAgICAgIC5maW5kKChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbU1hdGNoZWQocHJvY2Vzc2VkSXRlbSkpO1xuICAgICAgICAgICAgbWF0Y2hlZEl0ZW0gPSBPYmplY3RVdGlscy5pc0VtcHR5KG1hdGNoZWRJdGVtKVxuICAgICAgICAgICAgICAgID8gdGhpcy52aXNpYmxlSXRlbXMoKVxuICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCBmb2N1c2VkSXRlbUluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgIC5maW5kKChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbU1hdGNoZWQocHJvY2Vzc2VkSXRlbSkpXG4gICAgICAgICAgICAgICAgOiBtYXRjaGVkSXRlbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hdGNoZWRJdGVtID0gdGhpcy52aXNpYmxlSXRlbXMoKS5maW5kKChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbU1hdGNoZWQocHJvY2Vzc2VkSXRlbSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkobWF0Y2hlZEl0ZW0pKSB7XG4gICAgICAgICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3RVdGlscy5pc0VtcHR5KG1hdGNoZWRJdGVtKSAmJiBPYmplY3RVdGlscy5pc0VtcHR5KHRoaXMuZm9jdXNlZEl0ZW0oKSkpIHtcbiAgICAgICAgICAgIG1hdGNoZWRJdGVtID0gdGhpcy5maW5kRmlyc3RJdGVtKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNOb3RFbXB0eShtYXRjaGVkSXRlbSkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW0oe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHByb2Nlc3NlZEl0ZW06IG1hdGNoZWRJdGVtLFxuICAgICAgICAgICAgICAgIGFsbG93SGVhZGVyRm9jdXM6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNlYXJjaFRpbWVvdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gJyc7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9LCA1MDApO1xuXG4gICAgICAgIHJldHVybiBtYXRjaGVkO1xuICAgIH1cbn1cblxuLyoqXG4gKiBQYW5lbE1lbnUgaXMgYSBoeWJyaWQgb2YgQWNjb3JkaW9uIGFuZCBUcmVlIGNvbXBvbmVudHMuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtcGFuZWxNZW51JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbbmdDbGFzc109XCIncC1wYW5lbG1lbnUgcC1jb21wb25lbnQnXCIgI2NvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbW9kZWw7IGxldCBmID0gZmlyc3Q7IGxldCBsID0gbGFzdDsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc0l0ZW1WaXNpYmxlKGl0ZW0pXCIgY2xhc3M9XCJwLXBhbmVsbWVudS1wYW5lbFwiIFtuZ0NsYXNzXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdoZWFkZXJDbGFzcycpXCIgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3N0eWxlJylcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3BhbmVsJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWNvbXBvbmVudCBwLXBhbmVsbWVudS1oZWFkZXInOiB0cnVlLCAncC1oaWdobGlnaHQnOiBpc0l0ZW1BY3RpdmUoaXRlbSksICdwLWRpc2FibGVkJzogaXNJdGVtRGlzYWJsZWQoaXRlbSkgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3N0eWxlQ2xhc3MnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJnZXRJdGVtUHJvcChpdGVtLCAnc3R5bGUnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcFRvb2x0aXBdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3Rvb2x0aXAnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJnZXRIZWFkZXJJZChpdGVtLCBpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGFiaW5kZXhdPVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwT3B0aW9uc109XCJnZXRJdGVtUHJvcChpdGVtLCAndG9vbHRpcE9wdGlvbnMnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImlzSXRlbUFjdGl2ZShpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdsYWJlbCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiZ2V0Q29udGVudElkKGl0ZW0sIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwiaXNJdGVtRGlzYWJsZWQoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWhpZ2hsaWdodF09XCJpc0l0ZW1BY3RpdmUoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWRpc2FibGVkXT1cImlzSXRlbURpc2FibGVkKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaGVhZGVyJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25IZWFkZXJDbGljaygkZXZlbnQsIGl0ZW0sIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uSGVhZGVyS2V5RG93bigkZXZlbnQsIGl0ZW0sIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGFuZWxtZW51LWhlYWRlci1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhZ2V0SXRlbVByb3AoaXRlbSwgJ3JvdXRlckxpbmsnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmhyZWZdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3VybCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFyZ2V0XT1cImdldEl0ZW1Qcm9wKGl0ZW0sICd0YXJnZXQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICd0aXRsZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXBhbmVsbWVudS1oZWFkZXItYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidoZWFkZXJhY3Rpb24nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0l0ZW1Hcm91cChpdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFzdWJtZW51SWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiBbc3R5bGVDbGFzc109XCIncC1zdWJtZW51LWljb24nXCIgKm5nSWY9XCJpc0l0ZW1BY3RpdmUoaXRlbSlcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uUmlnaHRJY29uIFtzdHlsZUNsYXNzXT1cIidwLXN1Ym1lbnUtaWNvbidcIiAqbmdJZj1cIiFpc0l0ZW1BY3RpdmUoaXRlbSlcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzdWJtZW51SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIiBbbmdTdHlsZV09XCJnZXRJdGVtUHJvcChpdGVtLCAnaWNvblN0eWxlJylcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgKm5nSWY9XCJnZXRJdGVtUHJvcChpdGVtLCAnZXNjYXBlJykgIT09IGZhbHNlOyBlbHNlIGh0bWxMYWJlbFwiPnt7IGdldEl0ZW1Qcm9wKGl0ZW0sICdsYWJlbCcpIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxMYWJlbD48c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiIFtpbm5lckhUTUxdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2xhYmVsJylcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWJhZGdlXCIgKm5nSWY9XCJnZXRJdGVtUHJvcChpdGVtLCAnYmFkZ2UnKVwiIFtuZ0NsYXNzXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdiYWRnZVN0eWxlQ2xhc3MnKVwiPnt7IGdldEl0ZW1Qcm9wKGl0ZW0sICdiYWRnZScpIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImdldEl0ZW1Qcm9wKGl0ZW0sICdyb3V0ZXJMaW5rJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua109XCJnZXRJdGVtUHJvcChpdGVtLCAncm91dGVyTGluaycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdxdWVyeVBhcmFtcycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3AtbWVudWl0ZW0tbGluay1hY3RpdmUnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdyb3V0ZXJMaW5rQWN0aXZlT3B0aW9ucycpIHx8IHsgZXhhY3Q6IGZhbHNlIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFyZ2V0XT1cImdldEl0ZW1Qcm9wKGl0ZW0sICd0YXJnZXQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1wYW5lbG1lbnUtaGVhZGVyLWFjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIi0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdmcmFnbWVudCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3F1ZXJ5UGFyYW1zSGFuZGxpbmcnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcmVzZXJ2ZUZyYWdtZW50XT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdwcmVzZXJ2ZUZyYWdtZW50JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdza2lwTG9jYXRpb25DaGFuZ2UnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZXBsYWNlVXJsXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdyZXBsYWNlVXJsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3RhdGVdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3N0YXRlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2hlYWRlcmFjdGlvbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzSXRlbUdyb3VwKGl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXN1Ym1lbnVJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkRvd25JY29uIFtzdHlsZUNsYXNzXT1cIidwLXN1Ym1lbnUtaWNvbidcIiAqbmdJZj1cImlzSXRlbUFjdGl2ZShpdGVtKVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25SaWdodEljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiICpuZ0lmPVwiIWlzSXRlbUFjdGl2ZShpdGVtKVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInN1Ym1lbnVJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIiAqbmdJZj1cIml0ZW0uaWNvblwiIFtuZ1N0eWxlXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdpY29uU3R5bGUnKVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cImdldEl0ZW1Qcm9wKGl0ZW0sICdlc2NhcGUnKSAhPT0gZmFsc2U7IGVsc2UgaHRtbFJvdXRlTGFiZWxcIj57eyBnZXRJdGVtUHJvcChpdGVtLCAnbGFiZWwnKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sUm91dGVMYWJlbD48c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiIFtpbm5lckhUTUxdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2xhYmVsJylcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWJhZGdlXCIgKm5nSWY9XCJnZXRJdGVtUHJvcChpdGVtLCAnYmFkZ2UnKVwiIFtuZ0NsYXNzXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdiYWRnZVN0eWxlQ2xhc3MnKVwiPnt7IGdldEl0ZW1Qcm9wKGl0ZW0sICdiYWRnZScpIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpc0l0ZW1Hcm91cChpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtdG9nZ2xlYWJsZS1jb250ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtcGFuZWxtZW51LWV4cGFuZGVkJzogaXNJdGVtQWN0aXZlKGl0ZW0pIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgW0Byb290SXRlbV09XCJnZXRBbmltYXRpb24oaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKEByb290SXRlbS5kb25lKT1cIm9uVG9nZ2xlRG9uZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJyZWdpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiZ2V0Q29udGVudElkKGl0ZW0sIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJnZXRIZWFkZXJJZChpdGVtLCBpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RvZ2dsZWFibGVjb250ZW50J1wiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBhbmVsbWVudS1jb250ZW50XCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtZW51Y29udGVudCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cC1wYW5lbE1lbnVMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwYW5lbElkXT1cImdldFBhbmVsSWQoaSwgaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXRlbXNdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2l0ZW1zJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXRlbVRlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0cmFuc2l0aW9uT3B0aW9uc109XCJ0cmFuc2l0aW9uT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb290XT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYWN0aXZlSXRlbV09XCJhY3RpdmVJdGVtKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcGFyZW50RXhwYW5kZWRdPVwiaXNJdGVtQWN0aXZlKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGhlYWRlckZvY3VzKT1cInVwZGF0ZUZvY3VzZWRIZWFkZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvcC1wYW5lbE1lbnVMaXN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdyb290SXRlbScsIFtcbiAgICAgICAgICAgIHN0YXRlKFxuICAgICAgICAgICAgICAgICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHN0YXRlKFxuICAgICAgICAgICAgICAgICd2aXNpYmxlJyxcbiAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogJyonXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlIDw9PiBoaWRkZW4nLCBbYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKV0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgYW5pbWF0ZSgwKSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGFuZWxtZW51LmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBQYW5lbE1lbnUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBtZW51aXRlbXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW10gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciBtdWx0aXBsZSB0YWJzIGNhbiBiZSBhY3RpdmF0ZWQgYXQgdGhlIHNhbWUgdGltZSBvciBub3QuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9uIG9wdGlvbnMgb2YgdGhlIGFuaW1hdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0cmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzQwMG1zIGN1YmljLWJlemllcigwLjg2LCAwLCAwLjA3LCAxKSc7XG4gICAgLyoqXG4gICAgICogQ3VycmVudCBpZCBzdGF0ZSBhcyBhIHN0cmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIHRoZSBlbGVtZW50IGluIHRhYmJpbmcgb3JkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCA9IDA7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+IHwgdW5kZWZpbmVkO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgc3VibWVudUljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBhbmltYXRpbmc6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBhY3RpdmVJdGVtID0gc2lnbmFsPGFueT4obnVsbCk7XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQgfHwgVW5pcXVlQ29tcG9uZW50SWQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzPy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3VibWVudWljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Ym1lbnVJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIC8qKlxuICAgICAqIENvbGxhcHNlcyBvcGVuIHBhbmVscy5cbiAgICAgKiBAZ3JvdXAgTWV0aG9kXG4gICAgICovXG4gICAgY29sbGFwc2VBbGwoKSB7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5tb2RlbCEpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgb25Ub2dnbGVEb25lKCkge1xuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNoYW5nZUFjdGl2ZUl0ZW0oZXZlbnQsIGl0ZW0sIGluZGV4PzogbnVtYmVyLCBzZWxmQWN0aXZlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSXRlbURpc2FibGVkKGl0ZW0pKSB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVJdGVtID0gc2VsZkFjdGl2ZSA/IGl0ZW0gOiB0aGlzLmFjdGl2ZUl0ZW0gJiYgT2JqZWN0VXRpbHMuZXF1YWxzKGl0ZW0sIHRoaXMuYWN0aXZlSXRlbSkgPyBudWxsIDogaXRlbTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbS5zZXQoYWN0aXZlSXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBbmltYXRpb24oaXRlbTogTWVudUl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uZXhwYW5kZWQgPyB7IHZhbHVlOiAndmlzaWJsZScsIHBhcmFtczogeyB0cmFuc2l0aW9uUGFyYW1zOiB0aGlzLmFuaW1hdGluZyA/IHRoaXMudHJhbnNpdGlvbk9wdGlvbnMgOiAnMG1zJywgaGVpZ2h0OiAnKicgfSB9IDogeyB2YWx1ZTogJ2hpZGRlbicsIHBhcmFtczogeyB0cmFuc2l0aW9uUGFyYW1zOiB0aGlzLnRyYW5zaXRpb25PcHRpb25zLCBoZWlnaHQ6ICcwJyB9IH07XG4gICAgfVxuXG4gICAgZ2V0SXRlbVByb3AoaXRlbSwgbmFtZSkge1xuICAgICAgICByZXR1cm4gaXRlbSA/IE9iamVjdFV0aWxzLmdldEl0ZW1WYWx1ZShpdGVtW25hbWVdKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXRJdGVtTGFiZWwoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChpdGVtLCAnbGFiZWwnKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1BY3RpdmUoaXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbS5leHBhbmRlZDtcbiAgICB9XG5cbiAgICBpc0l0ZW1WaXNpYmxlKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AoaXRlbSwgJ3Zpc2libGUnKSAhPT0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNJdGVtRGlzYWJsZWQoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChpdGVtLCAnZGlzYWJsZWQnKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1Hcm91cChpdGVtKSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5pc05vdEVtcHR5KGl0ZW0uaXRlbXMpO1xuICAgIH1cblxuICAgIGdldFBhbmVsSWQoaW5kZXgsIGl0ZW0/KSB7XG4gICAgICAgIHJldHVybiBpdGVtICYmIGl0ZW0uaWQgPyBpdGVtLmlkIDogYCR7dGhpcy5pZH1fJHtpbmRleH1gO1xuICAgIH1cblxuICAgIGdldEhlYWRlcklkKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBpdGVtLmlkID8gaXRlbS5pZCArICdfaGVhZGVyJyA6IGAke3RoaXMuZ2V0UGFuZWxJZChpbmRleCl9X2hlYWRlcmA7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudElkKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBpdGVtLmlkID8gaXRlbS5pZCArICdfY29udGVudCcgOiBgJHt0aGlzLmdldFBhbmVsSWQoaW5kZXgpfV9jb250ZW50YDtcbiAgICB9XG5cbiAgICB1cGRhdGVGb2N1c2VkSGVhZGVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHsgb3JpZ2luYWxFdmVudCwgZm9jdXNPbk5leHQsIHNlbGZDaGVjayB9ID0gZXZlbnQ7XG4gICAgICAgIGNvbnN0IHBhbmVsRWxlbWVudCA9IG9yaWdpbmFsRXZlbnQuY3VycmVudFRhcmdldC5jbG9zZXN0KCdbZGF0YS1wYy1zZWN0aW9uPVwicGFuZWxcIl0nKTtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gc2VsZkNoZWNrID8gRG9tSGFuZGxlci5maW5kU2luZ2xlKHBhbmVsRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJoZWFkZXJcIl0nKSA6IGZvY3VzT25OZXh0ID8gdGhpcy5maW5kTmV4dEhlYWRlcihwYW5lbEVsZW1lbnQpIDogdGhpcy5maW5kUHJldkhlYWRlcihwYW5lbEVsZW1lbnQpO1xuXG4gICAgICAgIGhlYWRlciA/IHRoaXMuY2hhbmdlRm9jdXNlZEhlYWRlcihvcmlnaW5hbEV2ZW50LCBoZWFkZXIpIDogZm9jdXNPbk5leHQgPyB0aGlzLm9uSGVhZGVySG9tZUtleShvcmlnaW5hbEV2ZW50KSA6IHRoaXMub25IZWFkZXJFbmRLZXkob3JpZ2luYWxFdmVudCk7XG4gICAgfVxuXG4gICAgY2hhbmdlRm9jdXNlZEhlYWRlcihldmVudCwgZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50ICYmIERvbUhhbmRsZXIuZm9jdXMoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgZmluZE5leHRIZWFkZXIocGFuZWxFbGVtZW50LCBzZWxmQ2hlY2sgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBuZXh0UGFuZWxFbGVtZW50ID0gc2VsZkNoZWNrID8gcGFuZWxFbGVtZW50IDogcGFuZWxFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShuZXh0UGFuZWxFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImhlYWRlclwiXScpO1xuXG4gICAgICAgIHJldHVybiBoZWFkZXJFbGVtZW50ID8gKERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGhlYWRlckVsZW1lbnQsICdkYXRhLXAtZGlzYWJsZWQnKSA/IHRoaXMuZmluZE5leHRIZWFkZXIoaGVhZGVyRWxlbWVudC5wYXJlbnRFbGVtZW50KSA6IGhlYWRlckVsZW1lbnQpIDogbnVsbDtcbiAgICB9XG5cbiAgICBmaW5kUHJldkhlYWRlcihwYW5lbEVsZW1lbnQsIHNlbGZDaGVjayA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHByZXZQYW5lbEVsZW1lbnQgPSBzZWxmQ2hlY2sgPyBwYW5lbEVsZW1lbnQgOiBwYW5lbEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShwcmV2UGFuZWxFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImhlYWRlclwiXScpO1xuXG4gICAgICAgIHJldHVybiBoZWFkZXJFbGVtZW50ID8gKERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGhlYWRlckVsZW1lbnQsICdkYXRhLXAtZGlzYWJsZWQnKSA/IHRoaXMuZmluZFByZXZIZWFkZXIoaGVhZGVyRWxlbWVudC5wYXJlbnRFbGVtZW50KSA6IGhlYWRlckVsZW1lbnQpIDogbnVsbDtcbiAgICB9XG5cbiAgICBmaW5kRmlyc3RIZWFkZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmROZXh0SGVhZGVyKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQsIHRydWUpO1xuICAgIH1cblxuICAgIGZpbmRMYXN0SGVhZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kUHJldkhlYWRlcih0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQsIHRydWUpO1xuICAgIH1cblxuICAgIG9uSGVhZGVyQ2xpY2soZXZlbnQsIGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmlzSXRlbURpc2FibGVkKGl0ZW0pKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgaXRlbSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgbW9kZWxJdGVtIG9mIHRoaXMubW9kZWwhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09IG1vZGVsSXRlbSAmJiBtb2RlbEl0ZW0uZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxJdGVtLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaXRlbS5leHBhbmRlZCA9ICFpdGVtLmV4cGFuZGVkO1xuICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZUl0ZW0oZXZlbnQsIGl0ZW0sIGluZGV4KTtcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICBEb21IYW5kbGVyLmZvY3VzKGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuICAgIH1cblxuICAgIG9uSGVhZGVyS2V5RG93bihldmVudCwgaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25IZWFkZXJBcnJvd0Rvd25LZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGVhZGVyQXJyb3dVcEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25IZWFkZXJIb21lS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGVhZGVyRW5kS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgICAgIHRoaXMub25IZWFkZXJFbnRlcktleShldmVudCwgaXRlbSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25IZWFkZXJBcnJvd0Rvd25LZXkoZXZlbnQpIHtcbiAgICAgICAgY29uc3Qgcm9vdExpc3QgPSBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShldmVudC5jdXJyZW50VGFyZ2V0LCAnZGF0YS1wLWhpZ2hsaWdodCcpID09PSB0cnVlID8gRG9tSGFuZGxlci5maW5kU2luZ2xlKGV2ZW50LmN1cnJlbnRUYXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLCAnW2RhdGEtcGMtc2VjdGlvbj1cIm1lbnVcIl0nKSA6IG51bGw7XG5cbiAgICAgICAgcm9vdExpc3QgPyBEb21IYW5kbGVyLmZvY3VzKHJvb3RMaXN0KSA6IHRoaXMudXBkYXRlRm9jdXNlZEhlYWRlcih7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBmb2N1c09uTmV4dDogdHJ1ZSB9KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkhlYWRlckFycm93VXBLZXkoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcHJldkhlYWRlciA9IHRoaXMuZmluZFByZXZIZWFkZXIoZXZlbnQuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50KSB8fCB0aGlzLmZpbmRMYXN0SGVhZGVyKCk7XG4gICAgICAgIGNvbnN0IHJvb3RMaXN0ID0gRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUocHJldkhlYWRlciwgJ2RhdGEtcC1oaWdobGlnaHQnKSA9PT0gdHJ1ZSA/IERvbUhhbmRsZXIuZmluZFNpbmdsZShwcmV2SGVhZGVyLm5leHRFbGVtZW50U2libGluZywgJ1tkYXRhLXBjLXNlY3Rpb249XCJtZW51XCJdJykgOiBudWxsO1xuXG4gICAgICAgIHJvb3RMaXN0ID8gRG9tSGFuZGxlci5mb2N1cyhyb290TGlzdCkgOiB0aGlzLnVwZGF0ZUZvY3VzZWRIZWFkZXIoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgZm9jdXNPbk5leHQ6IGZhbHNlIH0pO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uSGVhZGVySG9tZUtleShldmVudCkge1xuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRIZWFkZXIoZXZlbnQsIHRoaXMuZmluZEZpcnN0SGVhZGVyKCkpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uSGVhZGVyRW5kS2V5KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEhlYWRlcihldmVudCwgdGhpcy5maW5kTGFzdEhlYWRlcigpKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkhlYWRlckVudGVyS2V5KGV2ZW50LCBpdGVtLCBpbmRleCkge1xuICAgICAgICBjb25zdCBoZWFkZXJBY3Rpb24gPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoZXZlbnQuY3VycmVudFRhcmdldCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJoZWFkZXJhY3Rpb25cIl0nKTtcblxuICAgICAgICBoZWFkZXJBY3Rpb24gPyBoZWFkZXJBY3Rpb24uY2xpY2soKSA6IHRoaXMub25IZWFkZXJDbGljayhldmVudCwgaXRlbSwgaW5kZXgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn1cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBUb29sdGlwTW9kdWxlLCBTaGFyZWRNb2R1bGUsIEFuZ2xlRG93bkljb24sIEFuZ2xlUmlnaHRJY29uLCBDaGV2cm9uRG93bkljb24sIENoZXZyb25SaWdodEljb25dLFxuICAgIGV4cG9ydHM6IFtQYW5lbE1lbnUsIFJvdXRlck1vZHVsZSwgVG9vbHRpcE1vZHVsZSwgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtQYW5lbE1lbnUsIFBhbmVsTWVudVN1YiwgUGFuZWxNZW51TGlzdF1cbn0pXG5leHBvcnQgY2xhc3MgUGFuZWxNZW51TW9kdWxlIHt9XG4iXX0=