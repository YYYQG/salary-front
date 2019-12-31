import React from 'react';
import { connect } from 'dva';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import router from 'umi/router';
import { digitUppercase } from '@/utils/utils';
import styles from './style.less';
import EditableTable from './EmailInfoEditableTable'


@connect(({ emailSend }) => ({
    dataSource:emailSend.dataSource,
}))
class Step2 extends React.PureComponent {
  render() {

    const dataSource = this.props.dataSource;

    return (
      <div className={styles["step2-content"]}>
        <EditableTable dataSource={dataSource} />
      </div>
    );
  }
}

export default Step2;
