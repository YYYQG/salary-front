import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Steps,Icon,Button,message,} from 'antd';
import { connect } from 'dva'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import styles from './style.less';

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



class EmailSend extends React.PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
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
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }


}

export default EmailSend
