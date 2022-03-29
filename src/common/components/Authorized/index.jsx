/**
 * 权限控制组件
 */

import { UserContext } from '../Main';

const Authorized = ({ children, authCode }) => {
  return (
    <UserContext.Consumer>
      {userInfo => (userInfo.powerList.indexOf(authCode) > -1 ? children : '')}
    </UserContext.Consumer>
  );
};

export default Authorized;
