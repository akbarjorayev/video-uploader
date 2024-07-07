import { useState, useEffect } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { firebaseStorage } from '../js/db/firebaseInit'

export function useFirebaseStoreRealtime(path, file, upload) {
  const [p, setP] = useState(0)
  const [url, setUrl] = useState('')
  const [err, setErr] = useState(null)

  useEffect(() => {
    if (!upload || !file) return

    const storageRef = ref(firebaseStorage, path)
    const uploadTask = uploadBytesResumable(storageRef, file)

    const unsubscribe = uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setP(progress)
      },
      (error) => {
        setErr(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL)
        })
      }
    )

    return () => {
      unsubscribe()
    }
  }, [path, file, upload])

  return { p, url, err }
}
