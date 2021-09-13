/*
 * @FileDescription: 
 * @Author: 李永创
 * @Date: 2021-01-06 21:01:26
 * @LastEditors: 李永创
 * @LastEditTime: 2021-09-13 17:33:16
 */
import Tools from "@lyctianya/tools";
import chalk from "chalk";

const gulp = require("gulp");
const tinypng = require("gulp-tinypng-nokey");
function tinypng_img(imgUrl: string, inputDir: string, outDir: string): Promise<any> {
    imgUrl = imgUrl.replace(/\\/g, "/");
    return gulp.src(imgUrl)
        .pipe(tinypng())
        .pipe(
            gulp.dest(Tools.getParent(imgUrl.replace(inputDir, outDir)))
        )
}

export = async function (srcDir: string, distDir?: string) {
    let fileList: Array<{ path: string, isFile: Boolean }> = []
    if (Tools.isDir(srcDir)) {
        fileList = Tools.getDirAllFiles(srcDir);
    } else if (Tools.isFile(srcDir)) {
        fileList = [{ path: srcDir, isFile: true }]
    } else {
        console.log(chalk.red("文件/文件夹路径不存在！"))
        return;
    }

    if (!distDir) {
        distDir = srcDir;
    }
    if (Tools.isFile(distDir)) {
        distDir = Tools.getParent(distDir);
    }
    Tools.checkOrCreatePath(distDir);

    for (let i = 0; i < fileList.length; i++) {
        const item = fileList[i];
        const tmp = item.path.toLocaleLowerCase();
        if ((item.isFile && tmp.endsWith(".png")) || tmp.endsWith(".jpg") || tmp.endsWith(".jpeg")) {
            await tinypng_img(item.path, srcDir, distDir);
        }
    }
}
