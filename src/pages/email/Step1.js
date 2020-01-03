import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Select, Upload, Icon,message } from 'antd';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

class Step1 extends React.PureComponent {
  render() {
    const props = {

      name: 'file',
      action: '/api/excel/import',
      headers: {
        authorization: 'authorization-text',
      },
      accept: '.xls,.xlsx',
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },

    };

    const { dispatch } = this.props;

    return (
      <div className={styles["step1-content"]}>
          <Upload {...props} >
            <Button>
              <Icon type="upload" /> Excel上传
            </Button>
          </Upload>
      </div>
    );
  }
}

export default Step1;
