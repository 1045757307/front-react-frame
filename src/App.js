import React, { useEffect } from 'react';
import { Spin, Empty } from 'antd';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import axios from '@common';

function App() {
  useEffect(() => {
    axios
      .request({
        url: '/api/user/current-user',
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  });
  return (
    <div>
      <Spin></Spin>
      主页
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="暂无数据"
        style={{ color: '#ccc' }}
      />
      <div style={{ flex: '1', cursor: 'pointer', height: '100px' }}>
        <AgGridReact
          rowData={null}
          suppressContextMenu={true}
          singleClickEdit={true}
          stopEditingWhenCellsLoseFocus={true}
          rowSelection="single"
          sideBar={undefined}
          noRowsOverlayComponentParams={{
            message: '暂无相关数据',
          }}
        >
          <AgGridColumn key="1" headerName="字典KEY" field="itemTypeCode" />
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
