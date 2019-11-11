'use strict';

// NODE_ENVがproductionかどうかの判定
const isDev = process.env.NODE_ENV !== 'production';

const path = require('path');

console.log(99999);
console.log('__dirname：', __dirname);
console.log('process.cwd()：', process.cwd());
console.log('./：', path.resolve('./'));

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    [
      '@babel/preset-typescript',
      {
        // 強制的にjsxのパースを行うオプション。
        // e.g: var hoge = <string>fuga; みたいなコードがパースできる
        isTSX: true,
        // isTSX: trueにするときは常に必須のオプション
        allExtensions: true,
      },
    ],
    [
      '@babel/preset-react',
      {
        development: isDev,
      },
    ],
  ],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: __dirname,
            rootPathPrefix: '@@',
          },
        ],
      },
    ],
  ],
};
