import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { firebaseApp } from '../init'

const firestore = getFirestore(firebaseApp)
export const updateUserFields = async (
  userId: string,
  testName: string,
  score: string[]
) => {
  const userRef = doc(firestore, 'users', userId)
  const testRef = doc(firestore, 'tests', testName.toLowerCase())
  const userSnapshot = await getDoc(userRef)
  const testSnapshot = await getDoc(testRef)
  const existingTestData = userSnapshot.get('testData') || []

  // Find the test index in the existing testData array
  const testIndex = existingTestData.findIndex(
    (test: any) => test.testName === testName
  )
  let record = 0
  if (testIndex !== -1) {
    // If the test already exists, update the score and percentile values
    if (testSnapshot.exists()) {
      const { type } = testSnapshot.data()
      if (type === 'reaction') {
        record =
          existingTestData[testIndex].record < Math.max(parseInt(score[0], 10))
            ? existingTestData[testIndex].record
            : Math.max(parseInt(score[0], 10))
      } else {
        record =
          existingTestData[testIndex].record < Math.max(parseInt(score[0], 10))
            ? Math.max(parseInt(score[0], 10))
            : existingTestData[testIndex].record
      }
    }
    const updatedTestData = [...existingTestData]
    updatedTestData[testIndex].score.push(...score)
    updatedTestData[testIndex].date.push(new Date().getTime())
    updatedTestData[testIndex].record = record

    await updateDoc(userRef, {
      testData: updatedTestData
    })
  } else {
    // If the test does not exist, add a new test to the testData array
    const testData = {
      testName,
      score,
      date: [new Date().getTime()],
      record: Math.max(...score.map((s) => parseInt(s, 10)))
    }
    const updatedTestData = [...existingTestData, testData]

    await updateDoc(userRef, {
      testData: updatedTestData
    })
  }
}
