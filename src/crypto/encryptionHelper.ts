import CryptoJS from "crypto-js";

export const createEncryptedHex = (key: string, input: string): string => {
  const keyWA = CryptoJS.enc.Utf8.parse(key);
  const ivWA = CryptoJS.enc.Utf8.parse(key.substring(0, 16));

  const encrypted = CryptoJS.AES.encrypt(input, keyWA, {
    iv: ivWA,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
};
