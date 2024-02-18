import Grid from '@mui/joy/Grid';
import CardItem from './CardItem'
import post1 from '../images/post1.jpeg'
import post2 from '../images/post2.jpeg'
import post3 from '../images/post3.jpg'
import post4 from '../images/post4.jpg'
import post5 from '../images/post5.jpg'
import ViewPost from './ViewPost';
import { useState } from 'react'

const images = [
    { image: post1, caption: 'Greg watching sunset' },
    { image: post2, caption: 'Greg stargazing' },
    { image: post3, caption: 'Greg at the beach' },
    { image: post4, caption: 'Greg in the mountains' },
    { image: post5, caption: 'Greg in the desert'}
];

export default function Cards(){
    const [viewPost, setViewPost] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [likes, setLikes] = useState(Array(images.length).fill(false))

    const click=(index)=>{
        setViewPost(!viewPost);
        setCurrentIndex(index)
    }

    const goBack=()=>{
        setCurrentIndex(currentIndex == 0 ? images.length-1 : currentIndex - 1);
    }

    const goForward=()=>{
        setCurrentIndex(currentIndex == images.length-1 ? 0 : currentIndex + 1)
    }

    const toggleLike=(index)=>{
        const updateLikes = [...likes];
        updateLikes[index] = !updateLikes[index];
        setLikes(updateLikes);
    }

    return(
        <>
            <Grid container
            spacing={2}
            columns={{ xs: 1, sm: 2, md: 3}}
            sx={{ 
                flexGrow: 1, 
                justifyContent: 'center',
                maxWidth: 1000
            }}
            >
                {images.map((item, index) =>(
                    <Grid key={index}> 
                        <CardItem image={item.image} onCardClick={()=>click(index)}/>
                        {viewPost && <ViewPost 
                            close={()=>click(null)} 
                            image={images[currentIndex].image} 
                            caption={images[currentIndex].caption} 
                            goBack={goBack} 
                            goForward={goForward}
                            likeClick={()=>toggleLike(currentIndex)}
                            liked={likes[currentIndex]}
                            />} 
                    </Grid>
                ))}                
            </Grid>              
        </>    
    )   
}
