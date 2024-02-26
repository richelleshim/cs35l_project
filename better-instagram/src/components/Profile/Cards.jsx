import Grid from '@mui/joy/Grid';
import CardItem from './CardItem'
import post1 from '../../../assets/images/post1.jpeg'
import post2 from '../../../assets/images/post2.jpeg'
import post3 from '../../../assets/images/post3.jpg'
import post4 from '../../../assets/images/post4.jpg'
import post5 from '../../../assets/images/post5.jpg'
import ViewPost from './ViewPost';
import { useState } from 'react'
import Avatar from '@mui/joy/Box'
import Stack from '@mui/joy/Stack';
import PromptCard from './PromptCard';
import './ProfilePage.css';
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'

const images = [
    { image: post1, caption: 'Greg watching sunset watching sunset watching sunset watching sunset watching sunset watching sunset watching sunset watching sunset watching sunset.' },
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

        <div className="postLayout"> 
            {images.map((item, index) =>(
                <div> 
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
                </div>
            ))} 
        </div>             
    )   
}

