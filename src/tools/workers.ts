/*
 * @FileDescription:
 * @Author: 李永创
 * @Date: 2021-09-13 17:37:20
 * @LastEditors: 李永创
 * @LastEditTime: 2021-09-13 17:54:30
 */

import tiny from "./TinypngWithoutKey"

export = async function (options: any) {
  await tiny(options.src, options.out)
}
