import bucket from "../config/firebaseConfig.js";
import { v4 as uuidv4 } from "uuid";

const uploadImageToFirebase = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No file uploaded."));
    }

    const blob = bucket.file(uuidv4() + "-" + file.originalname);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      reject(err);
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURIComponent(blob.name)}?alt=media`;

      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
};

export default uploadImageToFirebase;
