import { API } from '../../api/api'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const app = initializeApp(API.firebase)
export const firebaseStorage = getStorage()
