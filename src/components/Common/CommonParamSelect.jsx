import React from 'react';
import { Row, Col, Select } from 'antd';
import { bindActionCreators } from 'redux'
import * as Api from '../../apps/api'
const Option = Select.Option;

//用法引入标签后 <CommonParamSelect groupId="fc_FeeItem" paramLevel="2" />
export default class CommonParamSelect extends React.Component {

  constructor() {
    super();
		this.state = {
      commonParamList: []
    }
  }

	componentDidMount() {//页面加载后触发事件
    const params = {
      groupId: this.props.groupId,
      paramLevel: this.props.paramLevel
    }
    const _this = this;
    Api.getCommonParamByGroupId(params).then(({ jsonResult = { data: [] } }) => {
      _this.setState({
        commonParamList: jsonResult.data
      })
    })
	}

	render() {
		const loop = data => data.map((item) => {
      return <Option key={item.paramid} value={item.paramid}>{item.paramname}</Option>;
    });
		return (
      <Select {...this.props} size="large" >
        {loop(this.state.commonParamList)}
      </Select>
		)
	}
}
