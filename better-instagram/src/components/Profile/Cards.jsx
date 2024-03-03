import Grid from '@mui/joy/Grid';
import CardItem from './CardItem'
import post1 from '../../../assets/images/post1.jpeg'
import post2 from '../../../assets/images/post2.jpeg'
import post3 from '../../../assets/images/post3.jpg'
import post4 from '../../../assets/images/post4.jpg'
import post5 from '../../../assets/images/post5.jpg'
import ViewPost from './ViewPost';
import { useState, useEffect } from 'react'
import './ProfilePage.css';
import {firestore} from '../../../firebase/firebase';
import { getDocs, collection} from 'firebase/firestore'




export default function Cards(){
    const[likesList, setLikesList] = useState([]);
    const[postsList, setPostsList] = useState([]);
    const likesCollectionRef = collection(firestore, 'likes')
    const postsCollectionRef = collection(firestore, 'posts')

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
        const getPostsList = async () => {
            try{
                const data = await getDocs(postsCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setPostsList(filteredData);
            } catch(err){
                console.error(err)
            }
        };

        getPostsList();
        getLikesList();
    }, []);

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

    const click=(index)=>{
        setViewPost(!viewPost);
        setCurrentIndex(index)
    }

    const goBack=()=>{
        setCurrentIndex(currentIndex == 0 ? postsList.length-1 : currentIndex - 1);
    }

    const goForward=()=>{
        setCurrentIndex(currentIndex == postsList.length-1 ? 0 : currentIndex + 1)
    }

    const toggleLike=(index)=>{
        const updateLikes = [...likes];
        updateLikes[index] = !updateLikes[index];
        setLikes(updateLikes);
    }



    return <>
        <div className="postLayout"> 
            {postsList.map((_, index) => {
                return <>
                    <CardItem image={postsList[index].image} onCardClick={()=>click(index)}/>
                    {viewPost && <ViewPost 
                        close={()=>click(null)} 
                        postId={postsList[currentIndex].id}
                        image={postsList[currentIndex].image} 
                        caption={postsList[currentIndex].caption} 
                        goBack={goBack} 
                        goForward={goForward}
                        likeClick={()=>toggleLike(currentIndex)}
                        liked={likes[currentIndex]}
                        />} 
                </>;
            })}
        </div>             
    </>;
}

