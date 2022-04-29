import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Pagination } from 'antd';
import './index.less';

const ZlPagination = forwardRef((props, ref) => {
	const { ...resProps } = props;
	const [pagination, setPagination] = useState({
		pageSize: 100,
		pageNum: 1,
		total: 0,
	});

	useImperativeHandle(ref, () => {
		return {
			setPaginationValue(pageNum, pageSize, total) {
				setPagination({
					pageNum,
					pageSize,
					total,
				});
			},
			getPaginationVlaue() {
				return pagination;
			},
		};
	});

	const pageChange = (pageNum, pageSize) => {
		setPagination(pagination => {
			const newPagination = Object.assign({}, pagination);
			newPagination.pageNum = pageNum;
			newPagination.pageSize = pageSize;
			return newPagination;
		});

		resProps.onChangeZl(pageNum, pageSize);
	};

	return (
		<div className="zl-pagination-wrapper">
			<Pagination
				showQuickJumper
				showSizeChanger
				pageSizeOptions={['100', '200', '500', '1000', '2000']}
				total={pagination.total}
				defaultPageSize={pagination.pageSize}
				current={pagination.pageNum}
				pageSize={pagination.pageSize}
				showTotal={total => `共 ${total} 条`}
				onChange={pageChange}
				{...resProps}
			/>
		</div>
	);
});

export default ZlPagination;
