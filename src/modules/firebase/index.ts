import { ProfileRepo } from "./repositories/ProfileRepo";

import { getAuth } from "firebase/auth";
import { firebaseApp } from "./config";

const auth = getAuth(firebaseApp);

export async function getProfileRepository(): Promise<ProfileRepo> {
    if (!auth.currentUser) throw new Error('User not logged in');
    return new ProfileRepo(auth.currentUser);
}