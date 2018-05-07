
class LocalStorageAlternative {

  constructor () {
    this.structureLocalStorage = {};
  }

  setItem (key, value) {
    this.structureLocalStorage[key] = value;
  }

  getItem (key) {
    if (typeof this.structureLocalStorage[key] !== 'undefined') {
      return this.structureLocalStorage[key];
    }
    return null;
  }

  removeItem (key) {
    this.structureLocalStorage[key] = undefined;
  }
}

let storage;

function initLocalStorageAlternative () {
  console.warn('No local storage support. Return alternative.');
  storage = new LocalStorageAlternative();
  return storage;
}

export function getLocalStorage () {
  // Check cache first.
  if (storage) {
    return storage;
  }
  try {
    // Check if the browser supports local storage.
    if (!localStorage) {
      return initLocalStorageAlternative();
    }
  } catch (e) {
    return initLocalStorageAlternative();
  }

  try {
    // If there is local storage but browser is in private mode,
    // the next lines will fail.
    localStorage.setItem('__TEST__', '');
    localStorage.removeItem('__TEST__');
    storage = localStorage;
  } catch (err) {
    storage = initLocalStorageAlternative();
  }
  return storage;
}

export function isTestEnv () {
  const url = window.location.href || '';
  return url.indexOf('localhost') > -1;
}

/**
 * Creates and returns a new debounced version of the passed function which
 * will postpone its execution until after wait milliseconds have elapsed since
 * the last time it was invoked. Useful for implementing 'search'. After we
 * stopped entering the search string, we want to perform a single search.
 * NOTE: based on underscore's debounce()
 * @param {function} func The function to be applied after a certain time.
 * @param {wait} number The number of milliseconds to wait until execution.
 */
/* eslint-disable */
export function slowdown (func, wait, immediate) {
  let timeout;
	return function() {
		const context = this;
    const args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) {
        func.apply(context, args);
      }
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
      func.apply(context, args);
    }
	};
}

export function getRoute (path) {
  if (path === '/') {
    return '';
  }
  return path.split('/')[1];
}

export function setVisibleColumns (columnDefs, visibleColumns) {
  if (!visibleColumns) {
    return columnDefs;
  }
  return columnDefs.map((column) => ({
    ...column,
    hide: visibleColumns.toJS().indexOf(column.field) === -1
  }));
}

export function setLastOrderColumns (columnDefs, movedColumns, option) {
  if (!movedColumns) {
    return columnDefs;
  }
  let columns = movedColumns.toJS();

  const diffColumns = columnDefs.filter((column) => columns.indexOf(column.field) === -1 );
  if (diffColumns.length > 0) {
    columns = diffColumns.map((column) => column.field).concat(columns);
  }
  if (option && option.selectable) {
    columns = columns.filter((column) => column !== 'selectID');
    columns = ['selectID'].concat(columns);
  }
  return columns.map((key) => columnDefs.find((column) => column.field === key));
}

export function isFirstColumn (params) {
  let displayedColumns = params.columnApi.getAllDisplayedColumns();
  let thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

export function setWidth (columnDefs, columnsWidth) {
  if (!columnsWidth) {
    return columnDefs;
  }
  const newColumnsWidth = columnsWidth.toJS();
  return columnDefs.filter((column) => column).map((column) => ({
    ...column,
    width: newColumnsWidth[column.field] ? newColumnsWidth[column.field] : 200
  }))
}

export function setSortModel (columnDefs, sortModel) {
  if (sortModel.length === 0) {
    return columnDefs;
  }
  return columnDefs.map((column) => ({
    ...column,
    sort: column.field === sortModel[0].colId ? sortModel[0].sort : undefined
  }));
}
