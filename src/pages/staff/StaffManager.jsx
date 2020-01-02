import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table,Layout,Form, Icon, Input, Button,Spin } from 'antd';
import styles from './staffManager.less';
import { connect } from 'dva'

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.PureComponent  {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              type: 'email',
              message: `请填写${title}。`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className={styles["editable-cell-value-wrap"]}
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class EditableTable extends React.PureComponent  {
  constructor(props) {
    super(props);
  }

  /*handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };*/

  render() {
    const { dataSource,loading } = this.props;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.props.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.props.handleSave,
        }),
      };
    });
    return (
      <Table
        components={components}
        rowClassName={styles["editable-row"]}
        bordered
        dataSource={dataSource}
        columns={columns}
        loading={loading}
      />
    );
  }
}


@connect(({ staffManager,loading })=>(
  {
    staffManager: staffManager,
    loading: loading.effects['staffManager/filterStaffs']
  }
))
@Form.create()
class StaffManager extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {
      isLoading:false
    }

  }

  componentDidMount(){

    const { dispatch } = this.props;
    dispatch({
      type: 'staffManager/getAllStaffs',
    })

  }

  handleSave(row){

    const {dispatch} = this.props;
    dispatch({
      type: 'staffManager/saveStaffEmail',
      payload:row
    })

  }

  filterStaffs = (e)=>{

    e.preventDefault();
    const {form,dispatch} = this.props
    form.validateFields((err,values)=>{
      dispatch({
        type: 'staffManager/filterStaffs',
        payload: values
      })

    })
  }

  render(){

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },
      {
        title: '开户银行',
        dataIndex: 'depositBank',
        key: 'depositBank',
      },
      {
        title: '银行账号',
        dataIndex: 'bankAccount',
        key: 'bankAccount',
      },
      {
        title: '入职时间',
        dataIndex: 'entryDate',
        key: 'entryDate',
      },
      {
        title: '电话',
        dataIndex: 'telephone',
        key: 'telephone',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        editable: true,
      }
    ];
    const {staffManager:{dataSource},form:{getFieldDecorator},loading} = this.props;
    const {isLoading} = this.state

    return (
      <PageHeaderWrapper>
        <div className={styles["staff-header"]} >
          <Form layout="inline" onSubmit={this.filterStaffs}>
            <Form.Item label="员工姓名"  >
              {
                getFieldDecorator('name',{initialValue:""})(
                  <Input placeholder="请输入" />
                )
              }
            </Form.Item>
            <Form.Item label="部门" >
              {
                getFieldDecorator('department',{initialValue:""})(
                  <Input placeholder="请输入" />
                )
              }
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit">查询</Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles["staff-table"]}>
          <EditableTable loading={loading} columns={columns} dataSource={dataSource} handleSave={(row)=>this.handleSave(row)} ></EditableTable>
        </div>
      </PageHeaderWrapper>
    )

  }

}
export default StaffManager;


