const imagekit = require("imagekit");

const storageInstance = new imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

const sendFilesToStorage = async (fileBuffer, fileName, removeBackground) => {
  return await storageInstance.upload({
    file: fileBuffer.toString("base64"),
    fileName,
    folder: "resume-builder",
    transformation: removeBackground
      ? {
          pre: "w-300,h-300,fo-face,e-bgremove,z-0.75",
        }
      : {
          pre: "w-300,h-300,fo-face,z-0.75",
        },
  });
};

module.exports = sendFilesToStorage;
