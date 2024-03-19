
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, updateProfile, User as FirebaseUser, updatePassword, reauthenticateWithCredential, EmailAuthProvider, sendPasswordResetEmail, checkActionCode, ActionCodeInfo, confirmPasswordReset } from "firebase/auth";
import { firebaseApp } from "../config";
import { ProfileRepo } from "../repositories/ProfileRepo";
import { User } from "@/modules/user/UserInfo";
import { updateDocument } from "./database";
import { FirebaseError } from "firebase/app";

const auth = getAuth(firebaseApp);

export async function login(email: string, password: string) {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        trataErro(error, "Erro ao fazer login");
    }
}

function trataErro(error: any, mensagem: string): never {
    let errorCode = 'unknown';
    if (error instanceof FirebaseError) {
        errorCode = error.code;
    } else {
        errorCode = String(error)
    }
    throw new Error(mensagem + ": " + trataMensagemDeErro(errorCode));
}

function trataMensagemDeErro(errorCode: string): string {
    switch (errorCode) {
        case "auth/invalid-login-credentials":
            return "Credenciais inválidas";
        case "auth/user-not-found":
            return "Usuário não encontrado.";
        case "auth/invalid-email":
            return "Email inválido";
        case "auth/wrong-password":
            return "Senha incorreta.";
        case "auth/weak-password":
            return "A senha precisa conter 6 ou mais caractéres";
        case "auth/email-already-in-use":
            return "Este e-mail já está sendo utilizado";
        //espaço pra colocar mais erros acima
        case "auth/expired-action-code":
            return "Código de verificação expirado";
        case "auth/invalid-action-code":
            return "Código de verificação inválido";
        default:
            return `Erro desconhecido (${errorCode})`;
    }
}

export async function logout() {
    try {
        return await auth.signOut();
    } catch (error) {
        trataErro(error, "Erro ao fazer logout");
    }
}
export async function register(email: string, password: string, firstName: string, lastName: string): Promise<void> {
    let cred;
    try {
        cred = await createUserWithEmailAndPassword(auth, email, password);
        //fazer só no export createUser
    } catch (error) {
        trataErro(error, "Erro ao registrar");
    }


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
        trataErro(error, "Erro ao atualizar foto de perfil");
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
        trataErro(error, "Erro ao alterar senha");
    }
}

export async function sendPasswordChangeEmail(email: string) {
    await sendPasswordResetEmail(auth, email);
}

export async function resetPassword(oobCode: string, newPassword: string) {
    try {
        await confirmPasswordReset(auth, oobCode, newPassword);
    } catch (error) {
        trataErro(error, "Erro ao redefinir senha");
    }
}

export async function validateActionCode(oobCode: string): Promise<ActionCodeInfo> {
    try {
        const actionCodeInfo = await checkActionCode(auth, oobCode);
        return actionCodeInfo;
    } catch (error) {
        trataErro(error, "Código de verificação inválido ou expirado");
    }
}
