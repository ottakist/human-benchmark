import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'
import { firebaseApp } from '../init'

const firestore = getFirestore(firebaseApp)

// Create user
export const createUser = async (
  userId: string,
  name: string,
  email: string,
  image: string
) => {
  const userRef = doc(firestore, 'users', userId)
  // Initialize user props
  const userData = {
    name,
    email,
    createdAt: serverTimestamp(),
    image
  }
  const userDoc = await getDoc(userRef)
  if (userDoc.exists()) return
  await setDoc(userRef, userData, { merge: true })
}
