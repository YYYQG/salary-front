import React from 'react';
import { connect } from 'dva';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import router from 'umi/router';
import { digitUppercase } from '@/utils/utils';
import styles from './style.less';
import EditableTable from './EmailInfoEditableTable'


@connect(({ emailSend,loading }) => ({
    dataSource:emailSend.dataSource,
    loading: loading.effects['emailSend/getAllEmailInformation']
}))
class Step2 extends React.PureComponent {

  componentDidMount(){
    const {dataSource,dispatch} = this.props;
    dispatch({
      type: 'emailSend/getAllEmailInformation',
    })


  }

  handleSave(row){
    const {dispatch} = this.props;
    dispatch({
      type: 'emailSend/saveStaffEmailAndEmailInformation',
      payload:row,
    })
  }

  render() {

    const {dataSource,loading} = this.props;


    return (
      <div className={styles["step2-content"]}>
        <EditableTable dataSource={dataSource} handleSave={(row)=>{this.handleSave(row)}} loading = {loading} />
      </div>
    );
  }
}

export default Step2;
