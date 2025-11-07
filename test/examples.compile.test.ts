import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { checkTypes } from "./utils/typecheck.js";

function getCodeBlocksFromMarkdown(mdContent: string) {
  return Array.from(mdContent.matchAll(/```(ts|js)\n([\s\S]*?)```/g)).map(
    ([, lang, code]) => ({ lang, code }),
  );
}

describe("Markdown examples type-check", () => {
  const dir = "examples";
  const mdFiles = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  for (const file of mdFiles) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, "utf8");
    const blocks = getCodeBlocksFromMarkdown(content);

    describe(file, () => {
      if (blocks.length === 0) {
        it("contains no code blocks", () => expect(true).toBe(true));
        return;
      }

      for (const [i, { lang, code }] of blocks.entries()) {
        it(`block #${i + 1} (${lang}) compiles with types`, () => {
          checkTypes(code, `${file}-block-${i + 1}.${lang}`);
          expect(true).toBe(true);
        });
      }
    });
  }
});
