
/*
 * @FileDescription: 
 * @Author: 李永创
 * @Date: 2021-09-12 17:03:08
 * @LastEditors: 李永创
 * @LastEditTime: 2021-09-14 10:32:09
 */

import { program } from "commander";
const pkgInfo = require("../package.json")
import Tools from "@lyctianya/tools"
import checkUpdate from "./tools/checkUpdate";
import workers from "./tools/workers";

declare var process: any;

(async () => {
  //checkupdate
  if (await checkUpdate()) {
    return process.exit(1);
  }
  //读取用户输入，操作图片
  program
    .command(`init`)
    .description('init a plugin project')
    .action((options) => {
      Tools.checkOrCreatePath("./miao.txt", true)
      console.log("已在当前文件夹下创建miao.txt")
    });

  program.option('-o, --out <dirpath>', 'output dir 可不设置。不设置时候替换源文件')
    .option('-s, --src <dirpath or file path>', 'source file path')
    .action((options) => {
      workers(options).catch(() => {
        process.exit(1)
      })
    })

  program
    .version(pkgInfo.version)
    .description("欢迎使用cmdTools");

  //默认展示帮助信息
  if (process.argv && process.argv.length < 3) {
    program.help();
  }

  program.parse(process.argv);

})();

// 进度条使用 yarn add @types/progress
/*
import * as ProgressBar from 'progress';

var bar = new ProgressBar(':bar :current/:total', { total: 10 });
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  } else if (bar.curr === 5) {
    bar.interrupt('this message appears above the progress bar\ncurrent progress is ' + bar.curr + '/' + bar.total);
  }
}, 1000);
*/