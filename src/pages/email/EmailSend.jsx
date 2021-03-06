import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Steps,Icon,Button,message,} from 'antd';
import { connect } from 'dva'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import styles from './style.less';
import _ from 'lodash'

const { Step } = Steps

const EmailIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1591681_mlickyuwh0j.js',
});

const steps = [
  {
    title: 'Excel上传',
    content: <Step1></Step1>,
    icon: <Icon type='file-excel'/>,
  },
  {
    title: '信息确认',
    content: <Step2/>,
    icon: <Icon type='form'/>,
  },
  {
    title: '邮件发送',
    content: <Step3/>,
    icon: <EmailIcon type="icon-14" />
  },
];


@connect(({ emailSend }) => ({
  emailSend: emailSend,
  fileList:emailSend.fileList
}))
class EmailSend extends React.PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const fileList = this.props.fileList;
    debugger
    if(fileList.length==0){
      message.info("请先上传excel!")
      return
    }
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  sendAll(){

    const {emailSend:{dataSource,sendStatuses},dispatch} = this.props;
    dataSource.forEach((item,index)=>{
      const status = sendStatuses.find(it=>it.key===item.key)
      if(_.isEmpty(status)||status.status===0){
        dispatch({
          type:"emailSend/sendEmail",
          payload:item
        })
      }
    })

  }

  render() {

    const { current } = this.state;
    return (
      <PageHeaderWrapper>
        <div className={styles["email-send-upload"]}>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} icon={item.icon} />
            ))}
          </Steps>
          <div>{steps[current].content}</div>
          <div className={styles.button}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                下一步
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => this.sendAll()}>
                发送
              </Button>
            )}
            {current > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                上一步
              </Button>
            )}
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }


}

export default EmailSend
