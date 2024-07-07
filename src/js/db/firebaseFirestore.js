import { collection, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore'
import { firebaseFirestore } from './firebaseInit'

export async function saveFirestore(collectionName, docName, data) {
  const dataRef = collection(firebaseFirestore, collectionName)

  try {
    await setDoc(doc(dataRef, docName), data)
    return true
  } catch {
    return false
  }
}

export async function loadFromFirestore(collectionName, docName) {
  try {
    const docRef = doc(firebaseFirestore, collectionName, docName)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) return docSnap.data()
    return false
  } catch {
    return false
  }
}

export async function editFirestore(collectionName, docName, newData) {
  try {
    const docRef = doc(firebaseFirestore, collectionName, docName)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      await setDoc(docRef, newData, { merge: true })
      return true
    }
    return false
  } catch {
    return false
  }
}

export async function deleteFromFirestore(collectionName, docName) {
  const docRef = doc(firebaseFirestore, collectionName, docName)

  try {
    await deleteDoc(docRef)
    return true
  } catch {
    return false
  }
}
