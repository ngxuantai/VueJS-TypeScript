import { ref } from "vue";
const projectStorage = require("../config/firebase").projectStorage;
import { useUser } from "./useUser";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const errorStroage = ref<string | null>(null);
const filePath = ref<string | null>(null);
const fileUrl = ref<string>("");
const { getUser } = useUser();
const { userRef } = getUser();

export function useStroage(name: string) {
  async function uploadFile(file: File) {
    errorStroage.value = null;
    filePath.value = `${name}/${userRef?.uid}/${file.name}`;
    const fileRef = storageRef(projectStorage, filePath.value);
    try {
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      fileUrl.value = url;
    } catch (err: any) {
      console.error(err.message);
      errorStroage.value = err.message;
    }
  }

  return { errorStroage, fileUrl, uploadFile };
}
