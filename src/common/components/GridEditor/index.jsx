import { Spin, Empty } from 'antd';
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';

// grid自定义组件 无数据组件
export const CustomNoRowsOverlay = props => {
  const { message, isError } = props;
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={message ? message : isError ? '获取失败!' : '暂无数据'}
      style={{ color: isError ? '#ff4d4f' : '#ccc' }}
    />
  );
};

// grid自定义组件 固定列cellRender组件
export const CustomPinnedRowRenderer = ({ value }) => {
  return (
    <span style={{ fontSize: '14px', fontWeight: 800, color: '#222' }}>
      {value}
    </span>
  );
};

// grid自定义组件 loading组件
export const CustomLoadingOverlay = () => {
  return <Spin></Spin>;
};

// grid自定义组件 操作列渲染组件
export const OperatorCellRender = props => {
  const handClick = () => {
    props.onClick({
      api: props.api,
      columnApi: props.columnApi,
      data: props.data,
      node: props.data,
      rowIndex: props.rowIndex,
    });
  };
  return props.isSpin ? (
    <span></span>
  ) : props.add ? (
    <PlusSquareOutlined
      onClick={handClick}
      style={{ color: 'green', fontSize: 18 }}
    />
  ) : (
    <DeleteOutlined
      onClick={handClick}
      style={{ color: 'red', fontSize: 18 }}
    />
  );
};
