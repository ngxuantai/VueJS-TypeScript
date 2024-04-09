import { ref } from "vue";
const projectAuth = require("../config/firebase").projectAuth;

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

async function signUp(fullName: string, email: string, password: string) {
  isPending.value = true;
  error.value = null;
  try {
    const response = await createUserWithEmailAndPassword(
      projectAuth,
      email,
      password
    );
    console.log(response);
    const user = projectAuth.currentUser;
    await updateProfile(user, {
      displayName: fullName,
    });
    if (!response) {
      throw new Error("Could not complete the signup");
    }
  } catch (err: any) {
    console.log(err);
    error.value = err.message.replace("Firebase: ", "");
  } finally {
    isPending.value = false;
  }
}

async function signIn(email: string, password: string) {
  isPending.value = true;
  error.value = null;
  try {
    console.log(email);
    console.log(password);
    const response = await signInWithEmailAndPassword(
      projectAuth,
      email,
      password
    );
    console.log(response);
    if (!response) {
      throw new Error("Could not complete the signin");
    }
  } catch (err: any) {
    console.log(err);
    error.value = err.message.replace("Firebase: ", "");
  } finally {
    isPending.value = false;
  }
}

async function logOut() {
  isPending.value = true;
  error.value = null;
  try {
    await signOut(projectAuth);
  } catch (err: any) {
    console.log(err);
    error.value = err.message.replace("Firebase: ", "");
  } finally {
    isPending.value = false;
  }
}

export function useAuth() {
  return {
    error,
    isPending,
    signUp,
    signIn,
    logOut,
  };
}
