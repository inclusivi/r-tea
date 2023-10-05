import { firebaseApp } from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);


export async function register(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password);
}

