import { extname } from 'path';
import glob from 'glob';
import globBase from 'glob-base';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { dependencies } from './package.json';

export default glob.sync('./src/*.{js,jsx}').map((input) => {
  const { glob: fileName } = globBase(input);
  return {
    input,
    output: {
      file: `dist/${fileName.replace(extname(fileName), '.js')}`,
      format: 'cjs',
      exports: 'named'
    },
    plugins: [
      // 支持第三方模块
      resolve(),
      // 支持 commonjs 格式
      commonjs(),
      // babel
      babel({ runtimeHelpers: true })
    ],
    // 第三方模块不会强行打包到输出中
    external: Object.keys(dependencies)
  };
});
