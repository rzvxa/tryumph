import * as fs from "fs";
import { handleInput } from "coveralls";

const lcov = fs.readFileSync("./coverage/lcov.info", { encoding: "utf8" });
handleInput(lcov, (err) => {
  if (err) {
    throw err;
  }
});
