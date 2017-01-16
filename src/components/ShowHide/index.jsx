import React, { Component } from 'react';
import style from './index.less';

class ShowHide extends Component {
    constructor() {
        super();
        //初始化组件状态
        this.state = {
            number: 0,
            dropdown: '收起',
            isDropdown: true,
            className: 'drop'
        }
    }
    toggleDown(event) {
        if (this.state.isDropdown && this.state.dropdown == '收起') {
            this.setState({
              isDropdown: false,
              dropdown: '展开',
              className: 'drop1'
            });
        } else {
            this.setState({
              isDropdown: true,
              dropdown: '收起',
              className: 'drop'
            })
        }
    }
    render() {
        return (
            <div className={style.shBody}>
              <div className={style[this.state.className]} onClick={this.toggleDown.bind(this)}>
                  {this.state.dropdown}
              </div>
              <div className={style.dropCon} style={{ display: this.state.isDropdown ? 'block' : 'none' }}>
                {this.props.children}
              </div>
            </div>
        );
    }
}
export default ShowHide;
