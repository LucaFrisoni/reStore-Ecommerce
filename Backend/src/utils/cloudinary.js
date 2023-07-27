const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dc1xutwsu",
  api_key: "149381361358923",
  api_secret: "8-j9rZv-9EvnuvEffOMYVM7QPZo",
  secure: true,
});

module.exports = {
  cloudinary,
};
