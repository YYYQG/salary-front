export default {
  'GET /api/staffs':{
    status:200,
    message:"",
    data:[
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
  'PUT /api/staff/1':{
    status:200,
    message:'',
    data:'',

  },
  'POST /api/email/send': (req, res) => {

    setTimeout(() => {
      res.send({
        status:200,
        message:null,
        data:null,
      });
    }, 1000);

  },
};
