import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import Link from '@mui/joy/Link';
import { useState, useEffect } from 'react'

import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function CardItem({image, onCardClick}){
    const [imgSrc, setImgSrc] = useState('');

    useEffect(()=>{
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
    }, []);

    return(
        <>
        <Card sx={{ width:250, height:250, flexGrow: 1}}>
            <CardCover>
                <img
                    id={"img"+image}
                    src={imgSrc}
                    alt='image'
                /> 
                <Link overlay onClick={onCardClick}/>  
            </CardCover>
        </Card>
        
        </>   
    )
}

