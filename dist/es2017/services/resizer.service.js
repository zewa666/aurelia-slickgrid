var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import * as $ from 'jquery';
// global constants, height/width are in pixels
const DATAGRID_MIN_HEIGHT = 180;
const DATAGRID_MIN_WIDTH = 300;
const DATAGRID_BOTTOM_PADDING = 20;
const DATAGRID_PAGINATION_HEIGHT = 35;
let timer;
let ResizerService = class ResizerService {
    constructor(ea) {
        this.ea = ea;
    }
    /** Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     */
    attachAutoResizeDataGrid(grid, gridOptions) {
        // if we can't find the grid to resize, return without attaching anything
        const gridDomElm = $(`#${gridOptions.gridId}`);
        if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
            return null;
        }
        // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
        this.resizeGrid(grid, gridOptions);
        // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
        // -- attach auto-resize to Window object only if it exist
        $(window).on('resize.grid', () => {
            // for some yet unknown reason, calling the resize twice removes any stuttering/flickering when changing the height and makes it much smoother
            this.resizeGrid(grid, gridOptions);
            this.resizeGrid(grid, gridOptions);
        });
        // destroy the resizer on route change
        this.ea.subscribe('router:navigation:processing', () => {
            this.destroy();
        });
    }
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     */
    calculateGridNewDimensions(gridOptions) {
        const gridDomElm = $(`#${gridOptions.gridId}`);
        const containerElm = (gridOptions.autoResize && gridOptions.autoResize.containerId) ? $(`#${gridOptions.autoResize.containerId}`) : $(`#${gridOptions.gridContainerId}`);
        const windowElm = $(window);
        if (windowElm === undefined || containerElm === undefined || gridDomElm === undefined) {
            return null;
        }
        // calculate bottom padding
        // if using pagination, we need to add the pagination height to this bottom padding
        let bottomPadding = (gridOptions.autoResize && gridOptions.autoResize.bottomPadding) ? gridOptions.autoResize.bottomPadding : DATAGRID_BOTTOM_PADDING;
        if (bottomPadding && gridOptions.enablePagination) {
            bottomPadding += DATAGRID_PAGINATION_HEIGHT;
        }
        const gridHeight = windowElm.height() || 0;
        const coordOffsetTop = gridDomElm.offset();
        const gridOffsetTop = (coordOffsetTop !== undefined) ? coordOffsetTop.top : 0;
        const availableHeight = gridHeight - gridOffsetTop - bottomPadding;
        const availableWidth = containerElm.width() || 0;
        const minHeight = (gridOptions.autoResize && gridOptions.autoResize.minHeight < 0) ? gridOptions.autoResize.minHeight : DATAGRID_MIN_HEIGHT;
        const minWidth = (gridOptions.autoResize && gridOptions.autoResize.minWidth < 0) ? gridOptions.autoResize.minWidth : DATAGRID_MIN_WIDTH;
        let newHeight = availableHeight;
        let newWidth = (gridOptions.autoResize && gridOptions.autoResize.sidePadding) ? availableWidth - gridOptions.autoResize.sidePadding : availableWidth;
        if (newHeight < minHeight) {
            newHeight = minHeight;
        }
        if (newWidth < minWidth) {
            newWidth = minWidth;
        }
        return {
            height: newHeight,
            width: newWidth
        };
    }
    /**
     * Destroy function when element is destroyed
     */
    destroy() {
        $(window).trigger('resize.grid').off('resize');
    }
    /** Resize the datagrid to fit the browser height & width */
    resizeGrid(grid, gridOptions, delay, newSizes) {
        delay = delay || 0;
        clearTimeout(timer);
        timer = setTimeout(() => {
            // calculate new available sizes but with minimum height of 220px
            newSizes = newSizes || this.calculateGridNewDimensions(gridOptions);
            if (newSizes) {
                // apply these new height/width to the datagrid
                $(`#${gridOptions.gridId}`).height(newSizes.height);
                $(`#${gridOptions.gridId}`).width(newSizes.width);
                $(`#${gridOptions.gridContainerId}`).height(newSizes.height);
                $(`#${gridOptions.gridContainerId}`).width(newSizes.width);
                // resize the slickgrid canvas on all browser except some IE versions
                // exclude all IE below IE11
                // IE11 wants to be a better standard (W3C) follower (finally) they even changed their appName output to also have 'Netscape'
                if (new RegExp('MSIE [6-8]').exec(navigator.userAgent) === null && grid) {
                    grid.resizeCanvas();
                }
                // also call the grid auto-size columns so that it takes available when going bigger
                grid.autosizeColumns();
            }
        }, delay);
    }
};
ResizerService = __decorate([
    inject(EventAggregator)
], ResizerService);
export { ResizerService };
//# sourceMappingURL=resizer.service.js.map