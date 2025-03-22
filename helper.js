const Cryptr = require('cryptr');
const cryptr = new Cryptr('wscubetech');


const encodePassword = (original_password) => {
   return cryptr.encrypt(original_password);
};


const decodePassword = (enc_password) => {
   return cryptr.decrypt(enc_password);
};


const generteImageName = (origin_name) => {
   return `${Date.now()}_${origin_name}`;
};

module.exports = { generteImageName, encodePassword, decodePassword };
