import { message } from 'antd';

const emailSend = {
  namespace:"emailSend",

  state:{
    dataSource: [{
      key: 1,
      name: '小时代',
      base_salary: 2000,
      post_salary: 500,
      seniority_salary: 200,
      performance_and_bonus: 0,
      meal_allowance: 300,
      other_deduction: 100,
      total_salary: 5000,
      individual_social_security: 200,
      individual_provident_fund: 300,
      individual_income_tax: 20,
      take_home_salary:10,
    }],
    //status 0 未发送 1 正在发送 2 已发送完成 3 发送失败
    sendStatuses: [
      {
        key: 1,
        status: 2,
      }
    ]
  },

  effects:{
    *saveEmailInfo({payload},{call,put}){
      yield put({
        type:"changeEmailInfo",
        payload:payload
      })
      message.info("保存成功！")
    },
    *saveEmailSendStatus({payload},{call,put}){
      yield put({
        type:"changeEmailInfo",
        payload:payload
      })

    }

  },
  reducers:{
    changeEmailInfo(state, action){
      return {...state,dataSource:action.payload}
    },
    changeEmailSendStatus(state, action){



      return {
        ...state,

      }


    }
  }

};

export default emailSend
