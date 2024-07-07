import {
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  query,
  getDocs,
  where,
  updateDoc,
  increment,
} from 'firebase/firestore'
import { firebaseFirestore } from './firebaseInit'

export async function saveToFirestore(collectionName, docName, data) {
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

export async function loadFromFirestoreWhere(collectionName, myWhere) {
  try {
    const data = []
    const q = query(
      collection(firebaseFirestore, collectionName),
      where(...myWhere)
    )

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      data.push(doc.data())
    })
    return data
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

export async function incrementField(
  collectionName,
  docName,
  fieldName,
  incrementBy
) {
  const existsData = await loadFromFirestore(collectionName, docName)

  if (!existsData) {
    const saved = await saveToFirestore(collectionName, docName, {
      [fieldName]: incrementBy,
    })
    return saved
  }

  if (!existsData[fieldName]) {
    const edited = await editFirestore(collectionName, docName, {
      [fieldName]: incrementBy,
    })
    return edited
  }

  const docRef = doc(firebaseFirestore, collectionName, docName)

  try {
    await updateDoc(docRef, {
      [fieldName]: increment(incrementBy),
    })
    return true
  } catch {
    return false
  }
}
