import CryptoJS from "crypto-js";

export const decryptText = (key: string, text: string) => {
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Hex.parse(text),
  });

  const keyWA = CryptoJS.enc.Utf8.parse(key);
  const ivWA = CryptoJS.enc.Utf8.parse(key.substring(0, 16));

  const decrypted = CryptoJS.AES.decrypt(cipherParams, keyWA, { iv: ivWA });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
