import { QueryCompositeFilterConstraint, QueryConstraint, QueryFieldFilterConstraint, QueryFilterConstraint, QueryNonFilterConstraint, addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc } from "firebase/firestore"; 
import { firebaseApp } from "../config";

const db = getFirestore(firebaseApp);

export async function updateDocument(path: string, data: object) {
    const ref = doc(db, path);
    await setDoc(ref, data, { merge: true });
}

export async function addDocument(path: string, data: object) {
    const ref = doc(collection(db, path));
    await setDoc(ref, {...data, id: ref.id});
}

export async function loadDocuments<T>(path: string, filter?: QueryCompositeFilterConstraint, config?: QueryNonFilterConstraint): Promise<T[]> {
    const ref = collection(db, path);
    
    const q = filter ? config ? query(ref, filter, config) : query(ref, filter) : query(ref);
    
    const snapshots = await getDocs(q);
    return snapshots.docs.map(doc => doc.data()) as T[];
}

export async function loadDocument<T>(path: string): Promise<T | null> {
    const ref = doc(db, path);
    const snapshot = await getDoc(ref);
    
    if (!snapshot.exists()) return null;
    
    return snapshot.data() as T;
}