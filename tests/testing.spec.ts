import { addition } from "../src/index";

console.log("here");

describe("Addition tests", () => {
   test("should return 5 when 2 is added to 3", () => {
      expect(addition(2, 3)).toBe(5);
   });
});
