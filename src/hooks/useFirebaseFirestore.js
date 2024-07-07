import { useState, useEffect } from 'react'

import { loadFromFirestore } from '../js/db/firebaseFirestore'

export const useFirestore = (collectionName, docName, ...deps) => {
  const [firestoreData, setFirestoreData] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const data = await loadFromFirestore(collectionName, docName)
      setFirestoreData(data ? data : false)
    }

    loadData()
  }, [collectionName, docName, ...deps])

  return [firestoreData, setFirestoreData]
}
