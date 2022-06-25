import { useState, useEffect, useContext } from 'react'
import FirebaseContext from '../context/firebase'

export default function usePlanListener(uid) {
  const [user, setUser] = useState(null)
  const { firebaseApp } = useContext(FirebaseContext)

  useEffect(() => {
    const listner = firebaseApp
      .firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot((doc) =>
        setUser({
          plan: doc.data()?.plan,
          planDate: doc.data()?.planDate,
        })
      )
    return () => listner()
  }, [firebaseApp, uid])

  return user
}
