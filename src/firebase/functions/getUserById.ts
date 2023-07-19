import { getFirestore, doc, getDoc } from "firebase/firestore"
import { firebaseApp } from "../init"

const firestore = getFirestore(firebaseApp)
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
