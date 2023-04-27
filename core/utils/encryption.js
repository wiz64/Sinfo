const zcrypto = require("crypto");
const siteConfig = require("../config/site.config.json");
function encrypt(data) {
  const iv = zcrypto.randomBytes(16);
  const cipher = zcrypto.createCipheriv(
    ALGORITHM,
    Buffer.from(siteConfig.APP_SECRET_PHRASE),
    iv
  );
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString(ENCODING)}:${encrypted.toString(ENCODING)}`;
}

module.exports = encrypt;
