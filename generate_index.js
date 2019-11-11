const fs = require('fs');

// index作成対象のディレクトリ
const targetDirs = ['./src/atoms'];

// atomsとorganismのindex.jsを作成
targetDirs.forEach(dir => {
  // ファイル読み込み
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    const content = makeIndexContent(files);
    fs.writeFile(dir + '/index.js', content, err => {
      if (err !== null) console.log(err);
    });
  });
});

// ファイル一覧からexportの文を作る
const makeIndexContent = files => {
  let content = '';
  files.forEach(item => {
    const file = item.replace('.js', '');
    if (file === 'index.js') {
      return;
    }
    content += "export { default } from './" + file + "'\n";
  });
  return content;
};
