import React from "react";
import {Form, Input, InputNumber, Popconfirm, Table} from "antd";
import styles from "./style.less";
import _ from 'lodash'

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    let rules;
    if(dataIndex==='email'){
      rules = [
        {
          required: true,
          type: 'email',
          message: `${title}格式不正确!`,
        },
      ]
    }else {
      rules = [
       /* {
          required: true,
          message: `请输入${title}!`,
        },*/
      ]
    }
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: rules,
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

@Form.create()
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editingKey: '' };
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'staffName',
        editable: true,
        fixed: 'left',
        width: 120,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        editable: true,
      },
      {
        title: '基本工资',
        dataIndex: 'baseSalary',
        editable: true,
        width: 120,
      },
      {
        title: '岗位工资',
        dataIndex: 'postSalary',
        editable: true,
        width: 120,
      },
      {
        title: '工龄工资',
        dataIndex: 'senioritySalary',
        editable: true,
        width: 120,
      },
      {
        title: '绩效、奖金',
        dataIndex: 'performanceAndBonus',
        editable: true,
        width: 120,
      },
      {
        title: '餐费补贴',
        dataIndex: 'mealAllowance',
        editable: true,
        width: 120,
      },
      {
        title: '其它扣除',
        dataIndex: 'otherDeduction',
        editable: true,
        width: 120,
      },
      {
        title: '工资总额',
        dataIndex: 'totalSalary',
        editable: true,
        width: 120,
      },
      {
        title: '社保个人',
        dataIndex: 'individualSocialSecurity',
        editable: true,
        width: 120,
      },
      {
        title: '公积金个人',
        dataIndex: 'individualProvidentFund',
        editable: true,
        width: 120,
      },
      {
        title: '应扣所得税',
        dataIndex: 'individualIncomeTax',
        editable: true,
        width: 120,
      },
      {
        title: '实际应付工资',
        dataIndex: 'takeHomeSalary',
        editable: true,
        width: 120,
      },
      {
        title: '操作',
        width: '100px',
        fixed: 'right',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    保存
                  </a>
                )}
              </EditableContext.Consumer>
              <a
                onClick={() => this.cancel(record.key)}
                style={{ marginRight: 8 }}
              >
                    取消
              </a>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              编辑
            </a>
          );
        },
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.props.dataSource];
      const handleSave = this.props.handleSave;
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({editingKey: '' });
        handleSave(newData)
      } else {
        newData.push(row);
        this.setState({editingKey: '' });
        handleSave(newData)
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'name'||col.dataIndex === 'email' ? 'text' : 'number',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.props.dataSource}
          columns={columns}
          rowClassName={styles["editable-row"]}
          pagination={{
            onChange: this.cancel,
          }}
          scroll={{ x: 1650 }}
          loading={this.props.loading}
        />
      </EditableContext.Provider>
    );
  }
}
export default EditableTable;
