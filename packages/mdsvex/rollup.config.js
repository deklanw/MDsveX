import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import sucrase from '@rollup/plugin-sucrase';
import dts from 'rollup-plugin-dts';

import pkg from './package.json';

export default [
	{
		plugins: [
			resolve({ preferBuiltins: true }),
			commonjs({ namedExports: { 'svelte/compiler': ['parse'] } }),
			json(),
			sucrase({ transforms: ['typescript'] }),
		],
		input: 'src/main.ts',
		external: ['svelte/compiler'],
		output: [
			{ file: pkg.module, format: 'es', sourcemap: false },
			{ file: pkg.main, format: 'cjs', sourcemap: false },
		],
	},
	{
		plugins: [dts()],
		input: 'src/main.ts',

		output: [
			{ file: 'dist/main.es.d.ts', format: 'es' },
			{ file: 'dist/main.cjs.d.ts', format: 'cjs' },
		],
	},
	{
		plugins: [
			resolve({ browser: true }),
			commonjs({ namedExports: { 'svelte/compiler': ['parse'] } }),
			json(),
			sucrase({ transforms: ['typescript'] }),
			globals(),
			builtins(),
		],
		input: 'src/main.ts',
		output: [
			{
				file: 'dist/mdsvex.js',
				name: 'mdsvex',
				format: 'umd',
				sourcemap: false,
			},
		],
	},
];
