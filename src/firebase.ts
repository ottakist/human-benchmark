import { initializeApp } from 'firebase/app'
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  serverTimestamp,
  updateDoc
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
export const createUser = async (userId = '1', name = 'user1', email = '') => {
  const userRef = doc(firestore, 'users', userId)

  const userData = {
    name,
    email,
    createdAt: serverTimestamp()
  }

  const userDoc = await getDoc(userRef)
  if (userDoc.exists()) {
    // eslint-disable-next-line no-useless-return
    return
  } else {
    await setDoc(userRef, userData, { merge: true })
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

export const updateUserFields = async (
  userId: string,
  testName: string,
  score: string[],
  percentile: number
) => {
  const userRef = doc(firestore, 'users', userId)
  const userSnapshot = await getDoc(userRef)
  const existingTestData = userSnapshot.get('testData') || []

  // Find the test index in the existing testData array
  const testIndex = existingTestData.findIndex(
    (test: any) => test.testName === testName
  )

  if (testIndex !== -1) {
    // If the test already exists, update the score and percentile values
    const updatedTestData = [...existingTestData]
    // Not sure how much data i want to store

    // if (updatedTestData[testIndex].score.length >= 5) {
    //   updatedTestData[testIndex].score.shift()
    // }
    updatedTestData[testIndex].score.push(...score)
    updatedTestData[testIndex].percentile = percentile
    updatedTestData[testIndex].date.push(new Date().getTime())

    await updateDoc(userRef, {
      testData: updatedTestData
    })
  } else {
    // If the test does not exist, add a new test to the testData array
    const testData = {
      testName,
      score,
      percentile,
      date: [new Date().getTime()]
    }

    const updatedTestData = [...existingTestData, testData]

    await updateDoc(userRef, {
      testData: updatedTestData
    })
  }
}
