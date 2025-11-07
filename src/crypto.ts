import crypto from "node:crypto";

export function aesDecryptHexWithKey(key: string, hexCipher: string): string {
    const keyBytes = Buffer.from(key, "utf8");
    const iv = Buffer.from(key.substring(0, 16), "utf8");
    const cipherBytes = Buffer.from(hexCipher, "hex");

    const algo =
        keyBytes.length === 16 ? "aes-128-cbc" :
            keyBytes.length === 24 ? "aes-192-cbc" :
                keyBytes.length === 32 ? "aes-256-cbc" : "aes-256-cbc";

    const dec = crypto.createDecipheriv(algo, keyBytes, iv);
    const out = Buffer.concat([dec.update(cipherBytes), dec.final()]);
    return out.toString("utf8");
}
