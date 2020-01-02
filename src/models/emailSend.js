import { message } from 'antd';
import {sendEmail}  from '@/services/emailSend'

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
    },
      {
        key: 2,
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
      }
    ],
    //status 0 未发送 1 正在发送 2 已发送完成 3 发送失败
    sendStatuses: [
      {
        key: 1,
        status: 0,
      }
    ]
  },

  effects:{
    *saveEmailInfo({payload},{call,put}){
      yield put({
        type:"changeEmailInfo",
        payload:payload
      })
      message.success("保存成功！")
    },
    *sendEmail({payload},{call,put}){
      yield put({
        type:"changeEmailSendStatus",
        payload:{
          key: payload.key,
          status: 1,
        },
      });
      const response = yield call(sendEmail,payload)
      debugger
      if(response.status==200){
        yield put({
          type:"changeEmailSendStatus",
          payload:{
            key: payload.key,
            status: 2,
          }
        });
      }else {
        yield put({
          type:"changeEmailSendStatus",
          payload:{
            key: payload.key,
            status: 3,
          }
        });
      }
    }

  },
  reducers:{
    changeEmailInfo(state, action){
      return {...state,dataSource:action.payload}
    },
    changeEmailSendStatus(state, action){

      let sendStatuses = [...state.sendStatuses];
      const index = sendStatuses.findIndex(item=> action.payload.key === item.key );
      if(index!==-1){
        const item = sendStatuses[index];
        sendStatuses.splice(index, 1, {
          ...item,
          ...action.payload,
        });
      }else {
        sendStatuses.push(action.payload)
      }
      return {
        ...state,
        sendStatuses:sendStatuses,
      }


    }
  }

};

export default emailSend
