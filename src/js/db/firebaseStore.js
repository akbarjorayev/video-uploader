import { getDownloadURL, ref } from 'firebase/storage'
import { firebaseStorage } from './firebaseInit'

export async function uploadBytes(path, file) {
  const storageRef = ref(firebaseStorage, path)

  return uploadBytes(storageRef, file)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

export async function downloadFromStore(path) {
  const starsRef = ref(firebaseStorage, path)

  return getDownloadURL(starsRef)
    .then((url) => {
      return url
    })
    .catch(() => {
      return false
    })
}
