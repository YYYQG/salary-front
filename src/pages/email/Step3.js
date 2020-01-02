import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col,Table, Icon, Spin } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import _ from 'lodash'

@connect(({ emailSend }) => ({
  emailSend: emailSend,
}))
class Step3 extends React.PureComponent {


  handleClick(record){
    const {dispatch} = this.props;
    const status = {
      key: record.key,
      status: 1,
    }
    dispatch({
      type:"emailSend/saveEmailSendStatus",
      payload:status
    })


  }

  render() {

    const SendIcon = Icon.createFromIconfontCN({
      scriptUrl:'//at.alicdn.com/t/font_1591681_s702l7e0utt.js'
    })

    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        editable: true,
      },
      {
        title: '基本工资',
        dataIndex: 'base_salary',
        editable: true,
      },
      {
        title: '岗位工资',
        dataIndex: 'post_salary',
        editable: true,
      },
      {
        title: '工龄工资',
        dataIndex: 'seniority_salary',
        editable: true,
      },
      {
        title: '绩效、奖金',
        dataIndex: 'performance_and_bonus',
        editable: true,
      },
      {
        title: '餐费补贴',
        dataIndex: 'meal_allowance',
        editable: true,
      },
      {
        title: '其它扣除',
        dataIndex: 'other_deduction',
        editable: true,
      },
      {
        title: '工资总额',
        dataIndex: 'total_salary',
        editable: true,
      },
      {
        title: '社保个人',
        dataIndex: 'individual_social_security',
        editable: true,
      },
      {
        title: '公积金个人',
        dataIndex: 'individual_provident_fund',
        editable: true,
      },
      {
        title: '应扣所得税',
        dataIndex: 'individual_income_tax',
        editable: true,
      },
      {
        title: '实际应付工资',
        dataIndex: 'take_home_salary',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {

          const {sendStatuses} = this.props.emailSend;
          const status = sendStatuses.find((item)=>item.key===record.key);
          if(_.isEmpty(status)||status.status===0){
            return <SendIcon className={styles["step3-content-table-icon"]} onClick={()=>this.handleClick(record)}  type="icon-fasong" />
          }else if(status.status===1){
            return <Spin indicator={antIcon} />
          }else if(status.status===2) {
            return <Icon type="check-circle" style={{ fontSize: 24,color:'#52c41a' }} />
          }else{
            return <Icon type="close-circle" style={{ fontSize: 24,color:'#f5222d' }} />
          }

        },
      },
    ];


    const { dataSource } = this.props.emailSend;
    return(
      <div className={styles["step3-content"]}>
        <Table bordered columns={columns} dataSource={dataSource}></Table>
      </div>
    )
  }
}

export default Step3;
