import { API } from '../../api/api'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const app = initializeApp(API.firebase)
export const firebaseFirestore = getFirestore(app)
export const firebaseStorage = getStorage()
