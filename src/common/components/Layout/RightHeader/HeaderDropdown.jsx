import { Dropdown } from 'antd';
import classNames from 'classnames';

const HeaderDropdown = ({ overlayClassName: cls, ...restProps }) => {
  return (
    <Dropdown
      overlayClassName={classNames('zl-header-dropdown-wrapper', cls)}
      {...restProps}
    />
  );
};
export default HeaderDropdown;
