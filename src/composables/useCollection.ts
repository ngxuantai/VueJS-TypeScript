import { ref } from "vue";
const projectFirestore = require("../config/firebase").projectFirestore;
import { collection, addDoc } from "firebase/firestore";

const isPendingCollec = ref<boolean>(false);
const error = ref<string | null>(null);

export function useCollection(name: string) {
  async function addRecord(record: Record<string, any>) {
    isPendingCollec.value = true;
    error.value = null;
    try {
      const response = await addDoc(collection(projectFirestore, name), record);
      return response;
    } catch (err: any) {
      console.error(err.message);
      error.value = err.message;
    } finally {
      isPendingCollec.value = false;
    }
  }

  return { isPendingCollec, error, addRecord };
}
