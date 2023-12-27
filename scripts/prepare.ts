import * as path from "path";
import * as fs from "fs/promises";

async function rmDir(
  dirPath: string,
  removeSelf: boolean = true
): Promise<boolean> {
  let files: string[] | null = null;
  try {
    files = await fs.readdir(dirPath);
  } catch (e) {
    return false;
  }
  if (files.length > 0)
    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(dirPath, files[i]);
      if ((await fs.stat(filePath)).isFile()) fs.unlink(filePath);
      else rmDir(filePath);
    }
  if (removeSelf) await fs.rmdir(dirPath);
  return true;
}

async function main() {
  await rmDir("./dist");
}

main();
