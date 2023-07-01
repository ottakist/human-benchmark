import { initializeApp } from 'firebase/app'
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  serverTimestamp
} from 'firebase/firestore'
const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
})

const firestore = getFirestore(firebaseApp)
export const createUser = async (userId = '1', name = 'user1') => {
  const userRef = doc(firestore, 'users', userId)

  const userData = {
    name,
    email: '',
    createdAt: serverTimestamp()
  }

  const userDoc = await getDoc(userRef)
  if (userDoc.exists()) {
    // eslint-disable-next-line no-useless-return
    return
  } else {
    await setDoc(userRef, userData)
  }
}
export const getUserById = async (userId: string) => {
  const userRef = doc(firestore, 'users', userId)

  try {
    const userSnapshot = await getDoc(userRef)

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data()
      return userData
    } else {
      console.log('User not found')
    }
  } catch (error) {
    console.error('Error fetching user', error)
  }
}
