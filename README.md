#### nodejs环境需求
nodejs v4.5.0版本
设置国内镜像
`npm config set registry https://registry.npm.taobao.org `
npm3(安装完毕nodejs后升级npm3: `npm -g install npm@3`)

#### chrome安装如下插件辅助开发:
- React Developer Tools
- Redux DevTools
- livereload

#### 先执行一次包更新
`npm install`

#### 开发执行(常驻后台即可)
`npm start`

#### 开发+说明文档
`npm run dev`

#### 访问地址
http://localhost:8989

#### 构建提速
先执行`npm run build:dll`,之后执行`npm start`可以大大减少构建数量,
然后将src/entris/index.html里的`<script src="./dlls/vendor.dll.js"></script>`打开。

*不要提交./dlls目录*

#### 强力工具库lodash建议使用
http://lodashjs.com/docs (建议最小导入使用 eg: `import _isEmpty from 'lodash/isEmpty'`)

#### alias注册
./alias.js 文件里注册

#### 附加的图标和按钮库
```
import SysIcon from 'SysIcon'
import Buttons from 'Buttons'
```

#### 目录说明
```
├─dlls                          #dlls编译后的问题
├─doc                           #帮助文件入口
│
├─src
│ ├─apps                        #各个功能模块放在这里
│ │  ├─aftersale                #售后模块
│ │  │  └─contractmanage        #合同管理
│ │  │      └─component
│ │  ├─login
│ │  ├─sales
│ │  |   ├─housequery
│ │  |   └─reservation
│ |  ├─action.js                #主界面可发起动作
│ |  ├─index.js                 #主界面视图，已连接redux
│ |  └─reducer.js               #主界面动作处理器
│ ├─common                      #公共资源文件夹，包含功能样式图片等
│ │  └─img
│ │      ├─funButton
│ │      └─icons
│ ├─components                  #可复用视图组件，与具体业务无强关联
│ │  ├─Common
│ │  ├─Footer
│ │  ├─LeftPanel                #左侧菜单
│ │  ├─Loding
│ │  ├─NavPath                  #面包屑
│ │  ├─PanelBox
│ │  ├─RightPanel               #右侧主视图区
│ │  └─TabPanel
│ ├─constants                   #公用静态数据
│ |  └─LeftMenu                 #主菜单结构定义(新增模块时在这里增加菜单)
│ ├─entries                     #系统主入口文件
│ ├─reducers                    #系统动作处理器注册模块(自动扫描apps下的reducer.js文件)
│ ├─routes                      #系统路由动态生成模块(根据apps下的模块结构)
│ ├─store                       #系统全局状态存储器(一般不会修改)
│ │  └─middlewares
│ └─util                        #工具类包(xFetch后台请求工具等)
│
├─static                        #静态资源存放路径                      
```

#### 开发注意要点

*模块开发自带的样式放在本模块下面,图片放到公共目录下(src/common/img)*

*一般不要覆盖ant的样式，有需要在entries/index.less里覆盖。页面布局采用ant的row,col布局不要另外单独写样式布局*

*模块主入口文件使用.js后缀，模块部件放到子文件夹`./components下`,并以.jsx为后缀*

###### React内置类型
```
React.PropTypes类型列表 (任何类型在最后加上isRequired则此在使用此组件时必须赋值)
React.PropTypes.array,//数组类型
React.PropTypes.bool,//布尔值类型
React.PropTypes.func,//函数类型
React.PropTypes.number,//数值类型
React.PropTypes.object,//JS对象类型
React.PropTypes.string, //字符串类型
React.PropTypes.node, // 所有可以被渲染的对象    
React.PropTypes.element,  // React 元素
React.PropTypes.oneOf(['News', 'Photos']), //只接受其中一个值的枚举类型
React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number     ]),
React.PropTypes.arrayOf(React.PropTypes.number), // 指定类型组成的数组
// 指定类型的属性构成的对象
 React.PropTypes.objectOf(React.PropTypes.number),
// 特定形状参数的对象
 React.PropTypes.shape({
  color: React.PropTypes.string,
  fontSize: React.PropTypes.number
}),
```
###### React生命周期
```
  挂载		
		componentWillMount   挂载前		
		componentDidMount	挂载后
	更新		
		componentWillUpdate		更新前		
		componentDidUpdate		更新后
		componentWillReceiveProps	当接收到props时		参数:nextProps
	    shouldComponentUpdate		是否执行更新
	卸载		
		componentWillUnmount

```
##### 后台交互说明
开发环境调用后台路径配置：
`proxy.config.js`文件下可以自由定义接口调用到的后台地址，业务模块不要出现应用路径(BackGround)；

