module.exports = {
	root: true,
	extends: [
		// 'plugin:@typescript-eslint/recommended',
		'react-app',
		'plugin:prettier/recommended',
	],
	rules: {
		'prettier/prettier': 'error',
		'react/jsx-wrap-multilines': [
			'error',
			{ declaration: false, assignment: false },
		],
	},
	overrides: [
		{
			files: ['**/*.ts?(x)'],
			extends: ['plugin:@typescript-eslint/recommended'],
			rules: {
				'@typescript-eslint/no-unused-vars': [
					'error',
					{
						vars: 'all',
						args: 'none',
						ignoreRestSiblings: true,
					},
				],
				'@typescript-eslint/no-unused-expressions': 2,
			},
		},
	],
};
