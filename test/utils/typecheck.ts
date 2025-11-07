import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import ts from "typescript";

const pathAliases = {
  "@mrtimeey/everybodycodes-data": ["src/index.ts"],
};

/**
 * Type-checks a given TypeScript/JavaScript code snippet
 * without executing it. Allows top-level await via .mts/.mjs.
 */
export function checkTypes(source: string, fileName: string) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "typecheck-"));
  const esmName = fileName.replace(/\.ts$/i, ".mts").replace(/\.js$/i, ".mjs");
  const tmpFile = path.join(tmpDir, esmName);

  const sanitized = `export {};\n${source.replace(/console\.log\(.*\);?/g, "")}`;
  fs.writeFileSync(tmpFile, sanitized, "utf8");

  const program = ts.createProgram([tmpFile], {
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    target: ts.ScriptTarget.ES2022,
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    allowJs: true,
    checkJs: true,
    baseUrl: process.cwd(),
    paths: pathAliases ?? {},
    types: ["node"],
  });

  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length) {
    const formatted = ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCurrentDirectory: () => process.cwd(),
      getCanonicalFileName: (f) => f,
      getNewLine: () => "\n",
    });
    throw new Error(`TypeScript errors in ${fileName}:\n${formatted}`);
  }
}
