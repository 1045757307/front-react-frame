import { TranslationOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import HeaderDropdown from './HeaderDropdown';
import { setCookie, getLanguage } from '../../../utils/util';

const LangDropdown = () => {
	// 切换语言
	const onMenuClick = ({ key }) => {
		setLocal(key);
	};
	const setLocal = lang => {
		// 国际化
		if (window.location.search && window.location.search.length) {
			const local = getLanguage();
			if (local) {
				window.location.href = window.location.href.replace(
					new RegExp('(&)?local=([^&]*)(&|$)', 'i'),
					`local=${lang}`,
				);
			} else {
				window.location.href = `${window.location.href}&local=${lang}`;
			}
		} else {
			window.location.href = `${window.location.href}?local=${lang}`;
		}
		setCookie('lang', lang);
	};
	const menuHeaderDropdown = (
		<Menu
			className="zl-header-avatar-menu"
			selectedKeys={[]}
			onClick={onMenuClick}
		>
			<Menu.Item key="cn">cn简体中文</Menu.Item>
			<Menu.Item key="de">deDeutsch</Menu.Item>
			<Menu.Item key="en">enEnglish</Menu.Item>
		</Menu>
	);

	return (
		<HeaderDropdown className="zl-help-wrapper" overlay={menuHeaderDropdown}>
			<TranslationOutlined style={{ fontSize: '18px', color: 'inherit' }} />
		</HeaderDropdown>
	);
};
export default LangDropdown;
