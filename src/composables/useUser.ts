import { ref, Ref } from "vue";

const projectFirestore = require("../config/firebase").projectFirestore;
const projectAuth = require("../config/firebase").projectAuth;
import { User, onAuthStateChanged } from "firebase/auth";

const user = ref<User | null>(projectAuth.currentUser);

onAuthStateChanged(projectAuth, (_user) => {
  if (_user) {
    user.value = _user;
  }
});

function getUser() {
  return { userRef: (user as Ref<User | null>).value };
}

export function useUser() {
  return { getUser };
}
