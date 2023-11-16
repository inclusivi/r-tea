import { firebaseApp } from "../config";
import { getStorage, uploadBytes, deleteObject, ref } from "firebase/storage";

const storage = getStorage(firebaseApp);

const BUCKET_PATH_URL = `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/`;

export async function saveFile(path: string, file: File) {
    const metadata = {
        contentType: file.type,
    };

    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file, metadata);

    return `${BUCKET_PATH_URL}${path.replaceAll('/','%2F')}?alt=media`;
}

export async function deleteFile(path: string) {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
}