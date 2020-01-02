import React from "react";
import {Form, Input, InputNumber, Popconfirm, Table} from "antd";
import styles from "./style.less";

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
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,

                  message: `请输入${title}!`,
                },
              ],
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
        dataIndex: 'name',
        editable: true,
      },
      {
        title: '基本工资',
        dataIndex: 'base_salary',
        editable: true,
      },
      {
        title: '岗位工资',
        dataIndex: 'post_salary',
        editable: true,
      },
      {
        title: '工龄工资',
        dataIndex: 'seniority_salary',
        editable: true,
      },
      {
        title: '绩效、奖金',
        dataIndex: 'performance_and_bonus',
        editable: true,
      },
      {
        title: '餐费补贴',
        dataIndex: 'meal_allowance',
        editable: true,
      },
      {
        title: '其它扣除',
        dataIndex: 'other_deduction',
        editable: true,
      },
      {
        title: '工资总额',
        dataIndex: 'total_salary',
        editable: true,
      },
      {
        title: '社保个人',
        dataIndex: 'individual_social_security',
        editable: true,
      },
      {
        title: '公积金个人',
        dataIndex: 'individual_provident_fund',
        editable: true,
      },
      {
        title: '应扣所得税',
        dataIndex: 'individual_income_tax',
        editable: true,
      },
      {
        title: '实际应付工资',
        dataIndex: 'take_home_salary',
        editable: true,
      },
      {
        title: '操作',
        width: '100px',
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
          inputType: col.dataIndex === 'name' ? 'text' : 'number',
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
        />
      </EditableContext.Provider>
    );
  }
}
export default EditableTable;
