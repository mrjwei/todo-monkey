import {
  Layout
} from 'antd'

const {Content} = Layout

export const NotAuthenticatedLayout = ({children}: {children: React.ReactNode | React.ReactNode[]}) => {
  return (
    <Layout>
      <Content>
        {children}
      </Content>
    </Layout>
  )
}

