import { Slick, Editors, Formatters, Data, Grid, FrozenGrid } from 'slickgrid-es6';
import { SlickPager } from './slick-pager';
import { SlickWindowResizer } from './slick-window-resizer';
import { SlickService } from './slick-service';
import * as Plugins from './plugins/index';

export function configure(aurelia) {
  aurelia.globalResources('./slick-pager');
}

export { Slick, Editors, Formatters, Data, Grid, FrozenGrid, Plugins, SlickPager, SlickWindowResizer, SlickService };