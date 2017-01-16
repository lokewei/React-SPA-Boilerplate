import { createReducer } from '../util';
import { Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux-fixed';

const initialState = Map({
	loading: false,
  leftMenuCollapsed: false,
  currentExpanded: '/',
  location: {},
  projectTree: {
    success: true,
    data: {
      projTree: []
    },
    message: null,
    code: 0
  },
  ProTreSelected: null,
  commonParamList: {
    success: true,
    data: [],
    message: null,
    code: 0
  }
});

export default createReducer(initialState, {
  /**
   * 控制左侧菜单的显示隐藏
   */
  TOGGLE_LEFT_COLLAPSED: (state, data) => {
    return state.update('leftMenuCollapsed', v => !v);
  },
  SWITCH_LEFT_EXPAND: (state, data, params) => {
    return state.update('currentExpanded', v => (v == params.url && v !='/' ? `-${v}` : params.url));
  },
  [LOCATION_CHANGE]: (state, location) => {
    return state.set('location', location);
  },
	CHANGE_PROJECT_SELECTED: (state, data, params) => {
		return state.set('ProTreSelected', params.selectedProjId);
	}

});
