var express = require('express');
var router = express.Router();
var API = require('../lib/apifox/index.js')
var path = require('path');
const fs = require('fs');
const dirPath = path.join(process.cwd(), 'public/file/apifox');
const baseUrl = `./public/file/apifox`; // 替换为实际的基本URL

/* GET users listing. */
router.get('/', function (req, res, next) {
  try {
    const loginData = {
      email: '15939054361@163.com',
      password: 'z19980522',
    };
    const host = 'https://doc.jsxygkj.com';
    const pid = req.query.id || 258;
    const tmp = new API(host, pid, {
      pathFolder: dirPath,
      space: 2,
      requestInstanceName: 'request',
      requestImportName: '@/utils/request',
      apiCondition: '查询',
      createTemplate: true,
    });

    if (pid) {
      tmp.login(loginData).then(() => {
        tmp.startTask();
      });
    } else {
      throw '请传入项目id参数';
    }

    // 指定要读取的目录路径和基本URL

  

    // 生成public文件夹里的文件目录
    res.send({
      data: getAllFilesInDirectory(dirPath, baseUrl)
    });
  } catch (error) {
    res.send(error);
  }

});



function getAllFilesInDirectory(folderPath, baseUrl) {
  let downloadLinks = [];

  function readDirectory(currentPath) {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        // 如果是目录，则递归读取该目录
        readDirectory(filePath);
      } else {
        // 如果是文件，则生成下载链接并添加到下载链接列表
        const relativePath = path.relative(folderPath, filePath);
        const downloadLink = path.join(baseUrl, relativePath).replace(/\\/g, '/');
        downloadLinks.push(downloadLink);
      }
    });
  }

  readDirectory(folderPath);

  return downloadLinks;
}





// 获取目录列表

module.exports = router;
