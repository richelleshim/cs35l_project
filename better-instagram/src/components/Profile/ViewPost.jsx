import Typography from "@mui/joy/Typography";
import { useState, useEffect } from "react";
import ModalClose from "@mui/joy/ModalClose";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import AspectRatio from "@mui/joy/AspectRatio";
import greg from "../../../assets/images/greg.svg";
import Box from "@mui/joy/Box";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/joy/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Avatar from "@mui/joy/Avatar";
import Stack from "@mui/joy/Stack";
import { ModalDialog } from "@mui/joy";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import SendIcon from '@mui/icons-material/Send';
import moment from 'moment'

// post image loading -chai
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, deleteDoc, getDocs, collection, addDoc, query, where, onSnapshot, Timestamp, serverTimestamp, orderBy } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

export default function ViewPost({
  close,
  postId,
  image,
  caption,
  goBack,
  goForward,
  likeClick,
  liked,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [commentsList, setCommentsList] = useState([])
  const orderedCommentsQuery = query(collection(firestore, 'comments'), orderBy('timestamp', 'desc'));
  const [commentInput, setCommentInput] = useState('')

  useEffect(()=>{
    const getCommentsList= async () => {
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

    const unsubscribe = onSnapshot(orderedCommentsQuery, (snapshot) => {
        const comments = [];
        snapshot.forEach((doc) => {
            comments.push({ id: doc.id, ...doc.data() });
        });
        setCommentsList(comments);
    });

    return () => unsubscribe();
    /*
    const commentsQuery = query(collection(firestore, 'comments'), where('postID', '==', postId))
    const unsubscribe = onSnapshot(commentsQuery, (snapshot) =>{
        const comments = []
        snapshot.forEach((doc) =>{
            comments.push({ id: doc.id, ...doc.data()})
        })
        setCommentInput(comments)
    })*/

    //return () => unsubscribe();

}, [postId]);

const handlePostComment = async()=>{
    if (!commentInput.trim()) return;
    console.log('post comment')
    await addDoc(collection(firestore, "comments"), {
        content: commentInput,
        postID: postId,
        userID: '',
        timestamp: serverTimestamp()
    });
    setCommentInput('')
}

  // load the image based off of the image key
  const updateImage = async () => {
    const storage = getStorage();
    getDownloadURL(ref(storage, image))
      .then((url) => {
        setImgSrc(url);
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  updateImage();

  const onClick = () => {
    setIsExpanded(!isExpanded);
  };

  const deletePost = async () => {
    const storage = getStorage();
    await deleteDoc(doc(firestore, "posts", postId));

    //get the comments on the post and delete them
    const commentsQuery = query(
        collection(firestore, 'comments'), 
        where('postID', '==', postId)
    );

    //const commentsQuerySnapshot = await getDoc(commentsQuery)

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

  const captionStyle = {
    marginTop: "2%",
    marginLeft: "2%",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  };

  const captionStyleFull = {
    marginTop: "2%",
    marginLeft: "2%",
  };

  return (
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
            height: "90vh",
            width: "60vh",
            overflowY: "auto",
          }}
        >
          <Box sx={{ borderRadius: 8, overflow: "hidden" }}>
            <AspectRatio ratio="1">
              <img id={"viewimg" + image} src={imgSrc} />
            </AspectRatio>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar src={greg} sx={{ size: "lg" }} />

              <Typography fontWeight="bold">@jolly_greg</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
              <IconButton
                size="lg"
                color="inherit"
                onClick={deletePost}
                sx={{ outline: "none !important" }}
              >
                <DeleteOutlinedIcon />
              </IconButton>
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

          <div onClick={onClick}>
            <Typography sx={isExpanded ? captionStyleFull : captionStyle}>
              {caption}
            </Typography>
          </div>
        
        <Box
            sx={{
                display: 'flex',
                justifyContent: "center",
            }}>
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
            <IconButton 
                onClick={handlePostComment}
                sx={{ marginTop: "10px",}}>
                <SendIcon/>
            </IconButton>
        </Box>

        {/*still need to have avatars*/}
          <Stack>
            {commentsList.map((comment) => (
                postId === comment.postID && (
                <Box
                sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                    <Avatar sx={{ marginRight: "15px" }} /> 
                    <Stack direction='column'>
                        <div>
                            {comment && comment.userID}
                        </div>

                        <div>
                            {comment.timestamp && moment(comment.timestamp.toDate()).fromNow()}
                            
                        </div>

                        <div>
                            {comment && comment.content}
                        </div>

                    </Stack>
                    
                </Box>  
                )  
            ))}
          </Stack>
          
        </Box>

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
  );
}


