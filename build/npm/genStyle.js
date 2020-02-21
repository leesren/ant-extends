/**
 *
 * 统计通用css 样式的词频数据
 */
const fs = require("fs");
const path = require("path");
//设置根目录
const root = path.resolve(__dirname, "../../src");
const distRoot = path.resolve(__dirname, "../../dist/npm/es5/src/");

const ext = /.(less|scss|css)$/;
//调用函数遍历根目录，同时传递 文件夹路径和对应的数组
//请使用同步读取
function copy(sourceFile, fileName, dirName) {
  const destPath = path.join(distRoot, dirName);
  const doCopy = () => {
    fs.copyFileSync(sourceFile, path.join(destPath, fileName));
  };
  if (fs.existsSync(destPath)) {
    doCopy();
  } else {
    fs.mkdirSync(path.join(distRoot, dirName));
    doCopy();
  }
}
function fileDisplay(dirPath, dir) {
  var filesList = fs.readdirSync(dirPath);
  for (var i = 0; i < filesList.length; i++) {
    //描述此文件/文件夹的对象
    const file = filesList[i]; 

    //拼接当前文件的路径(上一层路径+当前file的名字)
    var filePath = path.join(dirPath, file);
    //根据文件路径获取文件信息，返回一个fs.Stats对象
    var stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      //如果是文件夹
      //递归调用
      fileDisplay(filePath, file);
    } else {
      //不是文件夹,则添加type属性为文件后缀名
      const fileExt = path.extname(filePath);
      if (ext.test(fileExt)) {
        copy(filePath, file, dir);
      }
    }
  }
}
fileDisplay(root, "src");
