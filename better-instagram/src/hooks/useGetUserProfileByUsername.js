import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../../firebase/firebase'
import useUserProfileStore from "../store/useProfileStore"

const useGetUserProfileByUsername = (username) => {
    const [isLoading, setIsLoading] = useState(true); //starts true because running immediately
    //extra: showToast hook for showing errors (add later if we want)
    const {userProfile, setUserProfile} = useUserProfileStore() //can just call like this w/o arguments to get all values 

    useEffect(() => {
        const getUserProfile = async() => {
            try {
                const q = query(collection(firestore, "users"), where("username", "==", username));
                const querySnapshot = await getDocs(q);

                //if user not found:
                if(querySnapshot.empty) return setUserProfile(null);
                
                let userDoc;
                querySnapshot.forEach((doc) => {
                    userDoc = doc.data();
                });

                setUserProfile(userDoc);
                console.log(userDoc);

            } catch (error) {
                //some error message with showToast?
            } finally {
                setIsLoading(false);
            }
        };
        getUserProfile();
    }, [setUserProfile, username]); //add showToast here with the changes in in with callback

    return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;