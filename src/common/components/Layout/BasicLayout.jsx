/**
 * 项目主框架，菜单路由
 */
import React, { useState, useEffect, lazy } from 'react';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { message } from 'antd';
import {
  Link,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { parse, stringify } from 'querystringify';
import { AliveScope, useAliveController, KeepAlive } from 'react-activation';
import RightHeader from './RightHeader';
import axios from '../../utils/request';
import { iconfontUrl } from '../../utils/config';

// 把menu数据处理为统一格式，此步骤存在的目的是为了统一不同接口中返回字段不一致的问题，此后所用的所有数据都基于此步骤之后
const menuDataRender = menuList =>
  menuList.map(item => {
    return {
      aid: item.aid,
      resCode: item.resCode,
      resMatchShow: item.resMatchShow,
      icon: item.resIcon,
      name: item.resName,
      path: item.resPath,
      hideInMenu: !!!item.resStatus,
      children: item.child ? menuDataRender(item.child) : undefined,
    };
  });

// 获取左侧栏menu数据
const menuDataFilter = menuList =>
  menuList.map(item => {
    let isHide = item.hideInMenu;
    if (item.path && item.path.indexOf('hideMenuShowRoute=true') > -1) {
      isHide = true;
    }
    const localItem = {
      aid: item.aid,
      resCode: item.resCode,
      resMatchShow: item.resMatchShow,
      icon: item.icon,
      name: item.name,
      path: item.path,
      hideInMenu: isHide,
      children: item.children ? menuDataFilter(item.children) : undefined,
    };
    return localItem;
  });

// 获取左侧栏route
const routeList = [];
const routeRender = (menuList, isCache) => {
  menuList.forEach(({ path, children, resCode }) => {
    if (path && (!children || !children.length)) {
      let rePath = path;
      const num = path.indexOf('?');
      if (path && num > -1) {
        const paramObj = parse(path.substring(num));
        if (paramObj.hideMenuShowRoute) {
          delete paramObj.hideMenuShowRoute;
          rePath = path.substring(0, num) + stringify(paramObj, true);
        }
      }
      // const RouterElement = dynamicImport(rePath, isCache);
      let loadPath = rePath;
      // 处理类似/order/detail/:id
      if (rePath.indexOf('/:') > -1) {
        loadPath = rePath.replace(/\/:[^/]+/g, '');
      }
      // import路径一定要指定特定目录下，
      // 此处`@pages/${loadPath.slice(1)}`不能写成`@pages${loadPath}`
      // webpack动态import打包机制有关
      const Component = lazy(() => import(`@pages/${loadPath.slice(1)}`));
      let RouterElement = <Component />;
      if (isCache) {
        RouterElement = (
          <KeepAlive name={rePath}>
            <Component />
          </KeepAlive>
        );
      }

      routeList.push(
        <Route key={resCode} path={rePath} element={RouterElement}></Route>,
      );
    }
    if (children && children.length) routeRender(children, isCache);
  });
};

// 当前tab
let currentTabsItem = {};

// 记录页面刷新时浏览器上一个地址
let prePathname = '';

const BasicLayout = props => {
  const { collapsed = false, topPanesVisible = false, showBreadcrumb } = props;
  const [siteCount, setSiteCount] = useState(0);
  const [menuData, setMenuData] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [panes, setPanes] = useState([]);
  const [activeKey, setActiveKey] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, search } = location;
  const history = createBrowserHistory();
  const { drop } = useAliveController();

  //监听浏览器地址变化
  history.listen(({ location: { pathname }, action }) => {
    if (topPanesVisible) {
      //浏览器前进，后退地址，选中的tabs改变
      if (prePathname !== pathname && action === 'POP') {
        setActiveKey(pathname);
      }
      prePathname = pathname;
    }
  });

  useEffect(() => {
    setMenuData([]);
    setLoading(true);
    axios
      .request({
        url: '/api/resource/user-menu',
      })
      .then(data => {
        if (data) {
          const mlist = menuDataRender(data);
          routeRender(mlist, topPanesVisible);
          setRouteData(routeList);
          setMenuData(menuDataFilter(mlist)); // 菜单数据
          //获取头部tabs的详情
          if (topPanesVisible) {
            data.forEach(firstMenu => {
              currentTabsItem = (firstMenu.child || []).find(
                o => o.resPath === pathname,
              );
              if (
                !(pathname === '/' || pathname === '/home') &&
                currentTabsItem
              ) {
                setActiveKey(pathname);
                setPanes([{ tab: currentTabsItem.resName, key: pathname }]);
              }
            });
          }
        }
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          if (pathname === '/') {
            navigate(`/home${search}`, { replace: true });
          } else {
            navigate(`${pathname}${search}`);
          }
        }, 0);
      });
  }, []);

  //点击左侧菜单
  const handLeftMenuClick = (e, item) => {
    if (topPanesVisible) {
      const repeatMenu = panes.find(o => o.key === item.itemPath);
      if (repeatMenu) return setActiveKey(item.itemPath);
      if (panes.length > 4) {
        message.info(
          '您当前打开了太多的页面，如果继续打开，会造成程序运行缓慢，无法流畅操作！',
        );
        e.preventDefault();
        return;
      }
      panes.push({
        tab: item.name,
        key: item.itemPath,
      });
      setActiveKey(item.itemPath);
      setPanes(panes.concat());
    }
    if (process.env.REACT_APP_CURRENT_APPNAME === 'mc') {
      setSiteCount(siteCount + 1);
    }
  };
  const handEdit = (targetKey, action) => {
    if (action === 'remove') handTabRemove(targetKey); //删除
  };

  // 删除头部tab;
  const handTabRemove = targetKey => {
    if (panes.length === 1) {
      //删除的是最后一个，回归到/home页
      setActiveKey('');
      setPanes([]);
      navigate(`/home`);
      return;
    }
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes);
    drop(targetKey); //删除缓存中的tab数据
    handTabChange(newActiveKey);
  };

  // 头部tab切换;
  const handTabChange = key => {
    setActiveKey(key);
    navigate(`${key}${search}`);
  };

  const WrapperTag = topPanesVisible ? AliveScope : React.Fragment;
  return (
    <WrapperTag>
      <ProLayout
        logo=""
        title="前端公共框架"
        fixSiderbar={true}
        contentWidth="Fluid"
        fixedHeader={false}
        defaultCollapsed={collapsed}
        breakpoint={collapsed ? false : undefined}
        iconfontUrl={iconfontUrl}
        menu={{
          loading,
        }}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return <span>{defaultDom}</span>;
          }
          return (
            <Link
              to={menuItemProps.path}
              onClick={e => handLeftMenuClick(e, menuItemProps)}
            >
              {defaultDom}
            </Link>
          );
        }}
        subMenuItemRender={(_, dom) => {
          return <div id={_.path ? _.path.substring(1) + 'Id' : ''}>{dom}</div>;
        }}
        breadcrumbRender={routeData => {
          routeData?.splice(0, 0, {
            path: '/home',
            breadcrumbName: '首页',
          });
          return routeData;
        }}
        footerRender={false}
        menuDataRender={() => menuData}
        headerContentRender={() => (
          // 这里放置一些头部信息
          <a href="" target="_blank" rel="noopener noreferrer">
            当前模块
          </a>
        )}
        rightContentRender={() => <RightHeader siteCount={siteCount} />}
      >
        <PageContainer
          header={Object.assign(
            {
              title: '',
            },
            showBreadcrumb
              ? undefined
              : {
                  breadcrumb: {},
                },
          )}
          tabList={topPanesVisible ? panes : []}
          tabActiveKey={activeKey}
          tabProps={{
            type: 'editable-card',
            hideAdd: true,
            onEdit: handEdit,
          }}
          onTabChange={handTabChange}
        >
          <Routes>{routeData}</Routes>
        </PageContainer>
      </ProLayout>
    </WrapperTag>
  );
};
export default BasicLayout;
