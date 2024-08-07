// src/utils/uploadImage.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const signInUser = async () => {
  const email = process.env.FIREBASE_USER_EMAIL;
  const password = process.env.FIREBASE_USER_PASSWORD;
  await signInWithEmailAndPassword(auth, email, password);
};

export const uploadImage = async (file) => {
  await signInUser();
  const storageRef = ref(storage, `images/${file.originalname}`);
  const snapshot = await uploadBytes(storageRef, file.buffer);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
