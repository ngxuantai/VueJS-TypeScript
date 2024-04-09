import { ref } from "vue";

const projectFirestore = require("../config/firebase").projectFirestore;
const projectAuth = require("../config/firebase").projectAuth;
import { onAuthStateChanged } from "firebase/auth";

const user = ref<object>(projectAuth.currentUser);

onAuthStateChanged(projectAuth, (_user) => {
  if (_user) {
    user.value = _user;
  }
});

function getUser() {
  return { user };
}

export function useUser() {
  return { getUser };
}
