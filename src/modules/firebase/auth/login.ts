import { firebaseApp } from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);

export async function login(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
}
