import path from 'path';

export default {
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	test: {
		coverage: {
			include: ['**/src/core/**/*.ts'],
			exclude: ['**/shared/**', '**/**/**/*.test.ts', '**/**/**/index.ts']
		}
	}
};
