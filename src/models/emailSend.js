import { message } from 'antd';
import {sendEmail,getAllEmailInformation}  from '@/services/emailSend'

const emailSend = {
  namespace:"emailSend",

  state:{
    dataSource: [],
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
      //const response = yield call
      yield put({
        type:"changeEmailInfo",
        payload:payload
      })
      message.success("保存成功！")
    },
    *getAllEmailInformation(_,{call,put}){
      const response = yield call(getAllEmailInformation)
      if(response.status==200){

        response.data=response.data.map(item=>({
          key: item.staffId,
          ...item
        }))
        yield put({
          type:"changeEmailInfo",
          payload:response.data
        });
      }
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
