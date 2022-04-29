import {
	CustomLoadingOverlay,
	CustomNoRowsOverlay,
} from '../components/GridEditor';
import AG_GRID_LOCALE_ZH from '../locale/locale.zh';
import AG_GRID_LOCALE_EN from '../locale/locale.en';
import { getLanguage } from './util';

export const iconfontUrl = '//at.alicdn.com/t/font_2533674_w6d4bl61wu.js';

/** ag-grid列表列默认设置 */
export const defaultColDef = {
	editable: false,
	resizable: true,
	sortable: true,
	filter: true,
	width: 80,
};

/** ag-grid右侧工具栏 */
export const sideBar = {
	toolPanels: [
		{
			id: 'columns',
			labelDefault: 'Columns',
			labelKey: 'columns',
			iconKey: 'columns',
			toolPanel: 'agColumnsToolPanel',
		},
		{
			id: 'filters',
			labelDefault: 'Filters',
			labelKey: 'filters',
			iconKey: 'filter',
			toolPanel: 'agFiltersToolPanel',
		},
	],
	position: 'right',
	defaultToolPanel: '',
};

export const agGridDefaultProps = {
	localeText: getLanguage() === 'en' ? AG_GRID_LOCALE_EN : AG_GRID_LOCALE_ZH,
	defaultColDef,
	sideBar,
	components: {
		customLoadingOverlay: CustomLoadingOverlay,
		customNoRowsOverlay: CustomNoRowsOverlay,
	},
	loadingOverlayComponent: 'customLoadingOverlay',
	noRowsOverlayComponent: 'customNoRowsOverlay',
	enableRangeSelection: true,
	popupParent: document.querySelector('body'),
	suppressDragLeaveHidesColumns: true, // 禁止拖动移出表格隐藏列
	rowHeight: 38,
	headerHeight: 38,
	columnTypes: {
		// 行号列
		numberColumn: {
			width: 60,
			pinned: 'left',
			cellClass: 'zl-row-number-cell',
			sort: false,
			sortable: false,
			suppressFiltersToolPanel: true,
			suppressColumnsToolPanel: true,
			suppressMenu: true,
			suppressMovable: true,
			resizable: false,
			lockPinned: true,
			lockPosition: true,
		},
	},
};

/** Modal 默认属性配置 */
export const modalDefaultProps = {
	className: 'zl-modal',
	centered: true,
	keyboard: false,
	maskClosable: false,
	bodyStyle: { maxHeight: '80vh', overflow: 'auto' },
	width: 600,
};
