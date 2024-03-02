import { create } from "zustand"

const useUserProfileStore = create((set) => ({
    userProfile:null,
    setUserProfile:(userProfile) => set({userProfle}),
    //addPost:()

}))

export default useUserProfileStore;