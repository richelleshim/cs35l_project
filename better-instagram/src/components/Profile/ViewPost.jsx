import Typography from "@mui/joy/Typography";
import { useState, useEffect } from "react";
import Modal from "@mui/joy/Modal";
import AspectRatio from "@mui/joy/AspectRatio";
import greg from "../../../assets/images/greg.svg";
import Box from "@mui/joy/Box";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/joy/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Avatar from "@mui/joy/Avatar";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import SendIcon from '@mui/icons-material/Send';
import moment from 'moment'
import useAuthStore from "../../store/authStore";

// post image loading -chai
import {
  getStorage,
  ref,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { 
  doc, 
  deleteDoc, 
  getDocs,
  getDoc,
  collection, 
  addDoc, 
  query, 
  onSnapshot,
  serverTimestamp,
  where,
  orderBy } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

export default function ViewPost({
  close,
  postId,
  imageUrl,
  caption,
  goBack,
  goForward,
  likeClick,
  liked,
  uid
}) {
  const [isExpanded, setIsExpanded] = useState(false); //expanding the caption
  const [commentsList, setCommentsList] = useState([]) 
  const [commentsWithImageList, setCommentsWithImageList] = useState([]) 
  const [commentInput, setCommentInput] = useState('')
  const [toggleEditCaption, setToggleEditCaption] = useState(false)
  const [ownerUsername, setOwnerUsername] = useState('')
  const [ownerProfilePic, setOwnerProfilePic] = useState('')

  const orderedCommentsQuery = query(collection(firestore, 'comments'), orderBy('timestamp', 'desc'));

  let userObj = useAuthStore((state) => state.user());
  if (userObj == null) {
      return <h1>Not Logged In</h1>;
  }

  useEffect(()=>{  
    //get the list of comments 
    const getCommentsList = async () => { 
        try{
            const data = await getDocs(orderedCommentsQuery);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setCommentsList(filteredData);
        } catch(err){
            console.error(err)
        }
    };
    getCommentsList();

  //update comments without refreshing the page
  const unsubscribe = onSnapshot(orderedCommentsQuery, (snapshot) => { 
    const comments = [];
    snapshot.forEach((doc) => {
      comments.push({ id: doc.id, ...doc.data() });
    });
    setCommentsList(comments);
/*
    const getUsernameAndProfilePic = async () => {
      try {
        let url
        const ownerQuery = query(collection(firestore, 'users'), where("uid", "==", uid));
        const owner = await getDocs(ownerQuery);

        setOwnerUsername(owner.docs[0].data().username);

        console.log('reach')
        if(owner.docs[0].data().profilePicURL){
          
          url = await getDownloadURL(ref(storage, owner.docs[0].data().profilePicURL));
   
        }
        console.log(url)
        setOwnerProfilePic(url)
        console.log('there')

      } catch (error) {
        console.error("Cannot get username of: ", uid);
      }
    };
    
    getUsernameAndProfilePic();*/
    });

    return () => unsubscribe();

  }, [postId]);


  useEffect(() => {
    //Load in user profile pictures
    const loadImages = async () => {
        const storage = getStorage();
        const newCommentsList = []; 

        for (const comment of commentsList) {
            try {
                let url
                if(comment.profilePicture){
                  url = await getDownloadURL(ref(storage, comment.profilePicture));      
                }  
                const newComment = {
                    ...comment,
                    profilePicURL: url 
                };
                newCommentsList.push(newComment);
            } catch (error) {
                console.error('Error fetching profile picture for comment:', comment.id);
            }
        }
        setCommentsWithImageList(newCommentsList);
    };
    loadImages();
  }, [commentsList]);

  //posting a new comment
  const handlePostComment = async()=>{
      //make sure comment isn't empty
      if (!commentInput.trim()) return;

      await addDoc(collection(firestore, "comments"), {
          content: commentInput,
          postID: postId,
          userID: userObj.uid,
          username: userObj.username,
          profilePicture: userObj.profilePicURL,
          timestamp: serverTimestamp()
      });

      //reset comment input field
      setCommentInput('')
  } 

  //expanding the caption
  const expandCaption = () => {
    setIsExpanded(!isExpanded);
  };

  //deleting a post
  const deletePost = async () => {
    console.log('delete')
    const storage = getStorage();
    await deleteDoc(doc(firestore, "posts", postId));

    //delete all comments of the post
    const deleteCommentList = commentsList.filter((comment) => comment.postID === postId);
    for(const comment of deleteCommentList){
      await deleteComment(comment.id)
    }

    // Create a reference to the file to delete
    const desertRef = ref(storage, `images/${postId}.png`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });

    setIsExpanded(false);
    window.location.reload();
  };

  //deleting a comment
  const deleteComment = async (commentID) =>{
    try{
      await deleteDoc(doc(firestore, "comments", commentID));
    }catch(error){
      console.error('Failed to delete comment: ', commentID)
    }
  }

  const editCaption = async () => {
    setToggleEditCaption(!toggleEditCaption)  
  }

  //styling the caption
  const captionStyle = {
    marginTop: "2%",
    marginLeft: "2%",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
  };

  //styling the caption
  const captionStyleFull = {
    marginTop: "2%",
    marginLeft: "2%",
  };

  return (
    <>
    <Modal
      open={true}
      onClose={close}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ outline: "none !important" }}>
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: 10,
            p: 1.5,
            height: "80vh",
            width: "60vh",
            overflowY: "auto",
          }}
        >
          {/*Image of the post*/}
          <Box sx={{ borderRadius: 8, overflow: "hidden" }}>
            <AspectRatio ratio="1">
              <img id={"viewimg" + imageUrl} src={imageUrl} alt='image'/>
            </AspectRatio>
          </Box>

          {/*Caption and comments section*/}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/*User profile*/}
              <Avatar src={ownerProfilePic} sx={{ size: "lg" }} /> 

              {/*Username*/}
              <Typography fontWeight="bold">
                {ownerUsername}
              </Typography>
            </Box>

            {/*Delete post and like post section*/}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
              {/*Delete post icon*/}
              <IconButton
                size="lg"
                color="inherit"
                onClick={deletePost}
                sx={{ outline: "none !important" }}
              >
                <DeleteOutlinedIcon />
              </IconButton>

              {/*Like post icon*/}
              <IconButton
                size="lg"
                color="inherit"
                onClick={likeClick}
                sx={{ outline: "none !important" }}
              >
                {liked ? (
                  <FavoriteIcon sx={{ color: "#ed1d24" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>
          </Box>

          {/*Caption*/}
          <Box sx={{display:'flex', justifyContent: "space-between"}}>
            <div onClick={expandCaption} style={{ flex: '1' }}>
              <Typography sx={isExpanded ? captionStyleFull : captionStyle}>
                {caption}
              </Typography>
            </div>

            <div onClick={() => editCaption()} style={{marginTop: '1.2vh'}}>
              <Typography level="body-sm">
                Edit caption
              </Typography>
            </div>
          </Box>
          
        
        {/*Posting comments section*/}
        <Box
            sx={{
                display: 'flex',
                justifyContent: "center",
            }}>

            {/*Comment input section*/}
            <Input
                placeholder="Add a comment"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                sx={{
                    flex: 1,
                    marginTop: "10px",
                    borderRadius: "20px",
                }}
            />

            {/*Post comment icon*/}
            <IconButton 
                onClick={handlePostComment}
                sx={{ marginTop: "10px",}}>
                <SendIcon/>
            </IconButton>
        </Box>

        {/*Comments section*/}
          <Stack>
            {/*Map through list of comments that match the post ID and display*/}
            {commentsWithImageList.map((comment) => ( 
                postId === comment.postID && (
                <Box
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between",
                    marginTop: '2.5vh'}}>
                    
                    {/*Commenter profile*/}
                    <Avatar sx={{ marginRight: "15px" }} src={comment.profilePicURL}/> 
                    {console.log(comment.profilePicURL)}

                      {/*Commenter ID, comment timestamp, comment content*/}
                      <Stack direction='column' >
                          <Box sx={{display:'flex'}}>
                            <Typography level="title-md">
                                {comment && comment.username}
                            </Typography>

                            <Typography level="body-sm" sx={{marginLeft:'1vh'}}>
                                {comment.timestamp && moment(comment.timestamp.toDate()).fromNow()}   
                            </Typography>
                          </Box>
                          
                          <Typography>
                                {comment && comment.content}
                          </Typography>
                      </Stack>
                    
                    {/*Delete comment button*/}
                    <IconButton
                      size="sm"
                      color="inherit"
                      onClick={()=>deleteComment(comment.id)}
                      sx={{ outline: "none !important", marginLeft: 'auto'}}
                    >
                      <DeleteOutlinedIcon />
                    </IconButton>          
                </Box>  
                )  
            ))}
          </Stack>     
        </Box>

        {/*Left and right arrows to move between posts*/}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "space-between",
            width: "550px",
          }}
        >
          <IconButton
            color=""
            onClick={goBack}
            sx={{ outline: "none !important", color: "#FFFFFF" }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            color=""
            onClick={goForward}
            sx={{ outline: "none !important", color: "#FFFFFF" }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
    </Modal>
    </>
  );
}


