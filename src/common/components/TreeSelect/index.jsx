import React, { useEffect, useState } from 'react';
import { TreeSelect, Spin } from 'antd';
import axios from '../../utils/request';

/**
 * props
	zlurl?: string;
	zldata?: unknown; // ajax data参数
	isDefaultReq?: boolean; // 是否默认请求
 *
*/
const ZlTreeSelect = props => {
	const { isDefaultReq, ...resProps } = props;

	const [treeData, setTreeData] = useState([]);

	const tProps = {
		treeData,
		placeholder: '请选择',
		showSearch: true,
		treeNodeFilterProp: 'title',
		style: {
			width: '100%',
		},
		...resProps,
	};

	useEffect(() => {
		if (!!isDefaultReq && treeData.length === 0) {
			req();
		}
	}, [isDefaultReq]);

	const openDropDown = value => {
		if (value && treeData.length === 0) {
			req();
		}
	};

	const req = () => {
		axios
			.request({
				url: resProps.zlurl,
				data: resProps.zldata,
			})
			.then(data => {
				let treeDataList = data;
				setTreeData(treeDataList);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<TreeSelect
			dropdownMatchSelectWidth={100}
			allowClear={true}
			notFoundContent={<Spin />}
			fieldNames={{ value: 'key' }}
			onDropdownVisibleChange={openDropDown}
			{...tProps}
		/>
	);
};

export default ZlTreeSelect;
