/**
 * 项目主路由
 */
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import axios from '@common';

export const UserContext = React.createContext({});

const ZlMain = props => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    topPanesVisible = false,
    showBreadcrumb = false,
    collapsed = false,
  } = props;

  useEffect(() => {
    setLoading(true);
    // 进入项目后默认首先通过接口请求用户信息，此接口返回用户是否登录
    // 这里我们用mock模拟来实现
    axios
      .request({
        url: '/api/user/current-user',
      })
      .then(data => {
        setUserInfo(data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const Login = lazy(() => import('@pages/login'));
  const BasicLayout = lazy(() => import('../Layout/BasicLayout'));

  return (
    <BrowserRouter>
      {/* react-router 6后Switch改为Routes */}
      <Routes>
        {/* react-router 6后component改为element，且内容改为组件而非函数 */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<Spin />}>
              <Login />
            </Suspense>
          }
        />
        {/* 确认获取用户信息以后才可以加载主框架路由 */}
        {loading ? (
          <Route path="*" element={<PageLoading />}></Route>
        ) : !!userInfo.jobNumber ? (
          <Route
            path="*"
            element={
              <Suspense fallback={<Spin />}>
                <UserContext.Provider value={userInfo}>
                  <BasicLayout
                    topPanesVisible={topPanesVisible}
                    showBreadcrumb={showBreadcrumb}
                    collapsed={collapsed}
                  />
                </UserContext.Provider>
              </Suspense>
            }
          ></Route>
        ) : (
          ''
        )}
      </Routes>
    </BrowserRouter>
  );
};
export default ZlMain;
