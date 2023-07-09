import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  serverTimestamp,
  updateDoc,
  collection,
  getDocs
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
// need to remove percentile from db
export const updateUserFields = async (
  userId: string,
  testName: string,
  score: string[]
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
    updatedTestData[testIndex].date.push(new Date().getTime())

    await updateDoc(userRef, {
      testData: updatedTestData
    })
  } else {
    // If the test does not exist, add a new test to the testData array
    const testData = {
      testName,
      score,
      date: [new Date().getTime()]
    }
    const updatedTestData = [...existingTestData, testData]

    await updateDoc(userRef, {
      testData: updatedTestData
    })
  }
}

async function calculateAverageResult(testName: string) {
  const usersRef = collection(firestore, 'users')

  try {
    // Retrieve the data for all users
    const usersSnapshot = await getDocs(usersRef)

    // Extract the relevant results for calculation
    const scores: any[] = []
    usersSnapshot?.forEach((userDoc) => {
      const testData = userDoc.get('testData')
      testData?.forEach((test: { score: number; testName: string }) => {
        scores.push({ score: test.score, name: test.testName })
      })
    })
    const averageScores: Array<{ name: string; score: number }> = []
    scores.forEach((score) => {
      averageScores.push({
        name: score.name,
        score:
          score.score
            .map((score: string) => parseInt(score, 10))
            .reduce((acc: number, cur: number) => acc + cur, 0) /
          score.score?.length
      })
    })
    return averageScores.find((test) => test.name === testName)?.score ?? 100
  } catch (error) {
    console.error('Error calculating average result', error)
  }
}

export async function calculatePercentageImprovement(
  current: number,
  name: string
): Promise<number> {
  const average = (await calculateAverageResult(name)) ?? 0
  const difference = ((current * 100) / average) * 10
  let improvement: number

  switch (name) {
    case 'Aim Test':
    case 'Reaction Test':
      improvement = difference < 1000 ? 1000 : 2000 - difference
      break
    case 'Sequence Test':
      improvement = difference > 1000 ? 1000 : difference
      break
    default:
      improvement = 0
      break
  }

  const percentageImprovement = Math.floor(improvement)
  return percentageImprovement
}
