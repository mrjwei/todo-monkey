import React from 'react'
import {
  Layout,
  Menu
} from 'antd'
import {
  MdInbox,
  MdToday,
  MdUpcoming
} from 'react-icons/md'
import {Header} from '@/features/ui'
import {Firebase} from '@/features/firebase'

const {Sider, Content} = Layout

interface AuthenticatedLayoutPropsInterface {
  username: string
  firebase: Firebase
  children: React.ReactNode | React.ReactNode[]
}

export const AuthenticatedLayout = ({username, firebase, children}: AuthenticatedLayoutPropsInterface) => {
  return (
    <Layout>
      <Sider>
        <Menu
          theme='dark'
          defaultSelectedKeys={["today"]}
        >
          <Menu.Item
            key="inbox"
            icon={<MdInbox/>}
          >
            Inbox
          </Menu.Item>
          <Menu.Item
            key="inbox"
            icon={<MdToday/>}
          >
            Today
          </Menu.Item>
          <Menu.Item
            key="inbox"
            icon={<MdUpcoming/>}
          >
            Upcoming
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          username={username}
          firebase={firebase}
        />
        <Content>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

