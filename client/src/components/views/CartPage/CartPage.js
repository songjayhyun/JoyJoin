import React from 'react'
import { Table, Tag, Space, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
const { Column, ColumnGroup } = Table;

function CartPage() {

    const data = [
        {
          key: '1',
          Name: '이동휘',
          age: 32,
          address: '짐캐리입니다',
          tags: ['ESFJ'],
        },
        {
          key: '2',
          Name: '공유',
          age: 42,
          address: 'im share ',
          tags: ['IStp'],
        },
      ];
    
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
        <h1>친구 신청 목록</h1>
        <Table dataSource={data}>
            <Column title="이름" dataIndex="Name" key="Name" />
            <Column title="나이" dataIndex="age" key="age" />
            <Column title="자기소개" dataIndex="address" key="address" />
            <Column
            title="MBTI"
            dataIndex="tags"
            key="tags"
            render={tags => (
                <>
                {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                    {tag}
                    </Tag>
                ))}
                </>
            )}
            />
            <Column
            title="Action"
            key="action"
            render={(text, record) => (
                <span>
                <Button type="primary" size="small" shape="round" icon={<DownloadOutlined />}>
          수락
        </Button>
        <br />
        <br />

        <Button type="primary" size="small" shape="round" icon={<DownloadOutlined />}>
          거절
        </Button>
                </span>
            )}
            />
            </Table>,
        </div>
    )
}

export default CartPage
