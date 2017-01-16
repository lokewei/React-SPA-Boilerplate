import React from 'react'
import { Form } from 'antd'

export const createForm = (statelessFunc) => {
  return Form.create()(React.createClass({
    render() {
      return statelessFunc(this.props)
    }
  }));
}
