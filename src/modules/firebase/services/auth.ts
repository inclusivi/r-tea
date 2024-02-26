
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, updateProfile, User as FirebaseUser, updatePassword, reauthenticateWithCredential, EmailAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { firebaseApp } from "../config";
import { ProfileRepo } from "../repositories/ProfileRepo";
import { User } from "@/modules/user/UserInfo";
import { updateDocument } from "./database";
import { FirebaseError } from "firebase/app";

const auth = getAuth(firebaseApp);
console.log("Passou dos 3 imports e do const getauth");
export async function login(email: string, password: string) {
console.log("Exportou");   
    try { 
        return await signInWithEmailAndPassword(auth, email, password);
}  catch (error) {
            let errorCode = 'unknown';
            if (error instanceof FirebaseError) {
                errorCode = error.code;
            } else {
                errorCode = String(error) 
                    }
            throw new Error(trataMensagemDeErro(errorCode));
        }
    }
    function trataMensagemDeErro(errorCode: string): string{
        switch (errorCode) {
            case "auth/invalid-login-credentials":
                return "Credenciais inválidas";
            case "auth/user-not-found":
                return "Usuário não encontrado.";
            case "auth/invalid-email":
                return "Email inválido";
            case "auth/wrong-password":
                return "Senha incorreta.";
        //espaço pra colocar mais erros acima
            default:
                return "Erro desconhecido: " + errorCode;            
            }
    }




export async function logout() {
    try {
        return await auth.signOut();
}   catch (error) {
        throw new Error("Erro ao fazer logout: " + error.message);
    }
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
    try {    
        await updateProfile(user, {
                photoURL: photoUrl ?? '',
    });
} catch (error) {
    throw new Error("Erro ao definir avatar do usuário: ") + error.message;
    }
}

export async function changePassword(user: User, oldPassword: string, newPassword: string) {
    const firebaseUser = auth.currentUser
    try {    
        const oldCredentials = EmailAuthProvider.credential(
            user.email!,
            oldPassword
        )
        const credential = await reauthenticateWithCredential(firebaseUser!, oldCredentials);
        await updatePassword(credential.user, newPassword);
      } catch (error) {
            throw new Error ("Erro ao alterar a senha: " + error.message);
      }        
}

export async function sendPasswordChangeEmail(email: string) {
    await sendPasswordResetEmail(auth, email);
}