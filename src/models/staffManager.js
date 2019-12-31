import {getAllStaffs,saveStaffEmail}  from '@/services/staffManager'

const StaffManager={
  namespace:"staffManager",

  state:{
    dataSource: [],
  },

  effects:{
    *getAllStaffs(_, { call, put }) {
      const response = yield call(getAllStaffs);
      if(response.status==200){
        yield put({
          type: 'saveAllStaffs',
          payload: response.data,
        });
      }
    },
    *saveStaffEmail({ payload },{ call, put }){
      const response = yield call(saveStaffEmail,payload);
      if(response.status==200){
        yield put({
          type: 'changeStaffEmail',
          payload: payload,
        });
      }
    },
    *filterStaffs({ payload },{ call, put }){
      const response = yield call(getAllStaffs);
      if(response.status==200){
        let dataSource = response.data;
        debugger
        if(payload.name!=""){
          dataSource =  dataSource.filter((item)=>item.name==payload.name)
        }
        if(payload.department!=""){
          dataSource =  dataSource.filter((item)=>item.department==payload.department)
        }
        yield put({
          type: 'saveAllStaffs',
          payload: dataSource,
        });
      }

    }
  },
  reducers:{
    saveAllStaffs(state, action) {
      return {
        ...state,
        dataSource: action.payload,
      };
    },
    changeStaffEmail(state, action){
      const newData = [...state.dataSource];
      const index = newData.findIndex(item => action.payload.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...action.payload,
      });
      return {
        ...state,
        dataSource: newData,
      }

    }
  }

};

export default StaffManager
