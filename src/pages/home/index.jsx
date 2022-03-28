import { AgGridColumn, AgGridReact } from 'ag-grid-react';

function Home() {
  return (
    <div>
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

export default Home;
