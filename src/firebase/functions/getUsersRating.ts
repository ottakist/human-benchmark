import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore
} from 'firebase/firestore'
import { firebaseApp } from '../init'

const firestore = getFirestore(firebaseApp)

export const getUsersRatings = async (sortOption: string) => {
  const usersRef = collection(firestore, 'users')
  const testRef = doc(firestore, 'tests', sortOption.toLowerCase())
  const data = [] as Array<{
    userName: string
    userImage: string
    testData: Array<{ testName: string; testRecord: number }>
    userId: string
  }>

  try {
    const usersSnapshot = await getDocs(usersRef)
    const testSnapshot = await getDoc(testRef)
    usersSnapshot.forEach((userDoc) => {
      const testData = userDoc.get('testData')
      const userName = userDoc.get('name')
      const userImage = userDoc.get('image')
      const userId = userDoc.get('id')
      const tempTestArray = testData?.map(
        (item: { testName: string; record: number }) => ({
          testName: item.testName,
          testRecord: item.record
        })
      )

      data.push({ userName, userImage, testData: tempTestArray, userId })
    })
    if (testSnapshot.exists()) {
      const { type } = testSnapshot.data()
      console.log(type)
      const results = data.slice(0, 50).map((tests) => {
        const record = tests.testData?.find(
          (test) => test.testName === sortOption
        )?.testRecord
        if (record === undefined) {
          return {
            record: 0,
            userName: tests.userName,
            userImage: tests.userImage,
            userId: tests.userId
          }
        }
        return {
          record,
          userName: tests.userName,
          userImage: tests.userImage,
          userId: tests.userId
        }
      })
      return { results, type }
    }
  } catch (error) {
    console.log(error)
  }
}
