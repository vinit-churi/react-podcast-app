import { storage } from "@src/firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`; // Append timestamp to file name
    console.log(fileName);
    const storageRef = ref(storage, `images/${fileName}`);
    console.log(storageRef);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}
