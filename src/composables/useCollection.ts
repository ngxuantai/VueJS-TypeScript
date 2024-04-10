import { ref } from "vue";
const projectFirestore = require("../config/firebase").projectFirestore;
import { collection, addDoc } from "firebase/firestore";

const error = ref<string | null>(null);

export function useCollection(name: string) {
  async function addRecord(record: Record<string, any>) {
    error.value = null;
    try {
      const response = await addDoc(collection(projectFirestore, name), record);
      return response;
    } catch (err: any) {
      console.error(err.message);
      error.value = err.message;
    }
  }

  return { error, addRecord };
}
