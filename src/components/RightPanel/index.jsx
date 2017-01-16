import React, { PropTypes } from 'react';
import MianBao from 'MianBao'
import isEmpty from 'lodash/isEmpty'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppAction from 'AppAction'
import { Icon } from 'antd'
import MsgBox from 'MsgBox'
import styles from './index.less'

class RightPanel extends React.Component {

  doSetting() {
    MsgBox.show({
      title: '设置',
      content: ''
    });
  }

  doLogout() {
    this.props.doLogout();
  }

  doHelpDoc() {
    window.open('/doc/index.html');
  }

  render() {
    return (
      <div className={this.props.collapsed ? 'rightPanel rightPanel1' : 'rightPanel'} >
        <div className={this.props.collapsed ? 'headTool fullSize' : 'headTool'}>
          <a className="listTo" onClick={this.props.toggleLeftCollapsed}>
            <span className="btn11" />
          </a>
          {/*<div className={styles['search-input']} >
            <ProTreSelect />
          </div>*/}
          <a className="onOff">
            <span onClick={::this.doLogout} />
          </a>
          <a className="settingTo">
            <span onClick={::this.doSetting} />
          </a>
          {
            __WidthDoc__ ? (
            <a style={{ fontSize: 20, float: 'right', paddingTop: 10 }} onClick={::this.doHelpDoc}>
              <Icon type="question-circle-o" />
            </a>) : false
          }
        </div>
        <div className="contentPanel">
          <MianBao />
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(AppAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel)
