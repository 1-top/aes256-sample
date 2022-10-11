import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_AES_SECRET_KEY!;
const IV = process.env.NEXT_PUBLIC_IV!;

export const encrypt = (text: string) => {
  const cipher = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(SECRET_KEY), {
    iv: CryptoJS.enc.Utf8.parse(IV),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return cipher.toString();
};

export const decrypt = (encryptedText: string) => {
  const decipher = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(SECRET_KEY), {
    iv: CryptoJS.enc.Utf8.parse(IV),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return decipher.toString(CryptoJS.enc.Utf8);
};