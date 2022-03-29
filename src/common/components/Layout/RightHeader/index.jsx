import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Avatar from './AvatarDropdown';
import SelectLang from './LangDropdown';
import './index.less';

const RightContent = () => {
  return (
    <div className="zl-right-cont">
      <Tooltip title="使用文档">
        <a
          className="zl-help-wrapper"
          style={{ color: 'inherit' }}
          target="_blank"
          href=""
          rel="noopener noreferrer"
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>

      <Avatar
        currentUser={{
          avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          name: 'ziel',
        }}
        menu={true}
      />

      <SelectLang />
    </div>
  );
};
export default RightContent;
