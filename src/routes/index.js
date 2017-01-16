import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, IndexRedirect } from 'react-router';
import loader from '../common/loader.jsx';
import App from '../apps/index';
import Login from '../apps/login';
import GhostContainer from '../components/GhostContainer';
import FrameContainer from '../components/FrameContainer';
import NotFound from '../components/NotFound';

function validate() {
  // 在路由群载入时做 filter 处理
}
const appPaths = {};
const context = require.context('../apps/', true, /index\.js$/);
const appkeys = context.keys().filter((item) => {
  return item !== './index.js';
});

/*const contextForSub = require.context('../apps/', true, /^(?!index)\.js[x]?$/);
console.log(contextForSub.keys());*/

appkeys.forEach((item) => {
  const parts = item.split('/');

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
        cps._index = cpath.join('/');
      }
    }
  })
});

// console.log(appPaths);

/**
 * 动态生成路由树的方法
 * @param  {[type]} pathObj [description]
 * @return {[type]}         [description]
 */
const generateRoutes = (pathObj) => {
  const result = [];
  const objKeys = Object.keys(pathObj);
  objKeys.forEach((path, index) => {
    if (path == '_index') return;
    const subPathObj = pathObj[path];
    const compPath = subPathObj['_index'];
    if (!Object.keys(subPathObj).some((item) => item != '_index')) {
      const Loader = compPath ? (
        __PRODUCTION__
        ? loader(require.context('bundle?lazy!babel?presets=react!../apps/', true, /^\.\/.+(index)\.js$/)(`${compPath}/index.js`))
        : require.context('../apps/')(`${compPath}/index.js`)
      ) : NotFound;
      /*const cps = require.context('../apps/')(`${compPath}/components/`, true, /^(?!index)\.js[x]$/);
      console.log(cps);*/
      // const Loader = compPath ? require.context('../apps/')(`${compPath}/index.js`) : NotFound;
      result.push(<Route key={path} path={path} component={Loader} />);
    } else {
      const children = generateRoutes(subPathObj);
      const Loader = compPath ? (
        __PRODUCTION__
        ? loader(require.context('bundle?lazy!babel?presets=react!../apps/', true, /^\.\/.+(index)\.js$/)(`${compPath}/index.js`))
        : require.context('../apps/')(`${compPath}/index.js`)
      ) : GhostContainer;
      // const Loader = compPath ? require.context('../apps/')(`${compPath}/index.js`) : GhostContainer;
      result.push(<Route key={path} path={path} component={Loader}>{children}</Route>);
    }
  })
  return result;
}

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/login" component={Login} />
    <Route path="/"
      component={App}
      onEnter={validate}
      onChange={(prevState, nextState) => {
        //路由切换新界面时，重置滚动条位置
        if (nextState.location.action !== 'POP') {
          window.scrollTo(0, 0);
        }
      }}
    >
      <IndexRedirect to="workBench" />
      {/*<Route path="/setPriceMgr/:subPath" component={FrameContainer} />*/}
      {generateRoutes(appPaths)}
    </Route>

    <Route path="*" component={NotFound} />
  </Router>;

Routes.propTypes = {
  history: PropTypes.any
};

export default Routes;
