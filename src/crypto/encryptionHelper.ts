import crypto from "crypto";

export const createEncryptedHex = (key: string, input: string) => {
  const iv = Buffer.from(key.substring(0, 16), "utf8");
  const cipher = crypto.createCipheriv(
    "aes-128-cbc",
    Buffer.from(key, "utf8"),
    iv,
  );
  return cipher.update(input, "utf8", "hex") + cipher.final("hex");
};
