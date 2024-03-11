import CardItem from './CardItem'
import ViewPost from './ViewPost';
import { useState, useEffect } from 'react'
import './ProfilePage.css';
import {firestore} from '../../firebase/firebase';
import { 
    getDocs, 
    collection,
    orderBy,
    query,
    where
} from 'firebase/firestore'
import {
    getStorage,
    ref,
    getDownloadURL,
  } from "firebase/storage";

export default function Cards({ uid }){
    const[likesList, setLikesList] = useState([]);
    const[postsList, setPostsList] = useState([]);
    const[imageUrlList, setImageUrlList] = useState([])
    const likesCollectionRef = collection(firestore, 'likes')
    //const orderedPostsQuery = query(collection(firestore, 'posts'), orderBy('timestamp', 'desc')); //query posts based on descending time stamp order

    const [viewPost, setViewPost] = useState(false); 
    const [currentIndex, setCurrentIndex] = useState(null);
    const [likes, setLikes] = useState([]);

    useEffect(()=>{
        const getLikesList = async () => {
            try{
                const data = await getDocs(likesCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setLikesList(filteredData);
            } catch(err){
                console.error(err)
            }
        };

        //Get the lists of posts
        const getPostsList = async () => {
            try{
                // load the uid's profile
                const q = query(collection(firestore, "posts"), where("userId", "==", uid));
                const querySnapshot = await getDocs(q);

                let postList = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc)
                    postList.push({
                        ... doc.data(),
                        id: doc.id
                    })
                });
                setPostsList(postList);

            } catch(err){
                console.error(err)
            }
        };
        
        getPostsList();
        getLikesList();  
        
    }, []);

    useEffect(() => {
        //Load in all the images
        const loadImages = async ()=> {
            const storage = getStorage()
            const urlList = []
            
            for (const post of postsList){
                try{
                    const url = await getDownloadURL(ref(storage, post.image))
                    urlList.push(url)
                } catch (error){
                    console.error(err)
                }
            }
            setImageUrlList(urlList)
        }
        loadImages()
    }, [postsList]); 

    const likeUnlike = async (userID, postID) => {
        const isLiked = likesList.find((likedPost) => likedPost.postID == postID && likedPost.userID == userID);
        if (isLiked) {
            const deleteLike = doc(firestore, 'likes', isLiked.id)
            await deleteDoc(deleteLike);
        } else {
            await addDoc(likesCollectionRef, {
                userID : userID, 
                postID : postID})
        }
    }

    //Open and close the modal for viewing the post
    const toggleModal=(index)=>{
        setViewPost(!viewPost);
        setCurrentIndex(index)
    }

    //When viewing a post, move back a post
    const goBack=()=>{
        setCurrentIndex(currentIndex == 0 ? postsList.length-1 : currentIndex - 1);
    }

    //When viewing a post, move forward a post
    const goForward=()=>{
        setCurrentIndex(currentIndex == postsList.length-1 ? 0 : currentIndex + 1)
    }

    //Like and unlike posts
    const toggleLike=(index)=>{
        const updateLikes = [...likes];
        updateLikes[index] = !updateLikes[index];
        setLikes(updateLikes);
    }

    return( <>

        <div className="postLayout"> 
            {postsList.map((_, index) => {
                return <>
                    <CardItem imageUrl={imageUrlList[index]} onCardClick={()=>toggleModal(index)}/>
                    {viewPost && <ViewPost 
                        close={()=>toggleModal(null)} 
                        postId={postsList[currentIndex].id}
                        imageUrl={imageUrlList[currentIndex]} 
                        caption={postsList[currentIndex].caption} 
                        goBack={goBack} 
                        goForward={goForward}
                        likeClick={()=>toggleLike(currentIndex)}
                        liked={likes[currentIndex]}
                    />} 
                </>;
            })}
        </div>             
    </>);
}

