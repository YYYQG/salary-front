import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Table,Layout,Form, Icon, Input, Button,Popconfirm } from 'antd';
import styles from './staffManager.less';
import {connect} from "react-redux";

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

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
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
              message: `${title} is required.`,
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

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.props;
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
          handleSave: this.handleSave,
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
      />
    );
  }
}


export default connect(({ staffManager, loading }) => ({
  staffManager: staffManager,
  getAllStaffs: loading.effects.getAllStaffs,
}))(() => (
  <PageHeaderWrapper>
    <div className={styles["staff-header"]} >
      <Form layout="inline">
        <Form.Item label="员工姓名"  >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="部门" >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit">查询</Button>
        </Form.Item>
      </Form>
    </div>
    <Layout className={styles["staff-table"]}>
      <EditableTable columns={columns} dataSource={dataSource} ></EditableTable>
    </Layout>
  </PageHeaderWrapper>
))


