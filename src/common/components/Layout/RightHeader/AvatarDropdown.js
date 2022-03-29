import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { setCookie } from '../../../utils/util';
import { UserContext } from '../../Main';
import HeaderDropdown from './HeaderDropdown';
import avatar from '../../../assets/imgs/avatar.png';

const AvatarDropdown = props => {
  const navigate = useNavigate();

  const onMenuClick = ({ key }) => {
    if (key === 'logout') {
      // 退出登录
      setCookie('token', '');
      window.location.href = '/login';
      return;
    }
    // 去个人中心 目前先不用
    if (key === 'ownAuth') {
      navigate('');
    }
  };

  const { menu } = props;
  const menuHeaderDropdown = (
    <Menu
      className="zl-header-avatar-menu"
      selectedKeys={[]}
      onClick={onMenuClick}
    >
      {menu && (
        <Menu.Item key="ownAuth">
          <SettingOutlined />
          个人中心
        </Menu.Item>
      )}

      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <UserContext.Consumer>
      {userInfo =>
        userInfo.jobNumber ? (
          <HeaderDropdown overlay={menuHeaderDropdown}>
            <span className="zl-avatar-wrapper">
              <Avatar
                size="small"
                className="avatar"
                src={userInfo.avatar ? userInfo.avatar : avatar}
                alt="avatar"
              />
              <span className="name anticon">{userInfo.userName}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <span className="action account">
            <Spin
              size="small"
              style={{
                marginLeft: 8,
                marginRight: 8,
              }}
            />
          </span>
        )
      }
    </UserContext.Consumer>
  );
};
export default AvatarDropdown;
