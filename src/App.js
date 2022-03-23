import { Spin, Empty } from 'antd';

function App() {
  return (
    <div>
      <Spin></Spin>
      主页
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="暂无数据"
        style={{ color: '#ccc' }}
      />
    </div>
  );
}

export default App;
