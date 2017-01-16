// Use require.context to require reducers automatically
// Ref: https://webpack.github.io/docs/context.html
/*const context = require.context('./', true, /\.js$/);
const keys = context.keys().filter((item) => {return item !== './index.js' && /([^\/]+)_reducer\.js$/.test(item); });

const reducers = keys.reduce((memo, key) => {
  memo[key.match(/([^\/]+)_reducer\.js$/)[1]] = context(key);
  return memo;
}, {});

console.dir(Object.keys(reducers));*/

import AppReducer from '../apps/reducer';
import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import _isEmpty from 'lodash/isEmpty';
import _clone from 'lodash/clone';

const appPaths = {};
const modules = {};
const context = require.context('../apps/', true, /^\.\/.+(reducer)\.js$/);
const appkeys = context.keys();
const logModuleLoad = (name, module, isReload) => console.log(`module ${name} ${isReload ? 're' : ''}loaded !`);

appkeys.forEach((item) => {
  const parts = item.split('/');
  const module = context(item);
  modules[item] = module;
  // logModuleLoad(item,module,false);
  parts.forEach((part, index) => {
    if (part !== '.') {
      let cps = appPaths;//当前路径对象
      const cpath = ['.'];
      for (let i = 1; i < index; i++) {
        const pi = parts[i];
        cpath.push(pi);
        if (!cps[pi]) cps[pi] = {};
        cps = cps[pi];
      }
      if (index == parts.length - 1) {
        cps['reducer'] = cpath.join('/')+`/${parts[index]}`;
      }
    }
  })
});
console.log('module ars paths', appPaths);

const reducerPathMap = Immutable.fromJS(appPaths);

const getReducer = (path) => {
  const reducer = reducerPathMap.getIn(path);
  if (!reducer) {
    console.error('reducer不存在!', path);
    throw new ReferenceError('reducer不存在!');
  }
  return context(reducer);
}

const travelModules = (cmod, parent = {}, path = []) => {
  const subModNames = Object.keys(cmod);
  //判断当前路径下是否有reducer
  if (subModNames.indexOf('reducer') > -1) {
    const currentPath = _clone(path);
    let modName = `${path[path.length - 1]}`;
    //判断路径是父节点并有reducer的话，由于object的key无法重复自动加上下划线_[modeName]
    if (subModNames.length > 1) {
      modName = `_${path[path.length - 1]}`;
    }
    currentPath.push('reducer');
    const modeReucer = getReducer(currentPath);
    //注册对应路径的reducer，警告非法的reducer
    if (typeof modeReucer === 'function') {
      parent[modName] = modeReucer
    } else {
      console.warn('非法的reducer, reducer必须是一个function', currentPath);
    }
  }
  const realParent = parent; //把参数里的父级对象存起来
  if (path.length > 0) {
    const modeName = `${path[path.length - 1]}`;
    parent = parent[modeName]; //如果当前路径不是根路径，将parent对象指向对应路径的对象
  }
  let subModeCount = 0;
  subModNames.forEach((modeName) => {
    if (modeName === 'reducer') return;
    if (!parent[modeName]) {
      parent[modeName] = {}; //初始化子模块对象
    }
    const nextPath = _clone(path);
    nextPath.push(modeName);
    // console.log(nextPath, parent, modeName);
    travelModules(cmod[modeName], parent, nextPath); //递归到找不到子模块
    subModeCount++;
  });
  if (subModeCount > 0 && path.length > 0) {
    const modeName = `${path[path.length - 1]}`;
    realParent[modeName] = combineReducers(parent);
    // realParent[modeName] = { _: '...', ...parent };
  }
}

const travelTree = {};
travelModules(appPaths, travelTree);
console.log('travleTree', travelTree);


export default { APP: AppReducer, ...travelTree };
