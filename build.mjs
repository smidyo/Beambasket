import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdir,
  readdirSync,
  readFileSync,
  readSync,
} from "fs";
import { join } from "path";

function build(config) {
  // handle prisma

  // handle backend config

  for (const mod of config.modules) {
    addModule(mod);
  }
}

function addModule(module) {
  copyFolder("./", module);
}

function copyFolder(folderPath, module) {
  const sourceFullFolderPath = join("bb-modules", module.module, "include");

  const files = readdirSync(sourceFullFolderPath);
  console.log(files);

  for (const file of files) {
    const sourceFullFilePath = join(sourceFullFolderPath, file);
    const destinationFullFilePath = join(folderPath, file);
    if (lstatSync(sourceFullFilePath).isDirectory()) {
      if (!existsSync(destinationFullFilePath)) {
        mkdirSync(destinationFullFilePath);
      }
      copyFolder(sourceFullFilePath, module);
      continue;
    }
    copyFileSync(folderPath, sourceFullFilePath, destinationFullFilePath);
  }
}

const json = readFileSync(join("bb-config.json"), "utf8");

build(JSON.parse(json));
