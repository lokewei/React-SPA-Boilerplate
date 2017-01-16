import React from 'react';
import { Form, Input, Button, Icon } from 'antd';
import style from './login.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from './action'
import * as Api from './api'
import * as AppAction from 'AppAction'

class Login extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginSuccess) {
      this.props.changeLocation('/');
    }
  }

    doLogin() {
      const params = this.props.form.getFieldsValue();
      this.props.doLogin(params);
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const sameProps = {
        onPressEnter: this.doLogin
      }
        return (
           <div className={style.loginMain}>
               <div className={style.loginTop}>
                <i></i>
               </div>
               <div className={style.loginMiddel}>
                 <div className={style.avator}></div>
                 <div>
                   {
                     getFieldDecorator('username')(
                       <Input className={style.username} size="large" placeholder="请输入用户名" />
                     )
                   }
                   {
                     getFieldDecorator('password')(
                       <Input className={style.password} size="large" type="password" placeholder="请输入密码" />
                     )
                   }
                   <Button
                     icon="logout"
                     type="primary"
                     size="large"
                     loading={this.props.isLogging}
                     onClick={::this.doLogin}
                   >
                     登录
                   </Button>
                 </div>
               </div>
               <div className={style.loginBottom}>
                 <span className={style.company}>
                    系统维护：xxxx有限公司
                 </span>
               </div>
           </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
  return {
    isLogging: state.getIn(['login', 'isLogging']),
    message: state.getIn(['login', 'message']),
    loginSuccess: state.getIn(['login', 'loginSuccess'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(action, dispatch),
    ...bindActionCreators(AppAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login))
