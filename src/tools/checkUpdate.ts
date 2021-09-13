/*
 * @FileDescription:
 * @Author: 李永创
 * @Date: 2021-09-13 15:16:50
 * @LastEditors: 李永创
 * @LastEditTime: 2021-09-13 16:36:42
 */
import Tools from "@lyctianya/tools"
import Chalk from "chalk";
const pkgInfo = require("../../package.json");

/**
 * @name: 检查是否需要更新。
 * @test: test font
 * @msg: 
 * @param {*}
 * @return {*}
 */
export = async function (): Promise<boolean> {
  const remoteVerson = await Tools.getNpmLastVersion(pkgInfo.name)
  const needUpdate = Tools.compareVersion(remoteVerson, pkgInfo.version) !== 0;
  if (needUpdate) {
    console.log(Chalk.green(`【${pkgInfo.name}】版本升级提示：`))
    console.log(Chalk.white(`当前版本:`, Chalk.red(pkgInfo.version)))
    console.log(Chalk.white(`最新版本:`, Chalk.red(remoteVerson)))
    console.log(`  运行 ${Chalk.green(`yarn add  ${pkgInfo.name}`)} 即可更新`);
  }
  return needUpdate;
}