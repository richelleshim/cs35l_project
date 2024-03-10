import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const useGetUserProfileByUsername = (username) => {
    const [isLoading, setIsLoading] = useState(true); 
    const { userProfile, setUserProfile } = useUserProfileStore()
    useEffect(() => {
        const getUserProfile = async() => {
            try {
                const q = query(collection(firestore, "users"), where("username", "==", username));
                const querySnapshot = await getDocs(q);

                if(querySnapshot.empty) return setUserProfile(null);

                let userDoc;
                querySnapshot.forEach((doc) => {
                    userDoc = doc.data();
                });

                setUserProfile(userDoc);

            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };
        getUserProfile();
    }, [setUserProfile, username]);

    return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;