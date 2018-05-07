import * as api from '../api/module';
import { makeApiActionCreator } from './utils';

export const MODULE_FETCH_DATA_START = 'MODULE/MODULE_FETCH_DATA_START';
export const MODULE_FETCH_DATA_SUCCESS = 'MODULE/MODULE_FETCH_DATA_SUCCESS';
export const MODULE_FETCH_DATA_ERROR = 'MODULE/MODULE_FETCH_DATA_ERROR';

export const fetchModuleData = makeApiActionCreator(api.fetchModuleData, MODULE_FETCH_DATA_START, MODULE_FETCH_DATA_SUCCESS, MODULE_FETCH_DATA_ERROR);
