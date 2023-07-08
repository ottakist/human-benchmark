import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'
import { firebaseApp } from './init'
const firestore = getFirestore(firebaseApp)

// Create user
export const createUser = async (userId = '1', name = 'user1', email = '') => {
  const userRef = doc(firestore, 'users', userId)
  // Initialize user props
  const userData = {
    name,
    email,
    createdAt: serverTimestamp()
  }
  const userDoc = await getDoc(userRef)
  if (userDoc.exists()) return
  await setDoc(userRef, userData, { merge: true })
}
// Receiving user data from store
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
