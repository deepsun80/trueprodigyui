import { fromJS } from 'immutable';
import * as modalAction from '../actions/modal';

const initialStats = {
  masterCompModal: {
    openState: false
  },
  versionCompModal: {
    openState: false
  },
  scoreModal: {
    openState: false,
    values: {}
  }
};
export default (state = fromJS(initialStats), action) => {
  switch (action.type) {
    // User actions
    // ////////////
    case modalAction.MASTER_COMP_MODAL_OPEN:
      return state.setIn([ 'masterCompModal', 'openState' ], true);
    case modalAction.MASTER_COMP_MODAL_CLOSE:
      return state.setIn([ 'masterCompModal', 'openState' ], false);

    case modalAction.VERSION_COMP_MODAL_OPEN:
      let newState = state.setIn([ 'versionCompModal', 'versionId' ], action.data);
      return newState.setIn([ 'versionCompModal', 'openState' ], true);
    case modalAction.VERSION_COMP_MODAL_CLOSE:
      return state.setIn([ 'versionCompModal', 'openState' ], false);

    case modalAction.SCORE_MODAL_OPEN:
      newState = state.setIn([ 'scoreModal', 'values' ], action.data);
      return newState.setIn([ 'scoreModal', 'openState' ], true);
    case modalAction.SCORE_MODAL_CLOSE:
      return state.setIn([ 'scoreModal', 'openState' ], false);
    default:
      return state;
  }
};
