
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, updateProfile, User as FirebaseUser, updatePassword, reauthenticateWithCredential, EmailAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { firebaseApp } from "../config";
import { ProfileRepo } from "../repositories/ProfileRepo";
import { User } from "@/modules/user/UserInfo";
import { updateDocument } from "./database";

const auth = getAuth(firebaseApp);

export async function login(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
    return await auth.signOut();
}

export async function register(email: string, password: string, firstName: string, lastName: string): Promise<void> {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(cred.user, {
        displayName: `${firstName} ${lastName}`,
    });

    updateDocument(`/profiles/${cred.user.uid}`, {
        userId: cred.user.uid,
        email: cred.user.email,
        firstName: firstName,
        lastName: lastName,
        ufId: null,
        ufName: null,
        ufSigla: null,
        municipioId: null,
        municipioName: null,
    });
    
}

export async function setUserAvatar(user: FirebaseUser, photoUrl: string | null) {
    await updateProfile(user, {
        photoURL: photoUrl ?? '',
    });
}

export async function changePassword(user: User, oldPassword: string, newPassword: string) {
    const firebaseUser = auth.currentUser
    const oldCredentials = EmailAuthProvider.credential(
        user.email!,
        oldPassword
    )
    const credential = await reauthenticateWithCredential(firebaseUser!, oldCredentials);
    await updatePassword(credential.user, newPassword);
}

export async function sendPasswordChangeEmail(email: string) {
    await sendPasswordResetEmail(auth, email);
}