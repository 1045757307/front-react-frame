import axios from './utils/request';
import ZlMain, { UserContext } from './components/Main';
import ZlPagination from './components/Pagination';
import Authorized from './components/Authorized';
import ZlDictSelect from './components/Select';
import ZlTreeSelect from './components/TreeSelect';
import './index.less';
export * from './utils/util';
export * from './utils/config';
export * from './components/GridEditor';

export {
  ZlMain,
  UserContext,
  ZlPagination,
  Authorized,
  ZlDictSelect,
  ZlTreeSelect,
};

export default axios;
