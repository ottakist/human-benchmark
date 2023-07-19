import {
  doc,
  getDoc,
  collection,
  getDocs,
  getFirestore
} from 'firebase/firestore'
import { firebaseApp } from '../init'

const firestore = getFirestore(firebaseApp)
export async function calculatePercentageImprovement(
  current: number,
  name: string
): Promise<number> {
  try {
    const MAX_PERCENTAGE = 1000
    const testRef = doc(firestore, 'tests', name.toLowerCase())
    const average = (await calculateAverageResult(name)) ?? 0
    const difference = ((current * 100) / average) * 10
    let improvement: number

    const testSnapshot = await getDoc(testRef)
    if (testSnapshot.exists()) {
      const { type } = testSnapshot.data()
      if (type === 'reaction') {
        improvement =
          difference < MAX_PERCENTAGE ? MAX_PERCENTAGE : 2000 - difference
      } else if (type === 'accuracy') {
        improvement = difference > MAX_PERCENTAGE ? MAX_PERCENTAGE : difference
      } else {
        improvement = 0
      }

      const percentageImprovement = Math.floor(improvement)
      return percentageImprovement
    } else {
      console.log('Test not found')
    }
  } catch (error) {
    console.log(error)
  }

  return 0
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
