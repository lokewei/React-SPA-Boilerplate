import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import { Row, Col, Card, Tabs, Icon, Button } from 'antd';
import * as AppAction from 'AppAction';
import styles from './component/index.less';

const TabPane = Tabs.TabPane;
export default class WorkBench extends React.Component {

option1 = {
  title: {
    text: '票据数量',
    subtext: ' '
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['收据', '发票', '无票据']
  },
  toolbox: {
    show: true,
    feature: {
      mark: {
        show: true
      },
      dataView: {
        show: true,
        readOnly: false
      },
      magicType: {
        show: true,
        type: ['line', 'bar']
      },
      restore: {
        show: true
      },
      saveAsImage: {
        show: true
      }
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: [
        '01-01',
        '01-02',
        '01-03',
        '01-04',
        '01-05',
        '01-06',
        '01-07'
      ]
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name: '收据',
      type: 'line',
      lineStyle: {
        normal: {
          width: 4
        }
      },
      symbolSize: 10,
      smooth: false,
      data: [
        10,
        5,
        10,
        3,
        18,
        1,
        0
      ]
    }, {
      name: '发票',
      type: 'line',
      lineStyle: {
        normal: {
          width: 4
        }
      },
      symbolSize: 10,
      smooth: false,
      data: [
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    }, {
      name: '无票据',
      type: 'line',
      lineStyle: {
        normal: {
          width: 4
        }
      },
      symbolSize: 10,
      smooth: false,
      data: [
        0,
        0,
        0,
        5,
        0,
        0,
        0
      ]
    }
  ]
};
option2 = {
  title: {
    text: '收款金额比率',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['现金', '刷卡', '手机支付']
  },
  toolbox: {
    show: true,
    feature: {
      mark: {
        show: true
      },
      dataView: {
        show: true,
        readOnly: false
      },
      magicType: {
        show: true,
        type: [
          'pie', 'funnel'
        ],
        option: {
          funnel: {
            x: '25%',
            width: '50%',
            funnelAlign: 'left',
            max: 1548
          }
        }
      },
      restore: {
        show: true
      },
      saveAsImage: {
        show: true
      }
    }
  },
  calculable: true,
  series: [
    {
      name: '案件示例',
      type: 'pie',
      radius: '55%',
      center: [
        '50%', '60%'
      ],
      data: [
        {
          value: 335,
          name: '现金'
        }, {
          value: 310,
          name: '刷卡'
        }, {
          value: 234,
          name: '手机支付'
        }
      ]
    }
  ]
};

render() {
  return (
    <div>
      <Row gutter={16}>
				<Col span={16} >
					<Card style={{ height: 200 }}>
            <Tabs type="newCard">
              <TabPane tab="待办流程" key="1">
									<div className={styles.bgList}>
                    <div>1.请假申请流程
                      <span className={styles.orderNum}>（3）</span>
                      <Icon type="eye" className={styles.iconStyle} />
                    </div>
                    <div>2.出差报销申请流程
                      <span className={styles.orderNum}>（3）</span>
                      <Icon type="eye" className={styles.iconStyle} />
                    </div>
                    <div>3.业务审批流程
                      <span className={styles.orderNum}>（3）</span>
                      <Icon type="eye" className={styles.iconStyle} />
                    </div>
                  </div>
                  <Button size="default" className={styles.btnStyle}>更多</Button>
								</TabPane>
              <TabPane tab="已办流程" key="2">
                <div className={styles.bgList}>
                  <div>1.请假申请流程
                    <span className={styles.orderNum}>（3）</span>
                    <Icon type="eye" className={styles.iconStyle} />
                  </div>
                  <div>2.出差报销申请流程
                    <span className={styles.orderNum}>（3）</span>
                    <Icon type="eye" className={styles.iconStyle} />
                  </div>
                  <div>3.业务审批流程
                    <span className={styles.orderNum}>（3）</span>
                    <Icon type="eye" className={styles.iconStyle} />
                  </div>
                </div>
              <Button size="default" className={styles.btnStyle}>更多</Button>
              </TabPane>
              <TabPane tab="发起的流程" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
					</Card>
				</Col>
				<Col span={8}>
					<Card title="我的关注" style={{ height: 200 }}>
            <p>即将挞定的订单套数：
              <a>0套</a>
            </p>
          </Card>
				</Col>
			</Row>
      <Row gutter={16} style={{ marginTop: 10 }}>
        <Col span={16}>
          <Card style={{ height: 400 }}>
            <ReactEcharts option={this.option1} theme="clear" style={{ height: '380px', width: '100%' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ height: 400 }}>
            <ReactEcharts option={this.option2} theme="clear" style={{ height: '380px', width: '100%' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
}
