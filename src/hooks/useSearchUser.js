import { useState } from 'react'
import useShowToast from './useShowToast'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

function useSearchUser() {
    const [isLoading, setIsLoading] = useState(false)
    const [searchedUser, setSearchedUser] = useState(null)
    const showToast = useShowToast()

    async function getSearchedUser(username) {
        setIsLoading(true)
        try {
            const q = query(collection(firestore, "users"), where("username", "==", username))
            const querySnapshot = await getDocs(q)
            if (querySnapshot.empty) {
                showToast("Info", "User not found", "info")
                return
            }
            querySnapshot.forEach(doc => setSearchedUser(doc.data()))
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLoading(false)
        }

    }
    return { isLoading, getSearchedUser, searchedUser, setSearchedUser }
}

export default useSearchUser
