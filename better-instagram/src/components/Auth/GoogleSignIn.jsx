import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Sheet } from "@mui/joy";
import { Button, Stack, Typography } from "@mui/material";

const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        console.log("Error", error.message);
        return;
      }
      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // login
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        // signup
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullName: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  return (
    // <Sheet
    //   sx={{
    //     width: 300,
    //     mx: "auto", // margin left & right
    //     my: 4, // margin top & bottom
    //     py: 3, // padding top & bottom
    //     px: 2, // padding left & right
    //     display: "flex",
    //     flexDirection: "column",
    //     gap: 2,
    //     boxShadow: "md",
    //   }}
    //   variant="outlined"
    // >
    <Button color="neutral" variant="soft">
      <Stack direction="row" spacing={1} alignItems={"center"}>
        <img src="./googe_logo.png" height={"25px"} />
        <Typography color="black" fontSize={14}>
          {prefix} With Google
        </Typography>
      </Stack>
    </Button>
    // </Sheet>
  );
};

export default GoogleAuth;
