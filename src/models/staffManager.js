import {getAllStaffs}  from '@/services/staffManager'

const StaffManager={
  namespace:"staffManager",
  state:{

    dataSource:[
      {
        key: '1',
        name: '胡彦斌',
        department: 32,
        sex: '西湖区湖底公园1号',
        depositBank: '西湖区湖底公园1号',
        bankAccount: '西湖区湖底公园1号',
        entryDate: '西湖区湖底公园1号',
        telephone: '西湖区湖底公园1号',
        email: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦斌',
        department: 32,
        sex: '西湖区湖底公园1号',
        depositBank: '西湖区湖底公园1号',
        bankAccount: '西湖区湖底公园1号',
        entryDate: '西湖区湖底公园1号',
        telephone: '西湖区湖底公园1号',
        email: '西湖区湖底公园1号',
      },
    ]

  },
  effects:{
    *getAllStaffs(_, { call, put }) {
      const response = yield call(getAllStaffs);
      yield put({
        type: 'getAllStaffs',
        payload: response,
      });
    },
  },
  reducers:{
    getAllStaffs(state, action) {
      return { ...state, dataSource:action.payload };
    },


  }

}

export default StaffManager
