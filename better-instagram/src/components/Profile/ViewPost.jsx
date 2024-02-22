import Typography from '@mui/joy/Typography';
import { useState } from 'react'
import ModalClose from '@mui/joy/ModalClose';
import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import AspectRatio from '@mui/joy/AspectRatio';
import greg from '../../../assets/images/greg.svg'
import Box from '@mui/joy/Box';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/joy/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';

export default function ViewPost({close, image, caption, goBack, goForward, likeClick, liked}){
    return(
        <Modal 
            open={true} 
            onClose={close}
            sx={{
                display: 'flex', 
                justifyContent:'center', 
                alignItems: 'center'

            }}>
            <Sheet
                variant='s'
                sx={{
                    width: 450,
                    height: 580,
                    borderRadius: 'md',
                    p: 1.5      
                }}>
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
                    <AspectRatio ratio='1' sx={{ height:50,  width:50 }}>
                        <img src={greg}/>
                    </AspectRatio>
                    <Typography style={{marginLeft:10}} fontWeight='bold'>
                        @jolly_greg
                    </Typography>
                </Box>
                
                <Box sx={{borderRadius: 8, overflow: 'hidden'}}>
                    <AspectRatio ratio='1'>
                        <img src={image}/>
                    </AspectRatio>
                </Box>

                <IconButton
                        size='lg'
                        sx={{position:'absolute', top:545}}
                        color='interit'
                        onClick={likeClick}>
                        {liked ? <FavoriteIcon style={{color:'#ed1d24'}}/> : <FavoriteBorderIcon/>}
                </IconButton>

                <Typography sx={{marginLeft:7, marginTop: 3.25}}>
                    {caption}
                </Typography> 
                <IconButton
                    sx={{
                        position:'absolute', left:-50, top:300
                    }}
                    color=''
                    onClick={goBack}>
                    <ArrowBackIosIcon/>
                </IconButton>
                <IconButton
                    sx={{
                        position:'absolute', left:500, top:300
                    }}
                    color=''
                    onClick={goForward}>
                    <ArrowForwardIosIcon/>
                </IconButton> 
                <List sx={{overflow: 'auto'}}>
                    <ListItem>Item 1</ListItem>
                    <ListItem>Item 2</ListItem>
                </List>   
            </Sheet>  
        </Modal>
   )   
}