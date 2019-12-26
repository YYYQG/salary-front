import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Table,Layout,Form, Icon, Input, Button } from 'antd';
import styles from './staffManager.less';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];



export default () => (
  <PageHeaderWrapper>
    <div className={styles["staff-header"]} >
      <Form layout="inline">
        <Form.Item label="员工姓名">
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </div>
    <Layout className={styles["staff-table"]}>
      <Table dataSource={dataSource} columns={columns} bordered ></Table>
    </Layout>
  </PageHeaderWrapper>
);
