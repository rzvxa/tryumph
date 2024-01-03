import * as path from "path";
import * as fs from "fs";

function rmDir(
  dirPath: string,
  removeSelf: boolean = true
): boolean {
  let files: string[] = [];
  try {
    files = fs.readdirSync(dirPath);
  } catch {
    return false;
  }
  if (files.length > 0)
    for (let i = 0; i < files.length; i++) {
      const file = path.join(dirPath, files[i]);
      if (file === "." || file === "..") {
        continue;
      } else if (fs.statSync(file).isDirectory()) {
        rmDir(file);
      } else {
        fs.unlinkSync(file);
      }
    }
  if (removeSelf) fs.rmdirSync(dirPath);
  return true;
}

function main() {
  rmDir("./dist");
}

main();
