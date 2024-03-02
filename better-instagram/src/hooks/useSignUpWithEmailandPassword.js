import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const useSignUpWithEmailandPassword = () => {
  const [createUserWithEmailAndPassword, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const signup = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.username ||
      !inputs.fullName
    ) {
      console.log("Required Fields are Empty");
      return;
    }

    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log("error: username already exists");
      return;
    }
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password,
      );
      if (!newUser && error) {
        console.log(error);
        return;
      }
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          bio: "",
          profilePictureURL: "",
          followers: [],
          following: [],
          posts: [],
          createAt: Date.now(),
        };

        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        // localStorage.setItem(key:String, value:string) : void
        localStorage.setItem("user-info", JSON.stringify(userDoc));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { loading, error, signup };
};

export default useSignUpWithEmailandPassword;
