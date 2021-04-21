#!/usr/bin/env node
// console.log(111);
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const ejs = require("ejs");
inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "Project name?",
    },
  ])
  .then(anwsers => {
    // 模板目录
    const tmplDir = path.join(__dirname, "templates");
    // 目标目录
    const destDir = process.cwd();
    fs.readdir(tmplDir, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        ejs.renderFile(path.join(tmplDir, file), anwsers, (err, result) => {
          if (err) throw err;
          // 将结果写入目标文件
          fs.writeFileSync(path.join(destDir, file), result);
        });
      });
    });
  });
