import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import Link from '@mui/joy/Link';
import { useState, useEffect } from 'react'

import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function CardItem({imageUrl, onCardClick, small=false}){
    const [imgSrc, setImgSrc] = useState('');
/*
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
    }, []);*/

    return(
        <>
        <Card sx={{ width: !small ? 250 : 200, height: !small ? 250 : 100, flexGrow: 1}}>
            <CardCover>
                <img
                    id={"img"+imageUrl}
                    src={imageUrl}
                    alt='image'
                /> 

                <Link overlay onClick={onCardClick}/>  
            </CardCover>
        </Card>
        
        </>   
    )
}

