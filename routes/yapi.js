var express = require('express');
var router = express.Router();
var API = require('../lib/yapi/index.js')
var path = require('path');
const fs = require('fs');
const dirPath = path.join(process.cwd(), 'public/file/yapi');
const baseUrl = `/file/yapi`; // 替换为实际的基本URL

/* GET users listing. */
router.post('/', async function (req, res, next) {
  const { pid, email, password, host } = req.body
  try {
    const loginData = {
      email,
      password
    };

    const tmp = new API(host, pid, {
      pathFolder: dirPath,
      space: 2,
      requestInstanceName: 'request',
      requestImportName: '@/utils/request',
      apiCondition: '查询',
      createTemplate: false,
    });

    if (pid) {
      await tmp.login(loginData)
      await tmp.startTask();
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
