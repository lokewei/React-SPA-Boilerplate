import { push } from 'react-router-redux-fixed'
import * as Api from './api'
import { parseParam } from '../util'
import _isEmpty from 'lodash/isEmpty'

/**
 * 触发左侧菜单的显示隐藏
 * @return {[type]} [description]
 */
export function toggleLeftCollapsed() {
  return {
    type: 'TOGGLE_LEFT_COLLAPSED'
  }
}

export function switchLeftExpand(url) {
  return {
    type: 'SWITCH_LEFT_EXPAND',
    params: { url }
  }
}

/**
 * 控制跳转的action，第二个参数为对象自动转为querystr，被打开的目标可以用this.props.location.query.xx来访问
 * @param  {[type]} url         [description]
 * @param  {Object} [params={}] [description]
 * @return {[type]}             [description]
 */
export function changeLocation(url, params = {}) {
  const query = _isEmpty(params) ? '' : `?${parseParam(params)}`;
  return push(`${url}${query}`);
}

export function getProjectTree(params) {//项目树
  return {
    type: 'GET_PROJECT',
    payload: {
      promise: Api.getProjectTree(params)
    },
    params: {
      queryCondition: params //把查询条件传给recuder
    }
  }
}
export function getProTreSel(params) {//下拉项目树
  return {
    type: 'GET_PROJECT',
    payload: {
      promise: Api.getProjectTree(params)
    }
  }
}
export function changeProjectSelected(projId) {
  return {
    type: 'CHANGE_PROJECT_SELECTED',
    params: {
      selectedProjId: projId
    }
  }
}

export function doLogout() {
  return push('/login');
}
