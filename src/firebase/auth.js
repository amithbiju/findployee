import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

export const doSignInWithEmailAndPassword = async (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
	return auth.signOut();
};