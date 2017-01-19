'use strict';

System.register(['slickgrid-es6', 'aurelia-framework', './slick-window-resizer'], function (_export, _context) {
  "use strict";

  var FrozenGrid, Grid, inject, SlickWindowResizer, _createClass, _dec, _class, SlickService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_slickgridEs) {
      FrozenGrid = _slickgridEs.FrozenGrid;
      Grid = _slickgridEs.Grid;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_slickWindowResizer) {
      SlickWindowResizer = _slickWindowResizer.SlickWindowResizer;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('SlickService', SlickService = (_dec = inject(SlickWindowResizer), _dec(_class = function () {
        function SlickService(slickWindowResizer) {
          _classCallCheck(this, SlickService);

          this.columnDefinition = {};
          this.data = {};
          this.grid = {};
          this.gridId = 'myGrid';
          this.gridOptions = {};
          this.isCreated = false;
          this.paginationCallback = null;

          this.slickResizer = slickWindowResizer;
        }

        SlickService.prototype.createGrid = function createGrid(gridId, columnDefinition, gridOptions, data) {
          this.columnDefinition = columnDefinition || {};
          this.data = data || {};
          this.gridId = gridId || 'myGrid';
          this.gridOptions = gridOptions || {};
          this.gridOptions.gridId = this.gridId;

          if (!!gridOptions.gridType && gridOptions.gridType.toLowerCase() === 'frozengrid') {
            this.grid = new FrozenGrid('#' + this.gridId, this.data, this.columnDefinition, this.gridOptions);
          } else {
            this.grid = new Grid('#' + this.gridId, this.data, this.columnDefinition, this.gridOptions);
          }

          this.isCreated = true;
          if (typeof this.gridOptions.onSortingChanged === 'function') {
            this.grid.onSort.subscribe(this.gridOptions.onSortingChanged);
          }

          if (!!this.gridOptions.autoResize) {
            this.slickResizer.attachAutoResizeDataGrid(this.grid, this.gridOptions);
          }

          return this.grid;
        };

        SlickService.prototype.refreshDataset = function refreshDataset(dataset) {
          if (dataset) {
            this.grid.setData(dataset);
            this.grid.invalidate();
            this.grid.render();
          }
        };

        _createClass(SlickService, [{
          key: 'gridObject',
          get: function get() {
            return this.grid;
          }
        }]);

        return SlickService;
      }()) || _class));

      _export('SlickService', SlickService);
    }
  };
});