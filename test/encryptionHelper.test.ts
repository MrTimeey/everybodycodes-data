import { describe, expect, it } from "vitest";
import { createEncryptedHex } from "../src/crypto/encryptionHelper";

describe("encryptionHelper", () => {
  it("generate example value - 42", async () => {
    const result = createEncryptedHex("1234567890123456", "42");
    expect(result).toBe("c40ccb96465a6a2c1ed054e6f38a0390");
  });
  it("generate example value - 1447", async () => {
    const result = createEncryptedHex("1234567890123898", "1447");
    expect(result).toBe("634ebde6ec5b1053c91530d42231f83d");
  });
});
