import { describe, it, expect } from "vitest";
import { aesDecryptHexWithKey } from "./crypto";

describe("aesDecryptHexWithKey", () => {
  it("decrypts with correct key/iv format", () => {
    // Kein echter Vektor hier – dient nur dem Smoke-Test bzgl. API
    expect(typeof aesDecryptHexWithKey("1234567890123456", "00")).toBe(
      "string",
    );
  });
});
