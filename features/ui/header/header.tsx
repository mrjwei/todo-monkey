import {useRouter} from 'next/router'
import {
  Layout,
  Menu,
  Dropdown,
  Button
} from 'antd'
import {
  MdArrowDropDown
} from 'react-icons/md'
import {Firebase} from '@/features/firebase'

const {Header: AntHeader} = Layout

interface HeaderPropsInterface {
  username: string
  firebase: Firebase
}

export const Header = ({username, firebase}: HeaderPropsInterface) => {
  const router = useRouter()

  const handleSignOut = () => {
    firebase.signOut()
      .then(() => {
        router.push("/signin")
      })
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Button
          type='text'
          onClick={handleSignOut}
        >Sign Out</Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <AntHeader>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
      >
        <Button
          type='text'
          style={{color: "white"}}
        >
          {username} <MdArrowDropDown />
        </Button>
      </Dropdown>
    </AntHeader>
  )
}

