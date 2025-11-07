import { describe, it, expect } from "vitest";
import fs from "node:fs";
import { checkTypes } from "./utils/typecheck.js";

describe("README code blocks type-check", () => {
  const readme = fs.readFileSync("README.md", "utf8");
  const blocks = Array.from(readme.matchAll(/```(?:ts|js)\n([\s\S]*?)```/g));

  for (const [i, match] of blocks.entries()) {
    it(`README block #${i + 1} compiles with types`, () => {
      const code = match[1];
      checkTypes(code, `readme-block-${i + 1}.ts`);
      expect(true).toBe(true);
    });
  }
});
