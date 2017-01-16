import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import styles from './index.less'
import SearchInput from 'SearchInput'
import headImg from '../../../static/img/head.png'

class LeftPanel extends React.Component {

  static defaultProps = {
    data: []
  }

  constructor() {
    super();
    this.options = [];
  }

  componentWillMount() {
    this.props.data.forEach((item) => {
      if (item.hidden) {
        return;
      }
      if (item.expand === false) {
        this.options.push({ key: item.key, value: item.name });
      } else if (!isEmpty(item.children)) {
        item.children.forEach((citem) => {
          this.options.push({ key: `${citem.url}`, value: `${item.name}-${citem.name}` });
        })
      }
    });
  }

  onSelect(url) {
    this.props.changeLocation(url);
  }

  generateMenuHead(config) {
    if (isEmpty(config.children) || config.expand === false) {
      return (
        <div className="ItemHead" onClick={() => {this.props.switchExpand(config.url); this.props.changeLocation(config.url)}}>
          <span className={config.className} />
          <p className="pickUp2">{config.name}</p>
          <a className="onbg" />
        </div>
      )
    }
    return (
      <div className="ItemHead" onClick={() =>
          !this.props.collapsed && this.props.switchExpand(config.url)
        }
      >
        <span className={config.className} />
        <p className="pickUp2">{config.name}</p>
        <a className="expand pickUp2" />
        <a className="onbg" />
      </div>
    )
  }

  generateMenuBody(config) {
    if (isEmpty(config.children) || config.expand === false) return '';
    const result = [];
    for (const bodyItem of config.children) {
      const isOn = this.props.currentPath === bodyItem.url;
      result.push(
        <li key={bodyItem.url} className={isOn ? 'select' : ''}>
          <Link to={bodyItem.url}>{bodyItem.name}</Link>
        </li>
      )
    }

    return (
      <div className="ItemBody">
        <ul className={this.props.collapsed ? 'acdUl acdUl1' : 'acdUl'}>
          {result}
        </ul>
      </div>
    );
  }
  generateMenuItem(config) {
    const pathArr = this.props.currentPath.split(/\//);
    let isOn = false;
    //如果第一次进入页面，并且路径匹配一级菜单
    if (this.props.currentExpanded === '/' && `/${pathArr[1]}` === config.url) {
      isOn = true;
    }
    //如果当前菜单有子菜单并且没有手动收缩，并且当前展开匹配url
    if (
      !isEmpty(config.children)
      && this.props.currentExpanded !== `-${config.url}`
      && this.props.currentExpanded === config.url
    ) {
      isOn = true
    }

    return (
      <div key={config.url} className={isOn ? 'acdItem on' : 'acdItem'}>
        {this.generateMenuHead(config)}
        {this.generateMenuBody(config)}
      </div>
    )
  }
  generateMenuAll() {
    const result = [];
    const _this = this;
    this.props.data.forEach((config) => {
      if (config.hidden !== true) {
        result.push(_this.generateMenuItem(config));
      }
    });
    return result;
  }

  render() {
    return (
      <div className={this.props.collapsed ? 'menuPanel out_1' : 'menuPanel'}>
        <div className={this.props.collapsed ? 'logoDiv' : 'logoDiv out_2'}>
          <span className="pickUp2" />
        </div>

        <div className="userMenu1">
          <img src={headImg} />
          <div className="htext pickUp2">
            <span className="hName"> 早上好，xxx
            </span>
            <div className="hPosition">
              当前公司：
              <span>广州</span>
              <b />
            </div>
          </div>
        </div>

        <div className="acdBox">

          {this.generateMenuAll()}

        </div>
      </div>
    );
  }
}



export default LeftPanel
