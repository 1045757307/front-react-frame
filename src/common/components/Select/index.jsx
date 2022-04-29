import React, {
	useState,
	useImperativeHandle,
	forwardRef,
	useEffect,
} from 'react';
import { Select, Spin, Empty } from 'antd';
import axios from '../../utils/request';

const { Option } = Select;

/** props
 * zlurl: string;
	zlkey: any;
	zlvalue?: string;
	zllabel?: string;
	zlRef?: any;
*/
const ZlDictSelect = forwardRef((props, ref) => {
	const { ...resProps } = props;
	const [dictList, setDictList] = useState([]);
	const [isEmptyData, setIsEmptyData] = useState(false);

	useEffect(() => {
		if (!!resProps.value && dictList.length === 0) {
			req();
		}
	}, [resProps.value]);

	useImperativeHandle(ref, () => {
		return {
			getItem(
				key, // 要查询匹配的key
				value, // 匹配的值
			) {
				return dictList.find(dict => dict[key] === value);
			},
			async setItem(setVal) {
				let tempList = dictList;
				if (!tempList || tempList.length === 0) {
					tempList = await req();
				}
				if (tempList && tempList.length) {
					const { zlvalue } = resProps;
					setVal(tempList[0][zlvalue || 'itemvalue']);
				}
			},
			// itemVal为要查询的itemvalue值
			getCurrentItem(itemVal) {
				const { zlvalue } = resProps;
				return dictList.find(dict => {
					const val = zlvalue ? dict[zlvalue] : dict.itemvalue;
					return val === itemVal;
				});
			},
			async getList() {
				if (!dictList || dictList.length === 0) {
					const list = await req();
					return list || [];
				}
				return dictList || [];
			},
			clearOptions() {
				zlClearOptions();
			},
		};
	});
	const req = () =>
		axios
			.request({
				url: resProps.zlurl,
				data: resProps.zlkey,
				extra: {
					isLimit: false,
				},
			})
			.then(data => {
				const itemsObj = data;

				setDictList &&
					setDictList(() => {
						let newObj = [];
						newObj = newObj.concat(itemsObj);
						return newObj;
					});

				if (itemsObj && itemsObj.length === 0) {
					setIsEmptyData(true);
					zlClearOptions();
				}
				return itemsObj;
			})
			.catch(err => {
				console.log(err);
			});

	const openDropDown = open => {
		if (open && dictList.length === 0) {
			req();
		}
	};
	const zlClearOptions = () => {
		// 清空选择的值 并且清空下拉列表
		setDictList([]);
	};
	return (
		<Select
			placeholder="请选择"
			allowClear={true}
			notFoundContent={
				isEmptyData ? (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />
				) : (
					<Spin />
				)
			}
			onDropdownVisibleChange={openDropDown}
			{...resProps}
		>
			{dictList.map((item, index) => {
				const { zlvalue, zllabel } = resProps;
				const value = zlvalue ? item[zlvalue] : item.itemvalue;
				const label = zllabel ? item[zllabel] : item.itemlabel;
				return (
					<Option value={value} label={label} key={index}>
						{label}
					</Option>
				);
			})}
		</Select>
	);
});

export default ZlDictSelect;

// export interface IRefSelect {
// 	getItem: (key: string, value: string | number) => any;
// 	getCurrentItem: (val: string | number) => any;
// 	getList: () => any[];
// 	clearOptions: () => void;
// }