各个模块目录下：
- api.js      定义与后台交互的接口方法
- action.js   定义页面操作触发的动作(eg. 点击查询按钮)
- reducer.js  定义触发动作后的影响(eg. 查询完成后将查询结果set回state，视图自动刷新)
参考交互模块：finance/invoice

##### 依赖注入说明
*每个模块有自己的state用来统一管理视图数据*

- 将需要的state的节点注入到与此视图数据相关的组件上
```
function mapStateToProps(state, ownProps) {
	return {
			loading:state.getIn(['projectPre','projectMgr','loading']),
      ...
	}
}
```

- 将需要绑定的响应事件注入到组件上
```
function mapDispatchToProps(dispatch){
	return {
		...bindActionCreators(action, dispatch)
	}
}
```

路由相关说明：
================================
##### 一、`<Link>`标签

Link组件用于取代`<a>`元素，生成一个链接，允许用户点击后跳转到另一个路由。它基本上就是`<a>`元素的React 版本，可以接收Router的状态。
```
render() {
  return <div>
    <ul role="nav">
      <li><Link to="/about">About</Link></li>
      <li><Link to="/repos">Repos</Link></li>
    </ul>
  </div>
}
```
如果希望当前的路由与其他路由有不同样式，这时可以使用Link组件的activeStyle属性。

```
<Link to="/about" activeStyle={{color: 'red'}}>About</Link>
<Link to="/repos" activeStyle={{color: 'red'}}>Repos</Link>
```
上面代码中，当前页面的链接会红色显示。
另一种做法是，使用activeClassName指定当前路由的Class。

```
<Link to="/about" activeClassName="active">About</Link>
<Link to="/repos" activeClassName="active">Repos</Link>
```
上面代码中，当前页面的链接的class会包含active。
在Router组件之外，导航到路由页面，可以使用浏览器的History API，像下面这样写。
```
import { browserHistory } from 'react-router';
browserHistory.push('/some/path');

```
##### 二、IndexLink

如果链接到根路由/，不要使用Link组件，而要使用IndexLink组件。
这是因为对于根路由来说，activeStyle和activeClassName会失效，或者说总是生效，因为/会匹配任何子路由。而IndexLink组件会使用路径的精确匹配。
```
<IndexLink to="/" activeClassName="active">
  Home
</IndexLink>

```
上面代码中，根路由只会在精确匹配时，才具有activeClassName。
另一种方法是使用Link组件的onlyActiveOnIndex属性，也能达到同样效果。
```
<Link to="/" activeClassName="active" onlyActiveOnIndex={true}>
  Home
</Link>

```
实际上，IndexLink就是对Link组件的onlyActiveOnIndex属性的包装。

##### 三、组件里通过响应函数跳转
- 方式1:
```
组件类声明如下
static contextTypes = {
  router: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired
};
然后在需要控制跳转的地方
	this.context.router.push('/xxx');
```
- 方式2
```
导入公共action
import * as AppAction from 'AppAction'
依赖注入action
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(AppAction, dispatch)
  }
}
需要跳转的地方触发action
this.props.changeLocation('/xxx', params); [可以通过params来传参数]
被打开的页面接收参数
this.props.location.query.xxx
```

Redux相关说明
==========================
##### Redux连接后的组件refs生效的方法(第四个参数)
`connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Content);`
